var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

var productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categories: [{
    type: Schema.ObjectId,
    ref: 'Category',
    required: true,
  }],
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
    default: 'http://i.imgur.com/EZaTQeD.jpg'
  }
})

var notEmpty = function (categories) {
  if (!categories) return false;
  else if (categories.length === 0) return false;
  return true;
};

mongoose.model('Category', categorySchema);
mongoose.model('Product', productSchema);
