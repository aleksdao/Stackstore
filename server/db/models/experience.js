var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
})

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
  price: {
    type: Number,
    required: true
  },
  photoUrl: {
    type: String,
    required: true,
    default: 'https://s-media-cache-ak0.pinimg.com/736x/73/b3/aa/73b3aa2a1c61dd98362b9f9e7ed92ec5.jpg'
  },
  categories: {
    type: [categorySchema]
  },
  address: {
    type: String,
    required: true
  },
  address2: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  createdBy: {
    type: Date
  },
  createdAt: {
    type: Date
  },
  updatedBy: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
})



mongoose.model('Category', categorySchema);
mongoose.model('Experience', experienceSchema);
