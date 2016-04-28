var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

router.post('/', function (req, res, next) {
  console.log(cart);
  var cart = req.body;
  cart.lineItems = cart.lineItems.map(function (lineItem) {
    lineItem.price = lineItem.experienceId.price;
    return lineItem;
  });
  Order.create({
    userId: cart.userId,
    totalCost: cart.subtotal,
    lineItems: cart.lineItems,
    shippingAddress: cart.shippingAddress,
    billingAddress: cart.billingAddress
  })
    .then(function (order) {
      console.log('does it create order', order);
      res.send(order);
    })
});

module.exports = router;
