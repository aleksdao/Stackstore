var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Experience = mongoose.model('Experience');
var Cart = mongoose.model('Cart');
var User = mongoose.model('User');


//i don't think user needs to be authenticated to add to cart

var ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
};

router.get('/', function (req, res, next) {
  if (req.user) {
    Cart.findOne({ userId: req.user._id })
      .populate('lineItems.experienceId')
      .then(function (foundCart) {
        if (!foundCart) {
          console.log('created a cart for user')
          return Cart.create({ userId: req.user._id })
        }
        else {
          console.log('found existing cart from user')
          return foundCart;
        }
      })
      .then(function (retrievedCart) {
        res.send(retrievedCart);
      })
  }
  else {

    //Todo: I'm currently casting req.sessionID to type String because I haven't
    //figured out how to reference the 'Session' model/schema that is automatically
    //created by the mongo-store. Ideally we would have the Cart schema have a
    //sessionId field with Schema.Types.ObjectId, ref: 'Session' type

    Cart.findOne({ sessionId: String(req.sessionID) })
      .populate('lineItems.experienceId')
      .then(function (foundCart) {
        if (!foundCart) {
          console.log('created a cart for non-logged-in-user from sessionID')
          return Cart.create({ sessionId: String(req.sessionID) })
        }
        else {
          console.log('found a cart for non-logged-in-user from sessionID', foundCart);
          return foundCart;
        }
      })
      .then(function (retrievedCart) {
        res.send(retrievedCart);
      })
  }

})

// currently this is not being used

router.post('/', function (req, res, next) {
  Cart.create({ userId: req.user._id })
    .then(function (createdCart) {
      res.status(201).send(createdCart);
    })
})

router.put('/:id', function (req, res, next) {
  Cart.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate('lineItems.experienceId')
    .then(function (modifiedCart) {
      res.send(modifiedCart);
    })
})

module.exports = router;

// Do we need a delete route? I don't see us ever deleting the cart. Users
// can remove items from the cart but the cart should persist, right?
