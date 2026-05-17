const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');

// Middleware to check if user is logged in
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  res.redirect('/login');
}

// GET all destinations
router.get('/', destinationController.getAllDestinations);

// POST rating
router.post('/:id/rate', ensureAuthenticated, destinationController.addRating);

module.exports = router;
