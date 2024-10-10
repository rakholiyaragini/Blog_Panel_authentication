const isAuth = (req,res,next) => {
    console.log("isAuth");
    
    if(req.isAuthenticated()){
        console.log("auth : authenticated");
        
        next();
    }else{
        console.log("auth : redirecting to login");
        
        res.redirect('/login')
    }

}

module.exports = isAuth;