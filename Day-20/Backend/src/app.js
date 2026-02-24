require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const Connect = require('./config/database')


app.use(express.json())
Connect()

app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))

/* Require Routes */
const AuthRouter = require('./Route/auth.route')
const postRoute = require('./Route/post.route')
const FollowRoute = require('./Route/user.Router')


/* Using Routes */
app.use('/auth' , AuthRouter)
app.use('/posts' , postRoute)
app.use('/user' , FollowRoute)
module.exports=app