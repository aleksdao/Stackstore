var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Experience = mongoose.model('Experience');
var Cart = mongoose.model('Cart');

var ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
};

router.param('id', function (req, res, next, id) {
  // req.id = id;
  Cart.findById(id)
    .then(function (retrievedCart) {
      req.cart = retrievedCart;
    })
  next();
})

router.get('/:id', function (req, res, next) {
  res.send(req.cart);
})

router.post('/', function (req, res, next) {
  Cart.create({ userId: req.body.userId })
    .then(function (createdCart) {
      res.status(201).send(createdCart);
    })
})

router.put('/:id', function (req, res, next) {
  req.cart.set(req.body);
  req.cart.save()
    .then(function (modifiedCart) {
      res.send(modifiedCart);
    })
})

// Do we need a delete route? I don't see us ever deleting the cart. Users
// can remove items from the cart but the cart should persist, right?
