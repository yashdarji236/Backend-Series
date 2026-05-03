import express from 'express'
import { registerValidator } from '../config/validate/auth.Validate.js'
import { RegisterController } from '../controller/user.controller.js'
import { VerifyEmailController } from '../controller/user.controller.js'
import { LoginController , GetmeController , resendEmail, GoogleCallbackController} from '../controller/user.controller.js'
import { loginValidator } from '../config/validate/auth.Validate.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { Auth } from 'googleapis'
import passport from 'passport'
const AuthRoute = express.Router()

AuthRoute.post('/register' , registerValidator , RegisterController)
AuthRoute.post('/login', loginValidator, LoginController)
AuthRoute.get('/get-me' , authMiddleware , GetmeController)
AuthRoute.post('/resend',resendEmail)
AuthRoute.get('/verify-email' ,VerifyEmailController)

// Google Auth Routes
AuthRoute.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
AuthRoute.get(
  '/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login' }), 
  GoogleCallbackController
)

export default AuthRoute