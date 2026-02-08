const mongoose = require('mongoose')

const scheme = new mongoose.Schema({
    title:String,
    description:String
})

const noteModel = mongoose.model('note',scheme)

module.exports = noteModel