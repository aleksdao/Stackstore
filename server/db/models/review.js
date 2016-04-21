var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  user: {
    type: Schema.Types.objectId,
    ref: 'User'
  }
})

mongoose.model('Review', reviewSchema);
