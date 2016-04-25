// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var Experience = mongoose.model('Experience');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Experiences Route', function () {

  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  describe('Unauthenticated request', function () {

    var guestAgent;

    beforeEach('Create guest agent', function () {
      guestAgent = supertest.agent(app);
    })

    xit('should get a 401 repsonse', function (done) {
      guestAgent.get('/api/experiences')
        .expect(401)
        .end(done);
    });
  });

  describe('Authenticated request', function () {

    var loggedInAgent;

    var userInfo = {
			email: 'joe@gmail.com',
			password: 'shoopdawoop'
		};

    beforeEach('Create a user', function (done) {
      User.create(userInfo, done);
    });

    beforeEach('Create loggedIn user agent and authenticate', function (done) {
      loggedInAgent = supertest.agent(app);
      loggedInAgent.post('/login').send(userInfo).end(done);
    });

    it('should get 200 response with an array as the body', function (done) {
      loggedInAgent.get('/api/experiences').expect(200).end(function (err, response) {
        if (err) return done(err);
        expect(response.body).to.be.an('array');
        done();
      });
    });

  });

  describe('supports CRUD routes', function () {

    var loggedInAgent;

    var userInfo = {
      email: 'joe@gmail.com',
      password: 'shoopdawoop'
    };

    var experienceInfo1 = {
      "name": "sint ut vitae",
      "shortDescription": "Qui accusantium deleniti fugit id est ducimus dolorem ullam nostrum. Debitis est quod perferendis iusto numquam.",
      "description": "Magni ab consequatur rerum itaque impedit aut necessitatibus. Soluta non voluptatem. Non veniam architecto eligendi aut at velit beatae laboriosam ut.\n \rIpsum voluptatibus quisquam in. Quia id officiis eaque voluptate. Cumque itaque incidunt quo ex tempore totam repellat voluptatem.\n \rEst provident ipsa nostrum qui culpa quod qui porro. Nulla enim sint velit sed adipisci ducimus distinctio magni. Autem quasi sed veritatis at animi. Doloribus iure asperiores dolor quas voluptas amet in. Itaque in cum vero velit aut.",
      "quantity": "3",
      "price": 257,
      "address": "45198 Langosh Mall",
      "city": "Lake Krystina",
      "state": "Montana",
      "postalCode": "07183-0581",
      "country": "USA",
      "__v": 0,
      "categories": [
        {
          "_id": "571b9256341b5676199ce075",
          "name": "Not for the faint of heart",
          "__v": 0
        }
      ],
      "photoUrl": "http://lorempixel.com/640/480/nightlife"
    }

    var experienceInfo2 = {
      "name": "abc de gga",
      "shortDescription": "this is for all the chocolate ullam nostrum. Debitis est quod perferendis iusto numquam.",
      "description": "chocolate or nestle whatever it'll be ab consequatur rerum itaque impedit aut necessitatibus. Soluta non voluptatem. Non veniam architecto eligendi aut at velit beatae laboriosam ut.\n \rIpsum voluptatibus quisquam in. Quia id officiis eaque voluptate. Cumque itaque incidunt quo ex tempore totam repellat voluptatem.\n \rEst provident ipsa nostrum qui culpa quod qui porro. Nulla enim sint velit sed adipisci ducimus distinctio magni. Autem quasi sed veritatis at animi. Doloribus iure asperiores dolor quas voluptas amet in. Itaque in cum vero velit aut.",
      "quantity": "5",
      "price": 100,
      "address": "275 South Mall",
      "city": "Lake Booyah",
      "state": "California",
      "postalCode": "95119-0581",
      "country": "USA",
      "__v": 0,
      "categories": [
        {
          "_id": "571b9256341b5676199ce075",
          "name": "Not for the faint of heart",
          "__v": 0
        }
      ],
      "photoUrl": "http://lorempixel.com/640/480/nightlife"
    };

    var experienceId;

    beforeEach('Create a user', function (done) {
      User.create(userInfo)
      .then(function () {
        return Experience.create(experienceInfo1)
      })
      .then(function (createdExperience) {
        experienceId = createdExperience._id;
        done();
      });
    });

    beforeEach('Create loggedIn user agent and authenticate', function (done) {
      loggedInAgent = supertest.agent(app);
      loggedInAgent.post('/login').send(userInfo).end(done);
    });

    it('should be able to retrieve a single experience via GET', function (done) {
      loggedInAgent.get('/api/experiences/' + experienceId).expect(200).end(function (err, response) {
        if (err) return done(err);
        console.log("body", typeof(response.body._id))
        expect(response.body).to.be.an('object');
        expect(response.body._id).to.equal(String(experienceId));
        expect(response.body.country).to.equal('USA');
        done();
      })
    })

    it('should be able to create an experience using POST', function (done) {
      loggedInAgent.post('/api/experiences').send(experienceInfo2).expect(201).end(function (err, response) {
        if (err) return done(err);
        expect(response.body).to.be.an('object');
        expect(response.body.name).to.equal('abc de gga');
        done();
      });
    });

    it('should be able to delete an experience using DELETE', function (done) {
      loggedInAgent.delete('/api/experiences/' + experienceId).expect(204).end(done);
    })

    it('should be able to modify an experience using PUT', function (done) {
      loggedInAgent.put('/api/experiences/' + experienceId).send({ name: 'camels on the safari' }).expect(200).end(function (err, response) {
        if (err) return done(err);
        expect(response.body).to.be.an('object');
        expect(response.body.name).to.equal('camels on the safari');
        done();
      });
    });
  });

});
