// Initialization server setup

// Creating a variable which get the express packages
const express = require('express')
// Creating a variable in order to get run Express package as function
const app = express()

// Creating the server
var server = require('http').createServer(app);
var PORT = process.env.PORT || 8000
// In order to extracting a variable from incoming request
const bodyParser = require('body-parser')

// Creating a connection with MongoDB
const mongoose = require('mongoose')
const databaseRouter = require('./Config/keys').mongoURI;

// Using bodyParser make request readable
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// RestAPI file connection
const leaderBoardRest = require('./RESTAPI/leaderboard')
const scoreRest = require('./RESTAPI/score')
const userRest = require('./RESTAPI/user')

// Connecting to the database
mongoose.connect(
    databaseRouter,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('Connected Database'))
  .catch(err => console.log(err));


// App use stands for creating a middleware line
// Help of the app.use function request can be pass in to the another middleware
app.get('/',(req,res,next)=> {
    res.json({
        message: "Connection established"
    })
})

// Redirect to relating route
app.use('/user', userRest)
app.use('/leaderboard', leaderBoardRest)
app.use('/score', scoreRest)

// Listening to the server at port 8000


var server = server.listen(PORT, function(){
  console.log("Listening to the server on 8000")
})

module.exports = server