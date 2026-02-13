const express = require('express');
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

    const user = await Usermodel.create({
        name,
        email,
        password

    })
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET_KEY)

    res.cookie('token',token)

    res.status(201).json({
        message:"user created",
        user,
        

    })
    
})

module.exports = authRoute;