const Destination = require('../models/Destination');


exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });
    res.render('destinations', {
      destinations,
      user: req.user 
    });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).send('Server error');
  }
};


exports.addRating = async (req, res) => {
  const destinationId = req.params.id;
  const { score, comment } = req.body;
  const userId = req.user._id; 

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
