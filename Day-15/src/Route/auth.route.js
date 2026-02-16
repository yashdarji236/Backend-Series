const express = require('express')
const AuthController = require('../controller/auth.controller')
const AuthRouter = express.Router()


AuthRouter.post('/register' , AuthController.registerController)

AuthRouter.post('/login' , AuthController.LoginController)


module.exports = AuthRouter