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
  experience: {
    type: Schema.Types.ObjectId,
    ref: 'Experience'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: { type: Date,
    default: Date.now }
});


mongoose.model('Review', reviewSchema);
