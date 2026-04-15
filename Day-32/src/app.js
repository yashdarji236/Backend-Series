import express from 'express'
import { DataBase } from './config/database.js'
import cookieParser from 'cookie-parser'
import AuthRoute from './Routes/auth.route.js'
const app = express()
DataBase()

app.use(express.json())
app.use(cookieParser())

//Routes

app.use('/api/auth' , AuthRoute)

export default app