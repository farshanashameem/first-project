//protecting routes using middleware
module.exports={
    isUserLoggedIn:(req,res,next)=>{
        if(req.session.user){
            next();
        }else{
            res.redirect("/login");
        }
    },

    isUserLoggedOut:(req,res,next)=>{
        if(req.session.user){
            res.redirect("/home");
        }else{
            next();
        }
    },

    isAdminLoggedIn:(req,res,next)=>{
        if(req.session.admin){
            next();
        }else{
            res.redirect("/admin");//login page of admin
        }
    },

    isAdminLoggedOut:(req,res,next)=>{
        if(req.session.admin){
            res.redirect("/admin/home");//home page of admin
        }else{
            next();
        }
    }
};