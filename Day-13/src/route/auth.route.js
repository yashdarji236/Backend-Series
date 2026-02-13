const express = require('express');
const crypto = require('crypto')
const Usermodel = require('../model/user.model');
const authRoute = express.Router()
const jwt = require('jsonwebtoken');


authRoute.post('/register',async (req,res)=>{
    const { name , email , password } = req.body;
    const isEmailAleadyExist = await Usermodel.findOne({email})
    if(isEmailAleadyExist){
        return res.status(409).json({
            message:"email already exist"
        })
    }
    const hash = crypto.createHash('md5').update(password).digest('hex')
    const user = await Usermodel.create({
        name,
        email,
        password:hash

    })
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET_KEY)

    res.cookie('token',token)

    res.status(201).json({
        message:"user created",
        user,
        token

    })
    
})

authRoute.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const user = await Usermodel.findOne({email})
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })

    }
    const ValidPassword = user.password ===  crypto.createHash('md5').update(password).digest('hex');
    if(!ValidPassword){
        return res.status(401).json({
            message:"invalid password"
        })
    }

    const token = jwt.sign({
        id:user._id
    } , process.env.JWT_SECRET_KEY)

    res.cookie('token',token)
    res.status(201).json({
        message:"User is created",
        user

    })

    

})






module.exports = authRoute;