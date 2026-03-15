import { body , validationResult } from "express-validator";

const Validate =  (req, res, next) => {
        const error = validationResult(req)
        if (error.isEmpty()) {
            return next()
        }

        res.status(400).json({
            error: error.array()
        })  
    }

export const RegisterValidator = [
    body("username").isString().withMessage("Username should be string"),
    body("email").isEmail().withMessage("Email should be an valid email"),
    body("password").custom((value)=>{
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
       if(!passwordRegex.test(value)){
        throw new Error("Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character")
       }
            return true
    }).withMessage("Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    Validate
] 