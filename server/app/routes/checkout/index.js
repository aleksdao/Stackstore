var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var stripe = require('stripe')("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

router.post('/', function (req, res, next) {
  var cart = req.body.cart;
  var payment = req.body.payment;
  console.log('cart: ', cart);
  console.log('payment: ', payment);

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
    return stripe.charges.create({
      amount: payment.amount,
      currency: "usd",
      source: payment.token, // obtained with Stripe.js
      description: "Charge for test@test.test"
    });
  })
  .then(function(charge) {
    console.log('charged card', charge);
    res.status(200).send(charge);
  });
});

module.exports = router;
