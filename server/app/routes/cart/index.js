var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Experience = mongoose.model('Experience');
var Cart = mongoose.model('Cart');
var User = mongoose.model('User');

var ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
};

//Alex: Middleware below is setting a user for easier testing with Postman.
//Feel free to remove if you don't need it

// router.use('/', function (req, res, next) {
//   User.find({})
//     .then(function (users) {
//       req.user = users[0];
//       next();
//     })
// })

router.get('/', function (req, res, next) {
  //will we always find one?

  Cart.findOne({ userId: req.user._id })
    .populate('lineItems.experienceId')
    .then(function (retrievedCart) {
      res.send(retrievedCart);
    }, next);

});

router.post('/', function (req, res, next) {
  Cart.create({ userId: req.user._id })
    .then(function (cart) {
      res.status(201).send(cart);
    });
});

router.put('/:id', function (req, res, next) {
  //again.. I would just find it and update it
  Cart.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate('lineItems.experienceId')
    .then(function (modifiedCart) {
      res.send(modifiedCart);
    }, next);
});

module.exports = router;

// Do we need a delete route? I don't see us ever deleting the cart. Users
// can remove items from the cart but the cart should persist, right?
