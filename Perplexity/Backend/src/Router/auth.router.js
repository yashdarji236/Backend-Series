import express from 'express'
import { registerValidator } from '../config/validate/auth.Validate.js'
import { RegisterController } from '../controller/user.controller.js'
import { VerifyEmailController } from '../controller/user.controller.js'
import { LoginController , GetmeController} from '../controller/user.controller.js'
import { loginValidator } from '../config/validate/auth.Validate.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { Auth } from 'googleapis'
const AuthRoute = express.Router()

AuthRoute.post('/register' , registerValidator , RegisterController)
AuthRoute.post('/login', loginValidator, LoginController)
AuthRoute.get('/get-me' , authMiddleware , GetmeController)
AuthRoute.get('/verify-email' ,VerifyEmailController)




export default AuthRoute