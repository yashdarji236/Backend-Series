import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../model/user.model.js";

export async function RegisterController(req, res) {
    const { username, email, password } = req.body
    const IsUserExist = await userModel.findOne({
        $or: [{ email }, { username }]
    })


    if (IsUserExist) {
        return res.status(400).json({
            message: 'User is Already Exist',
            success: false,
            err: "User Already Exist!"
        })
    }


    const User = await userModel.create({ username, email, password })
}