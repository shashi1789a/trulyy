const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    enum: ['historical', 'beach', 'waterfall', 'mountain'],
    required: true,
  },

  image: Buffer,

  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    coordinates: {
      lat: {
        type: Number,
       
      },
      lng: {
        type: Number,
      
      },
    },
  },

  entryFee: {
    type: Number,
    default: 0,
  },

  openingHours: {
    open: String, 
    close: String, 
  },

  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner', 
  },

  nearbyTransport: [
    {
      type: {
        type: String, 
      },
      description: String,
      distanceKm: Number,
    },
  ],

  nearbyHotels: [
    {
      name: String,
      address: String,
      contact: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
  ],

  nearbyRestaurants: [
    {
      name: String,
      address: String,
      contact: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
  ],

  weatherInfo: {
    temperature: Number,
    condition: String, 
    lastUpdated: Date,
  },

  tsunamiAlert: {
    active: {
      type: Boolean,
      default: false,
    },
    message: String,
    issuedAt: Date,
  },

  rating: {
    average: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
