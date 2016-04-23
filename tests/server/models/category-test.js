var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models');

var Category = mongoose.model('Category');

describe('Category model', function () {

  beforeEach('Establish DB connection', function (done) {
      if (mongoose.connection.db) return done();
      mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
      clearDB(done);
  });

  it('should exist', function () {
    expect(Category).to.be.a('function');
  })

  describe('category schema should validate for required fields', function () {

    describe('database validates for required fields', function () {

      var createCategoryWithNoName = function () {
        return Category.create({
          description: 'here is a description'
        });
      }

      it('should not return a category document wihtout name field', function () {
        createCategoryWithNoName()
          .then(function (category) {
            expect(category).to.be.undefined;
          })

      })
    })

    describe('database validates that name is one of enum values', function () {

      var createCategoryWithInvalidName = function () {
        return Category.create({
          name: 'here is a description'
        });
      }

      var createCategoryWithValidName = function () {
        return Category.create({
          name: 'Adventures with animals'
        });
      }

      it('does not save category document if name is not one of possible enum values', function () {
        createCategoryWithInvalidName()
          .then(function (category) {
            expect(category).to.be.undefined;
          })
      })

      it('it saves and returns the document if name is valid', function () {
        createCategoryWithValidName()
          .then(function (category) {
            expect(category.name).to.equal('Adventures with animals');
          })
      })

    })

  })

})
