const mongoose = require('mongoose');

const Scheme = mongoose.Schema({
    title:String,
    description:String
})


const noteModel = mongoose.model('note',Scheme);

module.exports = noteModel;