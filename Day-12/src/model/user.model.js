const mongoose = require('mongoose');
const Scheme = mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,'email already exist']
    },
    password:String,
})

const Usermodel = mongoose.model('userData',Scheme);
module.exports = Usermodel;