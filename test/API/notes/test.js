// Importing the libraries
const expect = require('chai').expect
const request = require('supertest')
const app = require('../../../app')
const User = require('../../../Models/User')
// Deleting all the users which are in the database regarding to avoid user's exist problem
User.remove({}).then((result)=>{
    console.log(result)
    console.log('Users are deleted for testing process...')
})
// Creating a json object which stands for creating a test user
var testUserCreate = { 
    user_id:"testUser3",
    display_name: "testUser3",
    points: 99999999,
    rank: 1,
     country: "de"
  };
// Creating a json object which stands for creating a test score submit
  var testScoreSubmit = { 
    
        "score_worth": 10000,
        "user_id":"testUser3",
        "timestamp": 15732832
    
  };
// It tests to creating random numbers route
  describe('## Testing to random user create route ', function() { 
    it('creates 1000 random users', function(done) { 
      request(app) .post('/user/create/1000')  .end(function(err, res) { 
        expect(res.statusCode).to.equal(200); 
        expect(res.body.message).to.equal('1000 Users created with their random scores'); 
        done()
      }); 
    }); 
  }); 
// It tests to creating a new user route
  describe('## Testing to creating new user route ', function() { 
    it('creates a new user', function(done) { 
      request(app) .post('/user/create') .send(testUserCreate) .end(function(err, res) { 
        expect(res.statusCode).to.equal(200); 
        expect(res.body.message).to.equal('User created'); 
        expect(res.body.userGUID).to.equal('testUser3');
        expect(res.body.userDisplayName).to.equal('testUser3');
        expect(res.body.userPoints).to.equal(99999999);
        expect(res.body.userRank).to.equal(1);
        expect(res.body.country).to.equal('de');
        testUserCreate = res.body; 
        done()
      }); 
    }); 
  }); 
// It tests to submitting new user score
  describe('## Testing to submitting new user score ', function() { 
    it('should submit new score to a user', function(done) { 
      request(app) .post('/score/submit') .send(testScoreSubmit) .end(function(err, res) { 
        expect(res.statusCode).to.equal(200); 
        expect(res.body.score_worth).to.equal(10000); 
        expect(res.body.user_id).to.equal('testUser3');
        expect(res.body.timestamp).to.equal(15732832);
        testScoreSubmit = res.body; 
        done() 
      }); 
    }); 
  }); 
// It tests to displaying requested user's profile
  describe('## Testing to get user profile ', function() { 
    it('displays the user profile', function(done) { 
      request(app) .get('/user/profile/testUser3')  .end(function(err, res) { 
        expect(res.statusCode).to.equal(200); 
        expect(res.body.message).to.equal('user credentials which you are looking for'); 
        expect(res.body.user_id).to.equal('testUser3');
        expect(res.body.display_name).to.equal('testUser3');
        expect(res.body.points).to.greaterThan(90000);
        done()
      }); 
    }); 
  }); 
// It test to displaying current leaderboard with no country code
  describe('## Testing to get leaderboard by default ', function() { 
    it('displays the learderboard by default country code', function(done) { 
      request(app) .get('/leaderboard')  .end(function(err, res) { 
        expect(res.statusCode).to.equal(200); 
        expect(res.body).to.be.have.key('result')
        done()
      }); 
    }); 
  }); 
// It test to displaying current leaderboard with Deutschland country code
  describe('## Testing to get leaderboard with DE ISO CODE ', function() { 
    it('displays the learderboard with DE ISO CODE', function(done) { 
      request(app) .get('/leaderboard/de')  .end(function(err, res) { 
        expect(res.statusCode).to.equal(200); 
        expect(res.body).to.be.have.key('sortedLeaderBoard')
       
        done()
    
      }); 
    }); 
  }); 
// It test to displaying current leaderboard with United States country code
  describe('## Testing to get leaderboard with US ISO CODE', function() { 
    it('displays the learderboard with US ISO CODE', function(done) { 
      request(app) .get('/leaderboard/us')  .end(function(err, res) { 
        expect(res.statusCode).to.equal(200); 
        expect(res.body).to.be.have.key('sortedLeaderBoard')
        done()
      }); 
    }); 
  }); 
// It test to displaying current leaderboard with Turkey country code
  describe('## Testing to get leaderboard with TR ISO CODE', function() { 
    it('displays the learderboard with TR ISO CODE', function(done) { 
      request(app) .get('/leaderboard/tr')  .end(function(err, res) { 
        expect(res.statusCode).to.equal(200); 
        expect(res.body).to.be.have.key('sortedLeaderBoard')
        done()
      }); 
    }); 
  }); 


