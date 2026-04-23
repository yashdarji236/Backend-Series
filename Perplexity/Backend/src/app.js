import express from 'express'
import { DataBase } from './config/Database.js'
import cookieparser from 'cookie-parser'
import AuthRoute from './Router/auth.router.js'
import cors from 'cors'
import morgan from 'morgan'
import Chatrouter from './Router/chat.router.js'
const app = express()
DataBase()

app.use(express.json())
app.use(cookieparser())
app.use(morgan('dev'))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:['GET','POST','PUT','DELETE']
}))


//Routes
app.use('/api/auth' , AuthRoute)
app.use('/api/chats' ,Chatrouter)

export default app