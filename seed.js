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

var faker = require("faker");

var wipeCollections = function () {
    var removeUsers = User.remove({});
    var removeCategories = Category.remove({});
    var removeReviews = Review.remove({});
    var removeExperiences = Experience.remove({});
    var removeCarts = Cart.remove({});
    var removeAddresses = Address.remove({});

    return Promise.all([
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
}

var seedAddresses = function () {
  var addresses = [];

  _.times(100, function () {
    var address = {};
    address.address = faker.address.streetAddress();
    address.city = faker.address.city();
    address.state = faker.address.state();
    address.postalCode = faker.address.zipCode();
    address.country = faker.address.country();
    addresses.push(address);
  })

  return Address.create(addresses);

}

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
  var photoNames = [
    '1.png','5311511_orig.jpg','snowmobiles_2.jpg','7-22-13.jpg','Custom-Programs-10.jpg','Heliskiing.JPG','MASW_AnC_Class.jpg','PaintNite21.jpeg','PortTownsendClass1.jpg','Pottery-Mug.jpg','Sailing-Courses.jpg','Sippin-and-Paintin.jpg','SupAir_Player.jpg','archery-camp.jpg','archery-lessons.jpg','balloons.jpg','baseball-camp.jpg','camels.jpg','climbing.jpg','enyoing-a-camel-ride.jpg','hands-on-clay.jpg','helmet-dive.jpg','large.jpg','mike-wiegele-Deluxe-212.jpg','napali_coast17.JPG','paint_brush_palette_colors.jpg','painting-class.jpg','painting_class_closeup02.jpg','pot.jpg','pottery-class.jpg','reaching-for-brushes.jpg','rome-segway.jpg','sailing-class.jpg','sailing.jpg','snowmobiles_wit.jpg','storm-trooper-paintball.jpg','web10.jpg','wet-brushes.jpg'
  ];
  var photoUrls = photoNames.map(function(file){
    var _file = 'http://www.hillphoto.com/experience_fpo/' + file;
    return _file;
  });//end map
  return photoUrls;
}

var seedExperiences = function (addresses, categories, randomizerIdx) {
    var _photoUrls = makePhotoUrls();
    var experiences = [];

    _.times(50, function () {
      var experience = {};
      experience.name = faker.lorem.words();
      experience.shortDescription = faker.lorem.sentences();
      experience.description = faker.lorem.paragraphs();
      experience.quantity = randomizerIdx(1, 10);
      experience.tempQuantity = experience.quantity;
      experience.price = faker.commerce.price();
      experience.category = categories[randomizerIdx(0, categories.length - 1)];
      experience.address = addresses[randomizerIdx(0, addresses.length - 1)];
      experience.photoUrl = _photoUrls[randomizerIdx(0, _photoUrls.length-1)];
      experience.averageRating = 0;
      // experience.ratingAverage = randomizerIdx(2,5);
      experiences.push(experience);
    });

    return Experience.create(experiences);

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
    review.experience = experiences[randomizerIdx(0, 49)]._id;
    review.user = users[randomizerIdx(0, 1)]._id;
    reviews.push(review);
  }

  return Review.create(reviews)
    .then(function (reviews) {
      var promisifyExperiences = [];
      experiences.forEach(function (experience) {
        var reviewAdded = false;
        reviews.forEach(function (review) {
          // console.log('experience', experience._id)
          // console.log(review.experience);
          if (String(review.experience) === String(experience._id)) {
            // console.log('heres one', review.experience)
            reviewAdded = true;
            experience.reviews.push(review);

          }
        })
        if(reviewAdded) {
          console.log('yes added')
          promisifyExperiences.push(experience.save());
        }
      })
      return Promise.all(promisifyExperiences);
    })

};

var seedExperiencesWithReviews

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
