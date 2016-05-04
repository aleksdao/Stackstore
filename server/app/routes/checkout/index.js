var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var stripe = require('stripe')("sk_test_BQokikJOvBiI2HlWgH4olfQ2");
var nodemailer = require('nodemailer');
var Promise = require('bluebird');
var Experience = mongoose.model('Experience');
var Cart = mongoose.model('Cart');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
})

router.post('/', function (req, res, next) {
  var cart = req.body.cart;
  var payment = req.body.payment;
  var orderConfirmation = {};
  var removeStockAfterOrderPromises = [];

  var removeStockFromExperience = function (lineItem) {
    var prevExpQuantity;
    Experience.findById(lineItem.experienceId)
      .then(function (experience) {
        prevExpQuantity = experience.quantity;
        experience.quantity = experience.quantity - lineItem.quantity;
        return experience.save();
      }).
      then(function (updExperience) {
        console.log('for experience ', updExperience.name, ': we decremented qty from ', prevExpQuantity, 'to ', updExperience.quantity);
      })
  }

  var emptyCart = function (cart) {
    console.log('emtpying cart', cart)
    return Cart.findById(cart._id)
      .then(function (_cart) {
        _cart.lineItems = [];
        return _cart.save();
      })
  }


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
      console.log('creating order, ', order)
      orderConfirmation.orderId = order._id;
      for (var i = 0; i < order.lineItems.length; i++) {
        removeStockAfterOrderPromises.push(removeStockFromExperience(order.lineItems[i]));
      }
      return Promise.all(removeStockAfterOrderPromises);
    })
    .then(function () {
      return emptyCart(cart);
    })
    .then(function (cart) {
      console.log("CART AFTER EMPTYING: ", cart);
      return stripe.charges.create({
        amount: payment.amount,
        currency: "usd",
        source: payment.token, // obtained with Stripe.js
        description: "Charge for test@test.test"
      });
    })
    .then(function(charge) {
      console.log('charged card', charge);
      orderConfirmation.stripeCharge = charge;
      if (process.env.NODEMAILER_USER) {
        var mailOptions = {
          from: 'rahx1t@gmail.com',
          to: 'rahx1t@gmail.com',
          subject: 'Order Confirmation from Experience! Adventures! ' + orderConfirmation.orderId,
          text: 'Success!'
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            res.send(error);
          }
          else {
            orderConfirmation.email = info.response;
            console.log('Message sent' + info.response);
          }
        })
      }
      res.send(orderConfirmation);

    });

  });


module.exports = router;
