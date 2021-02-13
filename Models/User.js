const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const userSchema = new Schema({

    user_id: {
        type: String,
        required: true,
        unique: true
    },
    display_name: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    }
    
},{timestamps: false})

userSchema.plugin(uniqueValidator)
const User = mongoose.model('User',userSchema)

module.exports = User