require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

userSchema.methods.generateToken = async function () {
    try {
        const genToken = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY)
        console.log(genToken);
        return genToken
    } catch (error) {
        console.log(error);
    }
}

// model - collection
const User = mongoose.model('User', userSchema)
// User.createIndexes() // har user unique hoga - no duplication
module.exports = User;