var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Experience = mongoose.model('Experience');
var User = mongoose.model('User');

var ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
};

router.param('id', function (req, res, next, id) {
  req.id = id;//not sure this buys us much
  next();
});

//ALex: Middleware below is setting a user for easier testing with Postman.
// instead of doing this.. which I understand.. write a test
//Feel free to remove if you don't need it

// router.use('/', function (req, res, next) {
//   User.find({})
//     .then(function (users) {
//       req.user = users[0];
//       next();
//     })
// })

router.get('/', function (req, res, next) {
  Experience.find({})
    .then(function (experiences) {
      res.send(experiences);
    });
});

router.get('/:id', function (req, res, next) {
  Experience.findById(req.id)
    .then(function (experience) {
      res.send(experience);
    });
});

router.post('/', function (req, res, next) {
  Experience.create(req.body)
    .then(function (createdExperience) {
      res.status(201).send(createdExperience);
    });
});

//the { new: true } option tells mongoose to send back the modified document.
//default is false, which is to return original document. Strange behavior

router.put('/:id', function (req, res, next) {
  //my advice is to find what you are editing.. and just update it..
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
