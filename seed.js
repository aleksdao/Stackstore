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
var _ = require('lodash');
var Promise = require('bluebird');

var User = mongoose.model('User');
var Review = mongoose.model('Review');
var Category = mongoose.model('Category');
var Experience = mongoose.model('Experience');
var Cart = mongoose.model('Cart');
var Address = mongoose.model('Address');
var Review = mongoose.model('Review');
var Cart = mongoose.model('Cart');

var faker = require("faker");
var experiencePairs = [];

var wipeCollections = function () {
    var removeUsers = User.remove({});
    var removeCategories = Category.remove({});
    var removeReviews = Review.remove({});
    var removeExperiences = Experience.remove({});
    var removeCarts = Cart.remove({});
    var removeAddresses = Address.remove({});
    var removeCarts = Cart.remove({});


    return Promise.all([
        removeCarts,
        removeUsers,
        removeCategories,
        removeReviews,
        removeExperiences,
        removeCarts,
        removeAddresses
    ]);
};

var randomizerIdx = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var seedAddresses = function () {
  var addresses = [];

  _.times(100, function () {
    var address = {};
    address.address = faker.address.streetAddress();
    address.city = faker.address.city();
    address.state = faker.address.state();
    address.postalCode = faker.address.zipCode().slice(0, 5);
    address.country = faker.address.country();
    addresses.push(address);
  });

  return Address.create(addresses);

};

var seedUsers = function (addresses) {
    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            addresses: [addresses[randomizerIdx(0, addresses.length - 1)]._id, addresses[randomizerIdx(0, addresses.length - 1)]._id],
            admin: true
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            addresses: [addresses[randomizerIdx(0, addresses.length - 1)]._id, addresses[randomizerIdx(0, addresses.length - 1)]._id],
            admin: true
        }
    ];

    _.times(20, function() {
      var user = {};
      user.email = faker.internet.email();
      user.password = faker.internet.password();
      user.addresses = [];
      _.times(3, function () {
        user.addresses.push(addresses[randomizerIdx(0, addresses.length - 1)]._id);
      });
      users.push(user);
    });

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
  });

  return Category.create(categories);

};

//create photoURLs
function makePhotoUrls () {

   experiencePairs = [
    {name:'Solo Rock Climbing', photoUrl:'1.png'},
    {name:'Rome Segway Tour', photoUrl:'rome-segway.jpg'},
    {name:'Brooklyn Camel Sojurn', photoUrl:'enyoing-a-camel-ride.jpg'},
    {name:'Snowmobiling in Yellowstone', photoUrl:'snowmobiles_2.jpg'},
    {name:'Remote Heliskiing', photoUrl:'Heliskiing.JPG'},
    {name:'Hands-On Pottery', photoUrl:'Pottery-Mug.jpg'},
    {name:'Group Rock Climbing', photoUrl:'Custom-Programs-10.jpg'},
    {name:'Team Paintball', photoUrl:'SupAir_Player.jpg'},
    {name:'Figure Drawing', photoUrl:'7-22-13.jpg'},
    {name:'Cabinet Making', photoUrl:'MASW_AnC_Class.jpg'},
    {name:'Oil Painting & Wine', photoUrl:'PaintNite21.jpeg'},
    {name:'Chair Woodworking', photoUrl:'PortTownsendClass1.jpg'},
    {name:'Ireland Sailing', photoUrl:'Sailing-Courses.jpg'},
    {name:'Sipping & Painting', photoUrl:'Sippin-and-Paintin.jpg'},
    {name:'Archery Camp', photoUrl:'archery-camp.jpg'},
    {name:'Archery Lessons', photoUrl:'archery-lessons.jpg'},
    {name:'Ballooning at Dawn', photoUrl:'balloons.jpg'},
    {name:'Dodgers Fantasy Camp', photoUrl:'baseball-camp.jpg'},
    {name:'Colombia Camel Trip', photoUrl:'camels.jpg'},
    {name:'Woodworking Inlays', photoUrl:'5311511_orig.jpg'},
    {name:'Ocean Cliff Climbing', photoUrl:'climbing.jpg'},
    {name:'Advanced Clay Spinning', photoUrl:'hands-on-clay.jpg'},
    {name:'Helmet Diving', photoUrl:'helmet-dive.jpg'},
    {name:'NYC Segway Tour', photoUrl:'large.jpg'},
    {name:'Extreme Heliskiing in Alberta', photoUrl:'mike-wiegele-Deluxe-212.jpg'},
    {name:'Napoli Coast Solo Sail', photoUrl:'napali_coast17.JPG'},
    {name:'Oil Painting', photoUrl:'paint_brush_palette_colors.jpg'},
    {name:'Barcelona Painting Class', photoUrl:'painting-class.jpg'},
    {name:'Impressionist Painting', photoUrl:'painting_class_closeup02.jpg'},
    {name:'Traditional Pottery', photoUrl:'pot.jpg'},
    {name:'Expert Pottery Class', photoUrl:'pottery-class.jpg'},
    {name:'Solo Painting Lesson', photoUrl:'reaching-for-brushes.jpg'},
    {name:'Acapulco Sailing', photoUrl:'sailing-class.jpg'},
    {name:'Cornwall Coast Sailing', photoUrl:'sailing.jpg'},
    {name:'Quebec Snowmobiling', photoUrl:'snowmobiles_wit.jpg'},
    {name:'Star Wars Paintball', photoUrl:'storm-trooper-paintball.jpg'},
    {name:'Extreme Boot Camp', photoUrl:'web10.jpg'},
    {name:'Advanced Oil Painting', photoUrl:'wet-brushes.jpg'}
  ];

  var photoUrls = experiencePairs.map(function(pair){
    pair.photoUrl = 'https://www.hillphoto.com/experience_fpo/' + pair.photoUrl;
    return pair;
  });//end map
  return photoUrls;
}

