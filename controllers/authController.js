const userModels = require('../models/user-models');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");



module.exports.registerUser = async function (req, res) {
  try {
    console.log("Request Body:", req.body);  // Debug line

    let { fullname, email, password, phnumber } = req.body;

    if (!fullname || !email || !password || !phnumber) {
      return res.status(400).redirect("/");
    }

    let user = await userModels.findOne({ email: email });
    if (user) return res.status(401).send("User already exists");

    bcrypt.genSalt(10, function (err, salt) {
      if (err) return res.send(err.message);
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        let user = await userModels.create({
          fullname,
          email,
          phnumber,
          password: hash,
        });
        let token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/home");
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};



  module.exports.loginUser = async function (req , res){
    let {email , password} =req.body;

    let user = await userModels.findOne({email: email});
    if(!user) {
           req.flash("email or apssword incorect");
    return res.redirect("/");
    }

    bcrypt.compare(password, user.password, function(err, result) {
        if(result) {
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/home");
        }
        else{
                req.flash("error","email or apssword incorect");
            return res.redirect("/");
        } 
       
    });

  };



  module.exports.logout = function (req , res){
    res.clearCookie("token" , "");
    res.redirect("/");
  };


  


  