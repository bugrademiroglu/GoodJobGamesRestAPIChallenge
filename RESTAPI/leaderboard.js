// Creating a variable which get the express packages
const express = require('express')

// Creating router variable in order to handle with coming request from client
const router = express.Router()

// Creating User Element in order to saving element into mongoDB collection
const User = require('../Models/User')

// This method rank users
function rankUser(arr) {
    
    arr.map(function(e, i){ // Applying mapping in order to apply the same process on all the elements in the array        
        e.rank = (i + 1); // Starting top of the sorted array and increase the rank
      return e;
    });
    return arr // Return the array
}

// That route display the current leaderboard
router.get('/',(req,res,next) => {
    let sortedLeaderBoard = [] // Stores the ranked users
    User.find({},{_id:0,user_id:0,__v:0}).sort({points:-1}).then((result)=>{ // Getting all the user's from database according to their ranks and points
        sortedLeaderBoard = rankUser(result) // Ranking user according to their scores
       
        // Displaying leaderBoard as a json
        if (result.length !==  0) {
            res.json(
                sortedLeaderBoard // Display the current leaderboard without country code
             )
        }
        else {
            res.json({
                message: 'Currently, there is no user' // If there is no user in the database then display a message to user
             })
        }
    })  
})

// That route display the current leaderboard with specific country code
router.get('/:country_iso_code',(req,res,next) => {
    const countryISO = req.params.country_iso_code // Getting the country code that which client want to see from client request
    let sortedLeaderBoard = [] // Stores the ranked users

    User.find({country:countryISO},{_id:0,user_id:0,__v:0}).sort({points:-1}).then((result)=>{
        sortedLeaderBoard = rankUser(result) // Ranking user according to their scores
       
        if (sortedLeaderBoard.length !==  0) {
            res.json(
                sortedLeaderBoard // Display the current leaderboard with relevant country code
         )
        }
        else {
            res.json({
                message: 'Currently, there is no user' // If there is no user to show then display an error message
             })
        }
    })
 })

module.exports = router
