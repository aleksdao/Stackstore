// Instantiate all models
var bluebird = require('bluebird');
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('User Routes Tests', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('User Routes Tests', function () {

		var guestAgent;

		var userInfo = {
			email: 'joe@gmail.com',
			password: 'shoopdawoop'
		};
		var userInfo2 = {
			email: 'joe2@gmail.com',
			password: 'shoopdawoop'
		};

		beforeEach('Create guest agent, add a member', function () {
			guestAgent = supertest.agent(app);
			guestAgent.post('/api/members/').send(userInfo).expect(200).end(function (err, response) {
				if (err) return done(err);
			});
		});

		it('create a new user response is that created user', function(done){
			guestAgent.post('/api/members/').send(userInfo2).expect(200).end(function (err, response) {
				if (err) return done(err);
				expect(response.body.email).to.equal('joe2@gmail.com');
				done();
			});
		});//end it block

		it('Getting all users should return 1 with joe@gmail.com as email address', function (done) {
			guestAgent.get('/api/members/').expect(200).end(function (err, response) {
				if (err) return done(err);
				expect(response.body[0].email).to.equal('joe@gmail.com');
				expect(response.body).to.be.an('array');
				expect(response.body.length).to.equal(1);
				done();
			});
		});//end it block

		it('rejects posting a user that already exists', function(done){
			guestAgent.post('/api/members/').send(userInfo).expect(500).end(function (err, response) {
				expect(response.text).to.equal('{"message":"User already exists"}');
				done();
			});
		});//end it block

		it('can delete a user via id', function(done){
			var id;
			guestAgent.post('/api/members/').send(userInfo2).expect(200).end(function (err, response) {
				id = response.body._id;
				guestAgent.delete('/api/members/' + id).expect(204).end(function (err, response) {
					done();
				});
			});
		});//end it block

});//end Get all users

}); //end describe New User Route
