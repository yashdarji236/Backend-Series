import express from 'express'
import { DataBase } from './config/Database.js'
import cookieparser from 'cookie-parser'
import AuthRoute from './Router/auth.router.js'
const app = express()
DataBase()

app.use(express.json())
app.use(cookieparser())



//Routes
app.use('/api/auth' , AuthRoute)


export default app