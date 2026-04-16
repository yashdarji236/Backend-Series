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
        <a href="http://localhost:5173/api/auth/verify-email?token=${emailVerify}">Verify Email</a>
        <p>If you did not create an account, please ignore this email.</p>
        <p>Best regards,<br>The Perplexity Team</p>`
    );
}