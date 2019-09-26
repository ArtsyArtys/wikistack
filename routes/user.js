const router=require('express').Router();
const sequelize=require('../models/index');
const userList = require('../views/userList');
const userPages = require('../views/userPages');

router.get('/', async (req, res, next)=>{
    const toSend=await sequelize.User.findAll();
    res.send(userList(toSend));
})
router.get('/:uid', async (req, res, next)=>{
    try{
    const user = sequelize.User.findByPk(req.params.uid);
    const thisUsersPages = sequelize.Page.findAll({
      where: {
        authorId: req.params.uid
      }
    });
    res.send(userPages(await user, await thisUsersPages));
    }catch(err){
        res.status(500);
        res.send('Error');
    }
})
router.post('/', async (req, res, next)=>{
    sequelize.User.create({
        name: req.body.name,
        email: req.body.email
    }).then(res.redirect('/'));
})
router.put('/:uid', async (req, res, next)=>{
    sequelize.User.findByPk(req.params.uid).then(update(
        {
         name: req.body.name,
         email: req.body.email
        }
    ).then(()=>{}));

})
router.delete('/:uid', async(req, res, next)=>{
    sequelize.User.findByPk(req.params.uid).then(user=>user.destroy()).then(res.redirect('/'));

});
module.exports=router;
