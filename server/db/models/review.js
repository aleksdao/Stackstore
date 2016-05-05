var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);


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

reviewSchema.plugin(deepPopulate, {
  populate: {
    'user': {
      select: 'email'
    }
  }});


mongoose.model('Review', reviewSchema);
