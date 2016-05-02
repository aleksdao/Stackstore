var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var addressSchema = mongoose.model('Address').schema;
var reviewSchema = mongoose.model('Review').schema;

var categorySchema = new Schema({
  name: {
    type: String,
    enum: [
      'Adventures with animals',
      'Great for families',
      'Not for the faint of heart',
      'The urban jungle',
      'Sporting events',
      'Culinary delights',
      'Immersed in nature',
      'Mindfulness and meditation',
      'Margaritas by the beach'
    ],
    required: true
  }
});

var experienceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  tempQuantity: {
    type: Number,
    required: true
  },
  reviews: {
    type: [reviewSchema],
    default: []
  },
  price: {
    type: Number,
    required: true
  },
  photoUrl: {
    type: String,
    required: true,
    default: 'https://s-media-cache-ak0.pinimg.com/736x/73/b3/aa/73b3aa2a1c61dd98362b9f9e7ed92ec5.jpg'
  },
  category: {
    type: categorySchema
  },
  address: addressSchema,
  createdBy: {
    type: Date
  },
  averageRating:  {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Category', categorySchema);
mongoose.model('Experience', experienceSchema);
