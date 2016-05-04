'use strict';
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var facebookConfig = app.getValue('env').FACEBOOK;

    var facebookCredentials = {
        clientID: facebookConfig.clientID,
        clientSecret: facebookConfig.clientSecret,
        callbackURL: facebookConfig.callbackURL,
        profileFields: ["id", "birthday","first_name","email", "last_name", "gender", "picture.width(200).height(200)"]
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
      console.log(profile);
        UserModel.findOne({ email : profile.emails[0].value }).exec()
            .then(function (user) {
              console.log('found this guy?', user)
                if (user) {
                    user.facebook.id = profile.id
                    return user.save();
                } else {
                    return UserModel.create({
                        email : profile.emails[0].value,
                        facebook: {
                            id: profile.id
                        }
                    });
                }

            })
            .then(function (userToLogin) {
                done(null, userToLogin);
            })
            .catch(function (err) {
                console.error('Error creating user from Facebook authentication', err);
                done(err);
            })

    };

    passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/');
        });

};
