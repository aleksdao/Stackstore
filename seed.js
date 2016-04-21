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
var Product = mongoose.model('Product');
var Review = mongoose.model('Review');
var Category = mongoose.model('Category');

var faker = require("faker");

var wipeCollections = function () {
    var removeUsers = User.remove({});
    var removeCategories = Category.remove({});
    var removeProducts = Product.remove({});
    var removeReviews = Review.remove({});
    return Promise.all([
        removeUsers,
        removeCategories,
        removeProducts,
        removeReviews
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

    return User.create(users);

};

var seedCategories = function () {

  var categories = [];

  for (var i = 0; i < 10; i++) {
    var category = {};
    category.name = faker.commerce.productAdjective();
    categories.push(category);
  }


  return Category.create(categories);

}

var seedProducts = function (seedCategoriesFn, randomizerIdx) {

    var products = [];

    for (var i = 0; i < 50; i++) {
      var product = {};
      product.title = faker.commerce.productName();
      product.description = faker.lorem.paragraphs();
      product.quantity = Math.floor(Math.random() * 9) + 1;
      product.price = faker.commerce.price();
      product.categories = [];
      product.imageUrl = faker.image.imageUrl();
      products.push(product);
    }



    return seedCategoriesFn()
      .then(function (categories) {
        products = products.map(function (product) {
          product.categories.push(categories[randomizerIdx(0, 9)]._id);
          return product;
        })
        return Product.create(products);

    })

};

var seedReviews = function (randomizerIdx) {

  var reviews = [];

  for (var i = 0; i < 100; i++) {
    var review = {};
    review.description = faker.lorem.sentences();
    review.rating = randomizerIdx(1, 5);
    reviews.push(review);
  }

  return Product.find({})
    .then(function (products) {
      console.log("getting products", products)
      reviews = reviews.map(function (review) {
        review.product = products[randomizerIdx(0, 49)]._id
        return review;
      })
      return User.find({})
    })
    .then(function (users) {
      reviews = reviews.map(function (review) {
        review.user = users[randomizerIdx(0, 1)]._id
        return review;
      })
      return Review.create(reviews);
    })

}


connectToDb
    .then(function () {
        return wipeCollections();
    })
    .then(function () {
        return seedUsers();
    })
    .then(function () {
        return seedProducts(seedCategories, randomizerIdx);
    })
    .then(function (products) {
        return seedReviews(randomizerIdx);
    })
    .then(function (reviews) {
      console.log("reviews", reviews);
      console.log(chalk.green('Seed successful!'));
      process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
