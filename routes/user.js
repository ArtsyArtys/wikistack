const router=require('express').Router();
const sequelize=require('../models/index');
router.get('/', async (req, res, next)=>{
    const toSend=await sequelize.User.findAll();
    res.send(toSend);
})
router.get('/:uid', async (req, res, next)=>{
    try{
    const toSend=await sequelize.User.findByPk(req.params.uid);
    res.send(toSend);
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
