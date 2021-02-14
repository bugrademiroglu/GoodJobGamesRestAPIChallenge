// Creating a variable which get the express packages
const express = require('express')

// Creating router variable in order to handle with coming request from client
const router = express.Router()

// Importing async library
var async = require('async');

// Creating User Element in order to saving element into mongoDB collection
const User = require('../Models/User');
const { Mongoose } = require('mongoose');

// Route which creates random user according to the given value
router.post('/create/:value',(req,res,next) => {
 if (parseInt(req.params.value) < 1200) {
     // Taking the number of creating user
 let createNumOfUser = parseInt(req.params.value)
 let userArray = [] // Creating an array in order to store User elements
 for (let i = 0; i < createNumOfUser; i++) { // Repeating the steps number of given value times
     let id = i
     let randomCountry = '' // Init randomCountry in order to set random country to user
     let randomNumber = Math.floor(Math.random() * 3) + 1 // Creating number value between 1 to 3 to selecting random country
     let randomScore = Math.floor(Math.random() * 10000) + 200 // Creating random point in order to define random user' point
     /*
        If random number is equals to one:
        then country will be Turkey
        If random number is equals to two:
        then country will be United States
        If random number is equals to three:
        then country will be Deutschland
     */
     if (randomNumber == 1) {
         randomCountry ='tr'
     }
     if (randomNumber == 2) {
         randomCountry = 'us'
     }
     if (randomNumber == 3) {
         randomCountry = 'de'
     }
     // Creating new random users
     let user = new User({
         user_id: 'userid'+ i.toString(),
         display_name: 'username'+ i.toString(),
         points: randomScore,
         rank: 0,
         country: randomCountry,  
     })
     userArray.push(user) // Store that random users at userArray
 }
    async function run() { // Running an async function to insert those random user to MongoDB
        try {
            await User.insertMany(userArray);
            res.json({
             message: userArray.length + ' Users created with their random scores'
            })
  
        } finally {
            res.json({
                message: userArray.length + ' Users created with their random scores'
              
             }).catch((err)=> { // If user cannot created because of any reason cath the error
                 
              res.json({
                  message: 'User exist', // If inserted user is exist than display an error as a json format
                  error: err.message
              })
          } 
            )
        }}
        run() // Running the function   

 }
 else {
     res.json({
         message: 'Please enter a value less than 1200 because heroku cannot response :('
     })
 }

             
})

// Route which is handle with user create request
router.post('/create',(req,res,next) => {
    // Getting created user detail from request-body
    const user = {
       user_id: req.body.user_id,
       display_name: req.body.display_name,
       points: req.body.points,
       rank: req.body.rank,
       country: req.body.country
    }
    // Creating new user
    const createUser = new User({
        user_id: user.user_id,
        display_name: user.display_name,
        points: user.points,
        rank: user.rank,
        country: user.country
     })
            createUser.save().then(() => {
                // Displaying created user informations
                res.json({
                  message: "User created",
                  userGUID: user.user_id,
                  userDisplayName: user.display_name,
                  userPoints: user.points,
                  userRank: user.rank,
                  country: user.country
               })
               }).catch((err)=> { // If user cannot created because of any reason cath the error 
                   res.json({
                       message: 'User exist',
                       error: err.message
                           })
               })
        })
// Router which is handle with get user profile request
router.get('/profile/:userguid',(req,res,next) => {
    // Checking the searching user is exist
    User.findOne({user_id:req.params.userguid}).then((result)=>{ 
        const userID = req.params.userguid // Getting a value from user's request
    res.json({
        message: "user credentials which you are looking for",
        user_id: userID,
        display_name: result.display_name,
        points: result.points,
        rank: result.rank,
        country: result.country
    })
    }).catch((err)=> { // If searching user is not exist display the error
        
        res.json({
            message: 'User not exist',
            error: err.message
        })
     })   
})

router.post('/delete/:userguid',(req,res,next) => {
    User.deleteOne({user_id:req.params.userguid}).then((result)=>{ 
        const userID = req.params.userguid // Getting a value from user's request
    res.json({
        message: "user has been deleted.",
    
    })
    }).catch((err)=> { // If searching user is not exist display the error
        
        res.json({
            message: 'User not exist',
            error: err.message
        })
     })   
   
})

router.post('/deleteAll',(req,res,next) => {
    User.remove({}).then((result)=>{ 
        
    res.json({
        message: 'All users has been deleted'
    
    })
    }).catch((err)=> { // If searching user is not exist display the error
        
        res.json({
            message: 'User not exist',
            error: err.message
        })
     })   
   
})

module.exports = router