import express from 'express'
import AuthRouter from '../Route/auth.route.js'
import HandleError from '../middleware/errorHanding.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json()); 
app.use('/api/auth' ,AuthRouter)


app.use(HandleError)

export default   app 