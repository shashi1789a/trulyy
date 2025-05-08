const express = require('express');
const router = express.Router();
// const isloggedin = require("../middlewhere/isLogined");  
const isLogined = require('../middlewhere/isLogined');
const productModels = require('../models/product-models');
const userModels = require('../models/user-models');



router.get('/', function(req, res) {
  let error = req.flash('error');
  res.render('index',{error , loggedin:false});
  // res.send("Welcome");
});


router.get("/shop", isLogined, async function(req,res) {
 let Product = await  productModels.find();
 let success =req.flash('success');
    res.render("shop", { Product , success});
});

router.get("/cart", isLogined, async function(req, res) {
  let user = await userModels
    .findOne({ email: req.user.email })
    .populate("cart");
  console.log(user.cart);

  res.render("cart", { user }); // 👈 Pass user to the view
});

// remove from cart
router.get("/removefromcart/:productid", isLogined, async function(req, res) {
  try {
    let user = await userModels.findOne({ email: req.user.email });

    // Remove the product from the user's cart
    user.cart = user.cart.filter(id => id.toString() !== req.params.productid);

    await user.save();
    req.flash("success", "Product removed from cart");
    res.redirect("/cart");
  } catch (err) {
    console.error("Error removing product from cart:", err);
    res.redirect("/cart");
  }
});
//  ..........

router.get("/addtocart/:productid", isLogined, async function(req,res) {
  let user = await userModels.findOne({ email: req.user.email});
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "product added to cart");
  res.redirect("/shop");
 });

// my account
router.get("/owner-login", isLogined, async function(req, res) {
  let user = await userModels.findOne({ email: req.user.email });
  res.render("owner-login", { user });
});



router.get("/logout", isLogined, function(req,res) {
  
    res.render("shop");
});
router.get("/products/shop/:productid", async (req, res) => {
  try {
    const product = await productModels.findById(req.params.productid);
    if (!product) {
      return res.status(404).send("Place not found");
    }
    res.render("productdetail.ejs", { product }); // lowercase 'product'
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});



// router.get("/destination" , isLogined, async (req, res) => {
//   const user = await User.findById(req.user._id).populate("destination"); // make sure it's populated
//   res.render("destination", { user });
// });

// router.get("/destination", isLogined, async function(req,res) {
//   let Product = await  productModels.find();
//   let success =req.flash('success');
//      res.render("/destination", { Product , success});
//  });

// router.get("/destination", isLogined, async function(req, res) {
//   let user = await userModels.findOne({ email: req.user.email });
//   res.render("", { user });
  // req.send("Welcome to the home page!");

// });

router.get("/destination", isLogined, async function(req,res) {
  let Product = await  productModels.find();
  let success =req.flash('success');
     res.render("destination", { Product , success});
 });
 router.get("/galery", isLogined, async function(req,res) {
  let Product = await  productModels.find();
  let success =req.flash('success');
     res.render("galery", { Product , success});
 });

 router.get("/aboutus", isLogined, async function(req,res) {
  let Product = await  productModels.find();
  let success =req.flash('success');
     res.render("aboutus", { Product , success});
 });

 router.get("/contactus", isLogined, async function(req,res) {
  let Product = await  productModels.find();
  let success =req.flash('success');
     res.render("contactus", { Product , success});
 });

module.exports = router;