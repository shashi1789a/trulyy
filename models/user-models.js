const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 5,
    trim: true,
  
  },
  phnumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  addtrip: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }],
  visit: {
    type: Array,
    default: []
  },
  contact: Number,
  picture: String
});

module.exports = mongoose.model('user', userSchema);
