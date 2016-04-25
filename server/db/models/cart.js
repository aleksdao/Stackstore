var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  line_items: [
    {
      experience_id: {type: Schema.Types.ObjectId, ref: 'Experience'},
      quantity: Number
    }
  ],
  created_by: {type: Schema.Types.ObjectId, ref: 'User'},
  created_date: Date,
  updated_by: {type: Schema.Types.ObjectId, ref: 'User'},
  updated_date: Date
});


mongoose.model('Cart', cartSchema);
