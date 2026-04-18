import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import { Sendemail } from "../services/mail.services.js";
export async function RegisterController(req,res){
    const {username , email , password} = req.body;
    const isUserExist = await userModel.findOne({
        $or:[{email}  , {username}]
    })

    if(isUserExist){
        return res.status(400).json({
            message:"User is Ale=ready Exist!",
            success:false,
            err:"User Already Exist!"
        })
    }


     const User = await userModel.create({ username, email, password })
     const emailVerify = jwt.sign({ id: User._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    await Sendemail(
        email,
        "Welcome to Perplexity!",
        `Hi ${username},\n\nThank you for registering at Perplexity! We're excited to have you on board.\n\nBest regards,\nThe Perplexity Team`,
        `<p>Hi ${username},</p><p>Thank you for registering at Perplexity! We're excited to have you on board.</p>
        <p>Please verify your email by clicking the link below:</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerify}">Verify Email</a>
        <p>If you did not create an account, please ignore this email.</p>
        <p>Best regards,<br>The Perplexity Team</p>`
    );
}


export async function LoginController(req,res){
    const {email , password} = req.body;
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"Invalid email or password!",
            success:false,
            err:"Invalid user!"
        })

    }
    if(!user.verified){
        return res.status(400).json({
            message:"Please Verify Your email!",
            suucess:false,
            err:"Email not Verified"
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET , {expiresIn:"7d"})


    res.cookie("token" , token)
    res.status(200).json({
        message:"User Logged In Successfully!",
        user:{
            id:user.id,
            username:user.username,
            email:user.email
        }
    })
}


export async function GetmeController(req,res){
    const userId = req.user.id
    const user = await userModel.findById(userId).select('-password')
    if(!user){
        return res.status(404).json({
            message:"User not found!",
            success:false,
            err:"user Not found!"
        })
    }


    res.status(200).json({
        message:"User details successfully fetched!",
        success:false,
        user 
    })
}


export async function VerifyEmailController(req,res){
    const { token } = req.query;
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
        return res.status(400).json({
            message: "Invalid token!",
            success: false,
            err: "User not found!"
        });
    }
    user.verified = true;
    await user.save();
    const html = `<h1>Email Verification</h1>
    <p>Your email has been successfully verified! You can now log in to your account.</p>
    <a href="http://localhost:5173/login">Go to Login</a>
    <p>Best regards,<br>The Perplexity Team</p>`;
    res.status(200).send(html);
    }catch(err){
        res.status(400).json({
            message:"Invalid or Expired Token!",
            success:false,
            err:err.message
        })
    }
}

