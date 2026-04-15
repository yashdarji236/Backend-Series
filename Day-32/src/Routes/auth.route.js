import express from 'express'
import { registerValidator } from '../config/validate/auth.Validate.js'
import { RegisterController } from '../controller/auth.controller.js'
const AuthRoute = express.Router()

AuthRoute.post('/register' , registerValidator , RegisterController)




export default AuthRoute