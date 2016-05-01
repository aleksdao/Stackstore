var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var addressSchema = mongoose.model('Address').schema;

//good.. nice simple Schema
var orderSchema = Schema ({
  lineItems: [
    {
      experienceId: {type: Schema.Types.ObjectId, ref: 'Experience'},
      quantity: Number,
      price: Number
    }
  ],
  tax: Number,
  shippingCost: Number,
  totalCost: Number,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  shippingAddress: addressSchema,
  billingAddress: addressSchema
});

mongoose.model('Order', orderSchema);
