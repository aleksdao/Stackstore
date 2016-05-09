var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/manage/users/:id/promote', function (req, res, next) {
  var promotedUser;
  User.findById(req.params.id)
    .then(function (user) {
      user.admin = true;
      return user.save();
    })
    .then(function (_promotedUser) {
      promotedUser = _promotedUser;
      return User.find({});
    })
    .then(function (allUsers) {
      res.json({ promotedUser: promotedUser, allUsers: allUsers });
    })
})

router.get('/manage/users/:id/demote', function (req, res, next) {
  var demotedUser;
  User.findById(req.params.id)
    .then(function (user) {
      user.admin = false;
      return user.save();
    })
    .then(function (_demotedUser) {
      demotedUser = _demotedUser;
      return User.find({});
    })
    .then(function (allUsers) {
      res.json({ demotedUser: demotedUser, allUsers: allUsers });
    })
})

module.exports = router;