var seedExperiences = function (addresses, categories, randomizerIdx) {
   makePhotoUrls();
    var experiences = experiencePairs;

    var experiencez = experiences.map(function(experience){
      experience.shortDescription = faker.lorem.sentences();
      experience.description = faker.lorem.paragraphs();
      experience.quantity = randomizerIdx(1, 10);
      experience.tempQuantity = experience.quantity;
      experience.price = faker.commerce.price();
      experience.category = categories[randomizerIdx(0, categories.length - 1)];
      experience.address = addresses[randomizerIdx(0, addresses.length - 1)];
      experience.averageRating = 0;
      return experience;

    });//end .map

    return Experience.create(experiencez);

};

var seedCarts = function (users, experiences) {
  var carts = [];
  for (var i = 0; i < users.length; i++) {
    var cart = {};
    cart.userId = users[i]._id;
    cart.lineItems = [];
    for (var j = 0; j < 10; j++) {
      var lineItem = {};
      lineItem.experienceId = experiences[randomizerIdx(0, 49)];
      lineItem.quantity = randomizerIdx(1,5);
      cart.lineItems.push(lineItem);
    }
    carts.push(cart);
  }

  return Cart.create(carts);
};

var seedReviews = function (experiences, users) {

  var reviews = [];


  for (var i = 0; i < 300; i++) {
    var review = {};
    review.description = faker.lorem.sentences();
    review.rating = randomizerIdx(1, 5);
    review.experience = experiences[randomizerIdx(0, experiences.length)]._id;
    review.user = users[randomizerIdx(0, 1)]._id;
    reviews.push(review);
  }

  return Review.create(reviews)
    .then(function (reviews) {
      var promisifyExperiences = [];
      experiences.forEach(function (experience) {
        var reviewAdded = false;
        reviews.forEach(function (review) {
          if (String(review.experience) === String(experience._id)) {
            reviewAdded = true;
            experience.reviews.push(review);

          }
        });
        if(reviewAdded) {
          promisifyExperiences.push(experience.save());
        }
      });
      return Promise.all(promisifyExperiences);
    });

};

var seedExperiencesWithReviews;

var _users;
var _experiences;
var _addresses;

connectToDb
    .then(function () {
      return wipeCollections();
    })
    .then(function () {
      return seedAddresses();
    })
    .then(function (addresses) {
      _addresses = addresses;
      return seedUsers(_addresses);
    })
    .then(function (users) {
      _users = users;
      return seedCategories();
    })
    .then(function (categories) {
      return seedExperiences(_addresses, categories, randomizerIdx);
    })
    .then(function (experiences) {
      _experiences = experiences;
      return seedCarts(_users, _experiences);
    })
    .then(function () {
      return seedReviews(_experiences, _users);
    })
    .then(function () {
      console.log(chalk.green('Seed successful!'));
      process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
