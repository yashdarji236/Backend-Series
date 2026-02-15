const mongoose = require('mongoose')
const scheme = new mongoose.Schema({
    username:{
        type:String,
        unique:[true , "Username is already exist"],
        required:[true , 'Username is required!']
    },
    email:{
        type:String,
         unique:[true , "Email is already exist"],
        required:[true , 'Email is required!']
    },
    password:{
        type:String,
         required:[true , 'password is required!']
    },
    bio:{
        type:String
    },
    profileImg:{
        type:String,
        default:'https://ik.imagekit.io/szvl9xygyl/Default_User_image.png'
    }
})

const userModel = mongoose.model("users" , scheme)

module.exports = userModel