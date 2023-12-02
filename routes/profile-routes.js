const router=require('express').Router();

const authCheck=(req,res,next)=>{
   // console.log('req.user:', req.user);
    if(!req.user){
        res.redirect('/auth/login')
    }
    else{
        next();
    }
}
router.get('/',authCheck,(req,res)=>{
    res.render('profile',{user:req.user})
    //res.send("you logged in"+req.user.username)
})
module.exports = router;