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

// Updating user's rank on database
function updateUserRank(arr) {
    arr.forEach(element => {
        User.updateOne({display_name:element.display_name}, {$set:{rank:element.rank}}, function(err, result) { // Updating the user's rank according to the his/her user's score
        if (err)
            console.log('error: ',err)
    })
    })
}

// Route which is handle with user create request
router.post('/submit',(req,res,next) => {
    let sortedLeaderBoard  = [] // Stores the ranked users

    // Checking the searching user is exist
    User.findOne({user_id:req.body.user_id}).then((result)=>{
        let userGainedPoint = req.body.score_worth // Storing the gained score of users according to the coming request
        let userNewPoint = userGainedPoint + result.points // Calculating the user's new score

        User.updateOne({user_id:req.body.user_id}, {$set:{points:userNewPoint}}, function(err, result) { // Updating the user's score according to the his/her user's id
            if (err)
                console.log('error: ',err)
        }).then(() => {  
            res.json({ // Displaying the results
                score_worth: req.body.score_worth,
                user_id: req.body.user_id,
                timestamp: req.body.timestamp
            })
            // After relevant user's point updated, update other users
            User.find({},{_id:0,user_id:0,__v:0}).sort({points:-1}).then((result)=>{
               sortedLeaderBoard = rankUser(result) // Ranking user according to their scores
               updateUserRank(sortedLeaderBoard) // Updating user rank on database
            })       
        })
    }).catch((err)=> { // If searching user is not exist display the error
        
        res.json({
            message: 'User not exist',
            error: err.message
        })
    })
})


module.exports = router