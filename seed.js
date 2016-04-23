/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Review = mongoose.model('Review');
var Category = mongoose.model('Category');
var Experience = mongoose.model('Experience');


var faker = require("faker");

var wipeCollections = function () {
    var removeUsers = User.remove({});
    var removeCategories = Category.remove({});
    var removeReviews = Review.remove({});
    var removeExperiences = Experience.remove({});
    return Promise.all([
        removeUsers,
        removeCategories,
        removeReviews,
        removeExperiences
    ]);
};

var randomizerIdx = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    for (var i = 0; i < 20; i++) {
      var user = {};
      user.email = faker.internet.email();
      user.password = faker.internet.password();
      users.push(user);
    }

    return User.create(users);

};

var seedCategories = function () {

  var categories = [
    'Adventures with animals',
    'Great for families',
    'Not for the faint of heart',
    'The urban jungle',
    'Sporting events',
    'Culinary delights',
    'Immersed in nature',
    'Mindfulness and meditation',
    'Margaritas by the beach'
  ];

  categories = categories.map(function (category) {
    var categoryObj = {};
    categoryObj.name = category;
    return categoryObj;
  })

  return Category.create(categories);

}

var seedExperiences = function (categories, randomizerIdx) {

    var experiences = [];

    for (var i = 0; i < 50; i++) {
      var experience = {};
      experience.name = faker.lorem.words();
      experience.shortDescription = faker.lorem.sentences();
      experience.description = faker.lorem.paragraphs();
      experience.quantity = randomizerIdx(1, 10);
      experience.price = faker.commerce.price();
      experience.categories = [categories[randomizerIdx(0, 8)]];
      experience.photoUrl = faker.image.nightlife();
      experience.address = faker.address.streetAddress();
      experience.city = faker.address.city();
      experience.state = faker.address.state();
      experience.postalCode = faker.address.zipCode();
      experience.country = faker.address.country();
      experiences.push(experience);
    }

    return Experience.create(experiences);

};

// var seedReviews = function (randomizerIdx, products, users) {
//
//   var reviews = [];
//
//   for (var i = 0; i < 100; i++) {
//     var review = {};
//     review.description = faker.lorem.sentences();
//     review.rating = randomizerIdx(1, 5);
//     reviews.push(review);
//   }
//
//
//   reviews = reviews.map(function (review) {
//     review.experience = experience[randomizerIdx(0, 49)]._id;
//     review.user = users[randomizerIdx(0, 1)]._id;
//     return review;
//   })
//
//   return Review.create(reviews);
//
// }

var _users;

connectToDb
    .then(function () {
        return wipeCollections();
    })
    .then(function () {
        return seedUsers();
    })
    .then(function (users) {
        _users = users;
        return seedCategories();
    })
    .then(function (categories) {
        return seedExperiences(categories, randomizerIdx);
    })
    .then(function (experiences) {
      console.log(chalk.green('Seed successful!'));
      process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
