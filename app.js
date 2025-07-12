require("dotenv").config();
const express=require("express");
const app=express();
const path=require("path");
const session=require("express-session");
const mongoose=require("mongoose");
const nocache=require("nocache");
const morgan=require("morgan");
const flash=require("connect-flash");
const MongoStore=require("connect-mongo");


//setting routers
const userRouter=require("./routes/userRoute");
const adminRouter=require("./routes/adminRoute");

//connecting mongoDB to app
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("MongoDB connected"))
.catch((error)=>console.error("MongoDB connection failed:",error));

//middlewares using
app.use(morgan("dev"));
app.use(nocache());//disabling the cache globally


//set http headers to prevent caching
app.use((req,res,next)=>{
    res.set("Cache-Control","no-store");
    next();
});

//body parsers
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//public folders
app.use(express.static(path.join(__dirname,"public")));



//session
app.use(session({
    secret:process.env.SESSION_SECRET||"defaultsecret",
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({
        mongoUrl:process.env.DB_URL,
        collectionName:"sessions"
    }),
    cookie:{
        maxAge:1000*60*60*24,
        httpOnly:true,
        sameSite:"lax"
    }
}));

//flash messages
app.use(flash());

//view engine setup
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));



//global variables for ejs
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.user=req.session.user||null;
    res.locals.admin=req.session.admin||null;
    next();
});

//routes
app.use("/",userRouter);
app.use("/admin",adminRouter);

//404 error page
app.use((req,res)=>{
    res.status(404).render("error/404",{title:"Page Not found"});
});

//starting server
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
});