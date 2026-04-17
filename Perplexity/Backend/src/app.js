import express from 'express'
import { DataBase } from './config/Database.js'
import cookieparser from 'cookie-parser'
import AuthRoute from './Router/auth.router.js'
import cors from 'cors'
const app = express()
DataBase()

app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


//Routes
app.use('/api/auth' , AuthRoute)


export default app