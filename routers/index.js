const express = require('express');
const router = express.Router();
// const isloggedin = require("../middlewhere/isLogined");  
const isLogined = require('../middlewhere/isLogined');
const productModels = require('../models/product-models');
const userModels = require('../models/user-models');
const GalleryImage = require('../models/galleryImage');



router.get('/', function(req, res) {
  let error = req.flash('error');
  res.render('index',{error , loggedin:false});
  
});


router.get("/home", isLogined, async function(req,res) {
 let Product = await  productModels.find();
 let success =req.flash('success');
    res.render("home", { Product , success});
});


// Add place to user's addtrip list
// Add place to user's addtrip list
// POST: Add product to user's addtrip list
router.post("/addtrip/:productid", isLogined, async (req, res) => {
  console.log('🔔 POST /addtrip hit', req.params.productid);
  try {
    const user = await userModels.findOne({ email: req.user.email });
    const productId = req.params.productid;

    // Prevent duplicate entries
    if (!user.addtrip.includes(productId)) {
      user.addtrip.push(productId);
      await user.save();
    }

    res.redirect("/home");
  } catch (err) {
    console.error("Add to trip error:", err);
    res.redirect("/home");
  }
});


router.get("/addtrip", isLogined, async function(req, res) {
  try {
    const user = await userModels.findOne({ email: req.user.email }).populate("addtrip");
    res.render("addtrip", { user });
  } catch (err) {
    console.error("Fetch addtrip error:", err);
    res.redirect("/home");
  }
});

router.get("/removefromaddtrip/:productid", isLogined, async (req, res) => {
  try {
    const user = await userModels.findOne({ email: req.user.email });
    const productId = req.params.productid;

    // Remove the productId if it exists
    user.addtrip = user.addtrip.filter(id => id.toString() !== productId.toString());
    await user.save();

    res.redirect("/addtrip"); // Redirect back to the trip page
  } catch (err) {
    console.error("Remove from trip error:", err);
    res.redirect("/home");
  }
});





// router.get("/addtrip", isLogined, async function(req, res) {
//   let user = await userModels
//     .findOne({ email: req.user.email })
//     .populate("cart");
//   console.log(user.cart);

//   res.render("addtrip", { user }); // 👈 Pass user to the view
// });


// // remove from cart
// router.get("/removefromaddtrip/:productid", isLogined, async function(req, res) {
//   try {
//     let user = await userModels.findOne({ email: req.user.email });

//     // Remove the product from the user's cart
//     user.cart = user.cart.filter(id => id.toString() !== req.params.productid);

//     await user.save();
//     req.flash("success", "Product removed from addtrip");
//     res.redirect("/addtrip");
//   } catch (err) {
//     console.error("Error removing product from addtrip:", err);
//     res.redirect("/addtrip");
//   }
// });
// //  ..........

// router.get("/addtoaddtrip/:productid", isLogined, async function(req,res) {
//   let user = await userModels.findOne({ email: req.user.email});
//   user.cart.push(req.params.productid);
//   await user.save();
//   req.flash("success", "product added to addtrip");
//   res.redirect("/home");
//  });

// my account
router.get("/owner-login", isLogined, async function(req, res) {
  let user = await userModels.findOne({ email: req.user.email });
  res.render("owner-login", { user });
});



router.get("/logout", isLogined, function(req,res) {
  
    res.render("home");
});
router.get("/products/home/:productid", async (req, res) => {
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

router.get("/destinations", isLogined, async function(req,res) {
  let Product = await  productModels.find();
  let success =req.flash('success');
     res.render("destinations", { Product , success});
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
   

router.post('/gallery/add', isLogined, async (req, res) => {
  try {
    const { title, description, thumbnailUrl, largeImageUrl, altText } = req.body;

    const newImage = new GalleryImage({
      title,
      description,
      thumbnailUrl,
      largeImageUrl,
      altText,
    });

    await newImage.save();

    // Redirect to gallery page after adding the image
    res.redirect('/gallery');
  } catch (error) {
    console.error(error);
    // You can redirect to an error page or back to the form with an error message
    res.status(500).send('Failed to add image');
  }
});



router.get("/gallery", isLogined, async function(req, res) {
  try {
    const galleryImages = await GalleryImage.find().sort({ createdAt: -1 }); // latest first
    let success = req.flash('success');
    res.render("gallery", { galleryImages, success });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    res.status(500).send("Server error");
  }
});
// Example: beach category ke images dikhane ke liye
// router.get('/gallery/:category', isLogined, async (req, res)  => {
//   try {
//     const category = req.params.category;
//     const validCategories = ['historical', 'beach', 'waterfall', 'mountain'];
//     if (!validCategories.includes(category)) {
//       return res.status(404).send('Category not found');
//     }

//     // Fetch image docs in this category
//     const galleryImages = await GalleryImage.find({ category }).sort({ createdAt: -1 });
//     res.render('gallery-category', { category, galleryImages });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error while loading gallery.');
//   }
// });

router.get('/gallery/upload', isLogined, (req, res) => {
  res.render('gallery-upload', { error: req.flash('error'), success: req.flash('success') });
});

// Show the upload form page
router.post('/gallery/upload', isLogined, async (req, res) => {
  try {
    const { title, description, thumbnailUrl, largeImageUrl, altText } = req.body;

    if (!thumbnailUrl || !largeImageUrl) {
      req.flash('error', 'Thumbnail URL and Large Image URL are required');
      return res.redirect('/gallery/upload');
    }

    const newImage = new GalleryImage({
      title,
      description,
      thumbnailUrl,
      largeImageUrl,
      altText,
    });

    await newImage.save();

    req.flash('success', 'Image uploaded successfully!');
    res.redirect('/gallery');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Failed to upload image, please try again.');
    res.redirect('/gallery/upload');
  }
});


module.exports = router;