var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Experience = mongoose.model('Experience');

var ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
};

router.param('id', function (req, res, next, id) {
  req.id = id;
  next();
});

router.get('/', ensureAuthenticated, function (req, res, next) {
  Experience.find({})
    .then(function (experiences) {
      res.send(experiences);
    });
});

router.get('/:id', ensureAuthenticated, function (req, res, next) {
  Experience.findById(req.id)
    .then(function (experience) {
      res.send(experience);
    });
});

router.post('/', ensureAuthenticated, function (req, res, next) {
  Experience.create(req.body)
    .then(function (createdExperience) {
      res.status(201).send(createdExperience);
    });
});

//the { new: true } option tells mongoose to send back the modified document.
//default is false, which is to return original document. Strange behavior

router.put('/:id', ensureAuthenticated, function (req, res, next) {
  Experience.findByIdAndUpdate(req.id, req.body, { new: true })
    .then(function (updatedExperience) {
      res.send(updatedExperience);
    });
});

router.delete('/:id', function (req, res, next) {
  Experience.findByIdAndRemove(req.id)
    .then(function () {
      res.sendStatus(204);
    });
});

module.exports = router;
