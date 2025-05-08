const jwt = require("jsonwebtoken");
const userModels = require("../models/user-models");
module.exports =  async function (req, res, next) {


if(!req.cookies.token){         
    req.flash("error", "ypu need to login first");    
    return res.redirect("/");  
}

try{
    let decoded = jwt.verify(req.cookies.token , process.env.JWT_KEY);  
    let user = await userModels
    .findOne({email: decoded.email})
    .select("-password");     
    req.user = user;   
    next();
}
catch(err){
    req.flash("error", "invalid password");
    req.redirect("/");
}
}