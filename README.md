# Good Job Games Backed Coding Challenge
## About
That project creates a REST API in order to manage a game that uses a leaderboard with players submitting new scores from around the world.
That server is only responsible for submitting player scores and returning leaderboard data either globally or country-specific.
Players gain points by submitting scores and they are placed on the leaderboard by their scores. The player with the highest score will be at the top.

## How it works
Accepts HTTP GET and POST request
* get a current leaderboard table (GET /leaderboard)
* get a current leaderboard table with specific country code (GET /leaderboard/{country_iso_code})
* post a new score (POST /​score/submit​)
* get a requested user profile (GET /user/profile/{user_guid})
* post a create a new user (POST /user/create)
* post a create random users with their random points (POST /user/create/{value})
* post a delete a user (POST /user/delete/{user_guid})
* post delete all users (POST /user/deleteAll)

## Example of use cases
1. To getting most recent leaderboad table
* http://localhost:8000/leaderboard
2. To getting most recent leaderboard table with specific country code (de (Deutschland/Germany))
* http://localhost:8000/leaderboard/de
3. To submitting a new user score
* http://localhost:8000/score/submit (As a POST Request) ({
    "score_worth": 17000,
    "user_id":"userid62",
    "timestamp": 15732832
})
4. To displaying a requested user profile (for example userid = userid62)
* http://localhost:8000/user/profile/userid62
5. To creating a new user (As a POST Request) ({
 "user_id":"exampleuserid",
 "display_name": "exampleusername",
 "points": 11021,
 "rank": 1, // Rank is not important for new user
 "country": "de"
})
* http://localhost:8000/user/create
6. To creating random users with their random points (If the value is 500 then it creates 500 random user)
* http://localhost:8000/user/create/500
7. To deleting a specific user (for example userid = userid62)
* http://localhost:8000/user/delete/userid62
8. To deleting all the users
* http://localhost:8000/user/deleteAll

# Requirements
 * "async": "^3.2.0",
 * "body-parser": "^1.19.0",
 * "chai": "^4.3.0",
 *  "express": "^4.17.1",
 *  "moch": "0.0.1",
 *  "mocha": "^8.3.0",
 *  "mockgoose": "^8.0.4",
 * "mongoose": "^5.11.15",
 * "mongoose-unique-validator": "^2.0.3",
 * "nodemon": "^2.0.7",
 * "supertest": "^6.1.3"
 * Docker
## Technologies
In this project, Node.js was used for backend environment and express framework was used a web service. As a database MongoDB was used.
For the testing phase, javascript testing framework chai and supertest was used.
## Installation and Run
To get the project running locally:

###### On terminal:
Clone this repo
 ```bash
git clone ------------
npm install to install all required dependencies
npm start to start the local server
```
Alternately, to quickly try out this repo in the cloud, [You can access to project on heroku!](https://bugrarestapi.herokuapp.com/leaderboard)
###### On Docker compose: 
```bash
docker-compose up
```
###### View
```bash
http://localhost:5000
```
###### Stop
```bash
docker-compose stop
```
###### To running with Docker file on your host: 
```bash
docker build --tag <Enter a tag name> .
```
Then,
```bash
docker run --rm -i -t <Your tag name> (This path run the code on your)
```
If you want to map the port and acces on your local machine:
```bash
docker run -rm -i -t -p 8080:5000 <Your tag name>(This path run the code on your)
```
