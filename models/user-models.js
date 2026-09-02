const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 5,
    trim: true,
<<<<<<< HEAD
  
  },
  phnumber: {
    type: Number,
    required: true
  },
=======
    // required: true
  },
  phnumber: {
    type: Number,
    
  },
  googleId: {
    type: String,
    default: null
},

photo: {
    type: String,
    default: ""
},
>>>>>>> 0fd1302 (Update travel project)
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
