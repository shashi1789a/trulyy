const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config");
const placeModel = require('../models/product-models');

// Route to handle place creation
router.post("/create", upload.single("image"), async function (req, res) {
  try {
    const {
      name,
      description,
      category,
      entryFee,
      openingTime,
      closingTime,
      location = {},
      nearbyTransport = [],
      nearbyHotels = [],
      nearbyRestaurants = [],
      weatherInfo = {},
      tsunamiAlert = {},
      rating = {}
    } = req.body;

    const {
      address,
      city,
      state,
      country,
      coordinates = {}
    } = location;

    const lat = parseFloat(coordinates.lat);
    const lng = parseFloat(coordinates.lng);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).send("Invalid latitude or longitude.");
    }

    // Parse numeric entry fee and rating
    const parsedEntryFee = parseFloat(entryFee) || 0;
    const averageRating = parseFloat(rating.average) || 0;
    const ratingCount = parseInt(rating.count) || 0;

    // Ensure arrays are parsed (from JSON strings if sent from form as text)
    const parseArray = (data) =>
      typeof data === "string" ? JSON.parse(data) : data;

    const newProduct = await placeModel.create({
      image: req.file?.buffer || null,
      name,
      description,
      category,
      entryFee: parsedEntryFee,
      openingHours: {
        open: openingTime,
        close: closingTime,
      },
      location: {
        address,
        city,
        state,
        country,
        coordinates: { lat, lng },
      },
      nearbyTransport: parseArray(nearbyTransport),
      nearbyHotels: parseArray(nearbyHotels),
      nearbyRestaurants: parseArray(nearbyRestaurants),
      weatherInfo: {
        temperature: parseFloat(weatherInfo.temperature) || null,
        condition: weatherInfo.condition || '',
        lastUpdated: weatherInfo.lastUpdated
          ? new Date(weatherInfo.lastUpdated)
          : null,
      },
      tsunamiAlert: {
        active: tsunamiAlert.active === 'true' || tsunamiAlert.active === true,
        message: tsunamiAlert.message || '',
        issuedAt: tsunamiAlert.issuedAt ? new Date(tsunamiAlert.issuedAt) : null,
      },
      rating: {
        average: averageRating,
        count: ratingCount,
      },
    });
 


    req.flash("success", "Place created successfully");
    res.redirect("/owners/admin");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
