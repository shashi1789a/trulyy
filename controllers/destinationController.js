const Destination = require('../models/Destination');

<<<<<<< HEAD

=======
// GET /destinations - Display all destinations
>>>>>>> 0fd1302 (Update travel project)
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });
    res.render('destinations', {
      destinations,
<<<<<<< HEAD
      user: req.user 
=======
      user: req.user // Make sure to pass user (if logged in)
>>>>>>> 0fd1302 (Update travel project)
    });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).send('Server error');
  }
};

<<<<<<< HEAD

exports.addRating = async (req, res) => {
  const destinationId = req.params.id;
  const { score, comment } = req.body;
  const userId = req.user._id; 
=======
// POST /destinations/:id/rate - Add or update rating
exports.addRating = async (req, res) => {
  const destinationId = req.params.id;
  const { score, comment } = req.body;
  const userId = req.user._id; // Must be available from middleware
>>>>>>> 0fd1302 (Update travel project)

  try {
    const destination = await Destination.findById(destinationId);
    if (!destination) return res.status(404).send('Destination not found');

    const existingRating = destination.ratings.find(r => r.user.toString() === userId.toString());

    if (existingRating) {
      existingRating.score = score;
      existingRating.comment = comment;
    } else {
      destination.ratings.push({ user: userId, score, comment });
    }

    destination.calculateAverageRating();
    await destination.save();

    res.redirect('/destinations');
  } catch (error) {
    console.error('Rating error:', error);
    res.status(500).send('Server error');
  }
};
