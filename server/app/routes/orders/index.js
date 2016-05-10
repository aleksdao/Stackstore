var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');


//below gets all orders by userId
router.get('/:id', function (req, res, next) {
  Order.find({ userId: req.params.id })
  .populate('lineItems.experienceId', 'name photoUrl')
    .then(function (orders) {
      res.status(200).send(orders);
    });
});


module.exports = router;
