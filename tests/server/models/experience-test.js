var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models');

var Experience = mongoose.model('Experience');

describe('Experience model', function () {

  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  it('should exist', function () {
    expect(Experience).to.be.a('function');
  })

  describe('database validates for required fields', function () {

    var createInvalidExperience = function () {
      return Experience.create({
        name: 'Riding tortoises in the Tibetan highland'
      });
    }

    var createValidExperience = function () {
      return Experience.create({
        name: 'Riding tortoises in the Tibetan highland',
        description: 'Exactly what it sounds like',
        quantity: 2,
        price: 300,
        photoUrl: 'https://s-media-cache-ak0.pinimg.com/736x/73/b3/aa/73b3aa2a1c61dd98362b9f9e7ed92ec5.jpg'
      })
    }

    it('will not be saved to database if missing required fields', function () {
      createInvalidExperience()
        .then(function (experience) {
          expect(experience).to.be.undefined;
        })
    })

    it('will be successfully saved to db if it contains all required fields', function () {
      createValidExperience()
        .then(function (experience) {
          expect(experience).to.not.be.undefined;
        })
    })

    describe('database validates for the correct data types', function () {

      var createValidExperience = function () {
        return Experience.create({
          name: 'Riding tortoises in the Tibetan highland',
          description: 'Exactly what it sounds like',
          quantity: 2,
          price: 300,
          photoUrl: 'https://s-media-cache-ak0.pinimg.com/736x/73/b3/aa/73b3aa2a1c61dd98362b9f9e7ed92ec5.jpg'
        })
      }

      it('after a document is created, each field should have the correct data type', function () {
        createValidExperience()
          .then(function (experience) {
            expect(experience.name).to.be.a('string');
            expect(experience.description).to.be.a('string');
            expect(experience.quantity).to.be.a('number');
            expect(experience.price).to.be.a('number');
            expect(experience.photoUrl).to.be.a('string');
          })
      })

    })

  })

})
