const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    email:{
        type: String
    },
    firstname:{
        type: String
    },
    lastname:{
        type: String
    }
})

module.exports = mongoose.model('author',authorSchema)