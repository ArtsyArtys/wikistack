const router=require('express').Router();
const addPage=require('../views/addPage');
const sequelize=require('../models/index');
const wikipage=require('../views/wikipage');
module.exports=router;

router.get('/', (req, res, next)=>{
    res.redirect('../');
})
router.post('/', async (req, res, next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const title=req.body.title;
    const content=req.body.content;
    const slug=title.replace(/[^a-zA-Z0-9]/g, '_');
    const [user, wasCreated] = await sequelize.User.findOrCreate({
      where: {
        name,
        email
      }
    });
    const page = await sequelize.Page.create({
        title,
        content,
        slug
    });
    page.setAuthor(user);
    res.redirect(`/wiki/${slug}`);
})

router.get('/add', (req, res, next)=>{
    res.send(addPage());
})

router.get('/:pid', async (req, res, next)=>{
    const page = await sequelize.Page.findOne(
        {where: {slug: req.params.pid}});
    res.send(wikipage(page, await page.getAuthor()));
});

router.delete('/:pid', async (req, res) => {
  const page = await sequelize.Page.findOne({
    where: {
      slug: req.params.pid
    }})//.then(page => page.destroy());
    page.destroy();
    res.redirect('/');
});
