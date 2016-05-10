'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = router;

//Alex: Middleware below is setting a user for easier testing with Postman.
//Feel free to remove if you don't need it

router.use('/', function (req, res, next) {
  // console.log('session', req.sessionID);
  next();
});

router.use('/members', require('./members'));
router.use('/experiences', require('./experiences'));
router.use('/cart', require('./cart'));
router.use('/categories', require('./categories'));
router.use('/checkout', require('./checkout'));
router.use('/admin', require('./admin'));
router.use('/orders', require('./orders'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
