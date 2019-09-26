const router=require('express').Router();
const addPage=require('../views/addPage');
module.exports=router;

router.get('/', (req, res, next)=>{
    res.send('text');
})
router.post('/', (req, res, next)=>{
    res.send('');
})
router.get('/add', (req, res, next)=>{
    res.send(addPage());
})
