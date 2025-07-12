const express=require("express");
const router=express.Router();
const{
    isUserLoggedIn,
    isUserLoggedOut
}=require("../middlewares/auth");

//login page(showing only if logged out)
router.get("/login",isUserLoggedOut,(req,res)=>{
    res.render("user/login");
});


//home page of user
router.get("/home",isUserLoggedIn,(req,res)=>{
    res.render("user/home");
});

//signup page for user
router.get('/signup',isUserLoggedOut,(req,res)=>{
    res.render('user/signup');
});

//OTP sfor sign up for the user
router.get('/otpForSign-up',(req,res)=>{
    res.render('user/otp-signup');
});

//reset password page
router.get('/resetPassword',(req,res)=>{
    res.render('user/reset-password');
});

//logout
router.get("/logout",(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            console.log(err);
            res.redirect("/home");
        }else{
            res.clearCookie("connect.sid");
            res.redirect("/");//back to unauthenticated home
        }
    });

});


module.exports=router;