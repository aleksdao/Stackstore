var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Experience = mongoose.model('Experience');
var Category = mongoose.model('Category');

router.get('/', function (req, res, next) {
  Category.find({})
    .then(function (categories) {
      res.send(categories);
    })
})

router.get('/:id', function (req, res, next) {
  Category.findById(req.params.id)
    .then(function (category) {
      return Product.find({ categories: category });
    })
    .then(function (products) {
      res.send(products);
    })
})

module.exports = router;
