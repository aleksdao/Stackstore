var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

//if this is creating an Order.. shouldn't this be a POST to /orders

router.post('/', function (req, res, next) {
  console.log(cart);
  var cart = req.body;
  cart.lineItems = cart.lineItems.map(function (lineItem) {
    lineItem.price = lineItem.experienceId.price;
    return lineItem;
  });
  Order.create({
    userId: cart.userId,//don't we have the user from passport? req.user?
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
