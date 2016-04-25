var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  lineItems: [
    {
      experienceId: {type: Schema.Types.ObjectId, ref: 'Experience'},
      quantity: Number
    }
  ],
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
  createdDate: Date,
  updatedBy: {type: Schema.Types.ObjectId, ref: 'User'},
  updatedDate: Date
});


mongoose.model('Cart', cartSchema);
