'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var User = (mongoose.model('User'));

var ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
};

//below routes for member/users create, delete, list all
router.post('/', function (req, res, next) {
  // var newUser = new User({ email: req.body.email, password: req.body.password });
  User.create({ email: req.body.email, password: req.body.password })
  .then(function (user) {
    res.status(200).json(user);
  })
  .then(null, next);
});

router.delete('/:id', function (req, res, next) {
  User.remove({ _id: req.params.id })
  .then(function () {
    res.sendStatus(204);
  })
  .then(null, next);
});

router.get('/', function (req, res, next) {
  User.find({})
  .then(function (users) {
    res.status(200).json(users);
  });
});

router.get('/secret-stash', ensureAuthenticated, function (req, res) {

  var theStash = [
        'http://hillphoto.com/fullstack2/20140121-IMG_1201.jpg',
        'http://hillphoto.com/fullstack2/20131116-_DSC4730%20edited.jpg',
        'http://hillphoto.com/fullstack2/20131123-IMG_1107%20edited.jpg',
        'http://hillphoto.com/fullstack2/20131101-IMG_1074.jpg',
        'http://hillphoto.com/fullstack2/20131101-IMG_1072.jpg',
        'http://hillphoto.com/fullstack2/20131020-IMG_1031_edited.jpg',
        'http://p-fst1.pixstatic.com/51071384dbd0cb50dc00616b._w.540_h.610_s.fit_.jpg',
        'http://childcarecenter.us/static/images/providers/2/89732/logo-sunshine.png',
        'http://www.allgraphics123.com/ag/01/10683/10683.jpg',
        'http://img.pandawhale.com/post-23576-aflac-dancing-duck-pigeons-vic-RU0j.gif',
        'http://www.eveningnews24.co.uk/polopoly_fs/1.1960527.1362056030!/image/1301571176.jpg_gen/derivatives/landscape_630/1301571176.jpg',
        'http://media.giphy.com/media/vCKC987OpQAco/giphy.gif',
        'https://my.vetmatrixbase.com/clients/12679/images/cats-animals-grass-kittens--800x960.jpg',
        'http://www.dailymobile.net/wp-content/uploads/2014/10/lollipops.jpg',
    ];

  res.send(_.shuffle(theStash));

});
