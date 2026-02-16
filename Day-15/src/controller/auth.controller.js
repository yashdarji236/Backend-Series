const jwt = require('jsonwebtoken')
const userModel = require('../model/insta.model')
const bcrypt = require('bcryptjs')
async function registerController(req, res){
    const { email, username, password, bio, profileImg } = req.body;
    const IsUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (IsUserAlreadyExist) {
        return res.status(409).json({
            message: 'User is already exist' + (IsUserAlreadyExist.email) == email ? "Email is alread exist" : "Username is already exist"
        })
    }
    const hash = await bcrypt.hash(password , 10)
    const user = await userModel.create({
        username,
        email,
        bio,
        profileImg,
        password: hash
    })
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
    res.cookie('token', token);
    res.status(200).json({
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImg: user.profileImg
        }
    })
}


async function  LoginController(req, res){
    const { username, email, password } = req.body;
    const user = await userModel.findOne({
        $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]
    })
    if(!user){
        return res.status(404).json({
            message:"Username is not found"
        })
    }
   
    const IsPasswoedValid = await bcrypt.compare(password , user.password)
    if(!IsPasswoedValid){
        return res.status(401).json({
            message:"password is Invalid"
        })
    }
    const token = jwt.sign({
        id:user._id
    } , process.env.JWT_SECRET_KEY , {expiresIn:'1d'})

    res.cookie('token' , token)
    res.status(200).json({
        message:"User LoggedIn Successfully",
        user:{
             email: user.email,
            username: user.username,
            bio: user.bio,
            profileImg: user.profileImg
        }
    })
}


module.exports = {
    registerController, LoginController
}