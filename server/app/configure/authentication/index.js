'use strict';
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var path = require('path');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var nodemailerCredentials = require('../../../env/development').NODEMAILER;

var ENABLED_AUTH_STRATEGIES = [
    'local',
    'twitter',
    'facebook',
    'google'
];

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: nodemailerCredentials.USER,
    pass: nodemailerCredentials.PASSWORD
  }
});

module.exports = function (app) {

    // First, our session middleware will set/read sessions from the request.
    // Our sessions will get stored in Mongo using the same connection from
    // mongoose. Check out the sessions collection in your MongoCLI.
    app.use(session({
        secret: app.getValue('env').SESSION_SECRET,
        store: new MongoStore({mongooseConnection: mongoose.connection}),
        resave: false,
        saveUninitialized: false
    }));

    // Initialize passport and also allow it to read
    // the request session information.
    app.use(passport.initialize());
    app.use(passport.session());

    // When we give a cookie to the browser, it is just the userId (encrypted with our secret).
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // When we receive a cookie from the browser, we use that id to set our req.user
    // to a user found in the database.
    passport.deserializeUser(function (id, done) {
        User.findById(id, done);
    });

    // We provide a simple GET /session in order to get session information directly.
    // This is used by the browser application (Angular) to determine if a user is
    // logged in already.
    app.get('/session', function (req, res) {
        if (req.user) {
            res.send({ user: req.user.sanitize() });
        } else {
            res.status(401).send('No authenticated user.');
        }
    });

    // Simple /logout route.
    app.get('/logout', function (req, res) {
        req.session.destroy();
        req.logout();
        res.status(200).end();
    });


    app.post('/forgot', function (req, res, next) {
      var randomToken = crypto.randomBytes(20).toString('hex');
      User.findOne({ email: req.body.email })
        .then(function (foundUser) {
          if (!foundUser) {
            var notFound = new Error('We could not find that e-mail address.');
            notFound.status = 404;
            return next(notFound);
          }
          else {
            foundUser.forgotPasswordToken = randomToken;
            foundUser.forgotPasswordExpires = Date.now() + 360000;
            return foundUser.save();
          }
        })
        .then(function (foundUser) {
          if (foundUser) {
            var mailOptions = {
              from: 'passwordreset@stackstore.com',
              to: 'rahx1t@gmail.com',
              subject: 'Experience! Adventures! Password Reset',
              text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + randomToken + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                res.send(error);
              }
              else {
                res.send('An e-mail has been sent to ' + foundUser.email + ' with further instructions');
              }
            })
          }

        })
        .then(null, next);
    })

    app.get('/api/reset/:token', function (req, res, next) {
      User.findOne({ forgotPasswordToken: req.params.token })
        .then(function (foundUser) {
          if (!foundUser) {
            return next('Password reset token is invalid or has expired.');
          }
          else {
            res.send(foundUser);
            //load the Reset Password template
          }
        })
    })

    app.post('/api/reset/:token', function (req, res, next) {
      User.findOne({ forgotPasswordToken: req.params.token })
        .then(function (foundUser) {
          if (!foundUser) {
            return next('Password reset token is invalid or has expired.');
          }
          else {
            foundUser.password = req.body.password;
            foundUser.forgotPasswordToken = null;
            foundUser.forgotPasswordExpires = null;
            return foundUser.save();
          }
        })
        .then(function (foundUser) {
          if (foundUser) {
            var mailOptions = {
            to: 'rahx1t@gmail.com',
            from: 'passwordreset@stackstore.com',
            subject: 'Your password has been changed',
            text: 'Hello,\n\n' +
              'This is a confirmation that the password for your account ' + foundUser.email + ' has just been changed.\n'
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                res.send(error);
              }
              else {
                res.send('Success! Your password has been changed');
              }
            });
          }
        });

    })

    // Each strategy enabled gets registered.
    ENABLED_AUTH_STRATEGIES.forEach(function (strategyName) {
        require(path.join(__dirname, strategyName))(app);
    });

};
