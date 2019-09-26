const router=require('express').Router();
const addPage=require('../views/addPage');
const sequelize=require('../models/index');
const wikipage=require('../views/wikipage');
module.exports=router;

router.get('/', (req, res, next)=>{
    res.send('text');
})
router.post('/', async (req, res, next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const title=req.body.title;
    const content=req.body.content;
    const slug=title.replace(/[^a-zA-Z0-9]/g, '_');
    await sequelize.Page.create({
        name,
        email,
        title,
        content,
        slug
    });
    res.redirect(`/wiki/${slug}`);
    //console.log('name, email, title, content:', name, email, title, content);
    //res.send('');
})

router.get('/add', (req, res, next)=>{
    res.send(addPage());
})

router.get('/:pid', async (req, res, next)=>{
    const page=sequelize.Page.findOne(
        {where: {slug: req.params.pid}});
    res.send(wikipage(await page));
});