const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    user: {  // foregin key la role ada krrha userSchema sy
        type: mongoose.Schema.Types.ObjectId, // foregin key - yeh specify krta hy ky wohi user login hy jiska yeh notes honga 
        ref : "User" // reference from dusra schema sy 
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General",
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

// model - collection
const Note = mongoose.model('Note', noteSchema)

module.exports = Note;