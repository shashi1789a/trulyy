const express = require('express');
const router = express.Router();
const ownersModel = require("../models/owner-models");
// const Place = require('../models/productModel');
// 
// console.log(process.env.PORT);


if(process.env.NODE_ENV === "development"){
    router.post("/create", async function (req,res){
        let owners = await ownersModel.find();
        if(owners.length > 0){ 
            return res
            .status(503)
            .send("you can not create a new owner");
        }
        let {fullname, email, password} = req.body;
        let createdOwner =  await ownersModel.create({
           fullname,
           email,
           password,
          })
           res.status(201).send(createdOwner);
     });


     

}

router.get("/admin", function (req,res){
   let success= req.flash("success");
    res.render("createproducts" , {success});
});


module.exports = router;