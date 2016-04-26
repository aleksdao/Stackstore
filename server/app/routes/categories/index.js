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

router.get('/:id/experiences', function (req, res, next) {
  Category.findById(req.params.id)
    .then(function (category) {
      console.log('category',category);
      return Experience.find({ 'category.name' : category.name });
    })
    .then(function (experiences) {
      res.send(experiences);
    })
})

module.exports = router;
