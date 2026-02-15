require('dotenv').config();
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const Connect = require('./config/database')
const AuthRouter = require('./Route/auth.route')
app.use(express.json())
Connect()
app.use(cookieParser())
app.use('/auth' , AuthRouter)
module.exports=app