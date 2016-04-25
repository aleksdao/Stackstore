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

router.get('/', ensureAuthenticated, function (req, res, next) {
  Cart.findOne({ userId: req.user._id })
    .populate('experiences')
    .then(function (retrievedCart) {
      res.send(retrievedCart);
    })
})

router.post('/', ensureAuthenticated, function (req, res, next) {
  Cart.create({ userId: req.user._id })
    .then(function (createdCart) {
      res.status(201).send(createdCart);
    })
})

router.put('/:id', ensureAuthenticated, function (req, res, next) {
  Cart.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate('experiences')
    .then(function (modifiedCart) {
      res.send(modifiedCart);
    })
})

module.exports = router;

// Do we need a delete route? I don't see us ever deleting the cart. Users
// can remove items from the cart but the cart should persist, right?
