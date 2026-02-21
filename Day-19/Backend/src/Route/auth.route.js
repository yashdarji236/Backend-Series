const express = require('express')
const AuthController = require('../controller/auth.controller')
const identifyuser = require('../middlewares/auth.middleware')
const AuthRouter = express.Router()


AuthRouter.post('/register' , AuthController.registerController)

AuthRouter.post('/login' , AuthController.LoginController)

AuthRouter.get("/get-me", identifyuser , AuthController.GetmeController)
module.exports = AuthRouter