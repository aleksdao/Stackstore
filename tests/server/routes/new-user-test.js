// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('New User Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('Create New User, and test User routes', function () {

		var loggedInAgent;

		var userInfo = {
			email: 'joe@gmail.com',
			password: 'shoopdawoop'
		};
		var userInfo2 = {
			email: 'joe2@gmail.com',
			password: 'shoopdawoop'
		};

		beforeEach('Create a user', function (done) {
			User.create(userInfo, done);
		});

		beforeEach('Create loggedIn user agent and authenticate', function (done) {
			myAgent = supertest.agent(app);
			myAgent.post('/login').send(userInfo).end(done);
		});

		it('should create new user, retrieve all, and have count of 2', function (done) {
			myAgent.post('/api/members/').send(userInfo2).expect(200).end(function (err, response) {
				if (err) return done(err);
				expect(response.body.email).to.equal('joe2@gmail.com');
				// done();
			});
			myAgent.get('/api/members/').expect(200).end(function (err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('array');
				expect(response.body.length).to.equal(2);

				done();
			});
		});//end it block

	});//end describe'Create New user'

});
