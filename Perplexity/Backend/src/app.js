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
    origin:["http://localhost:5173", "http://localhost:5174"],
    credentials:true,
    methods:['GET','POST','PUT','DELETE']
}))


//Routes
app.use('https://perplexity-72qa.onrender.com/api/auth' , AuthRoute)
app.use('https://perplexity-72qa.onrender.com/api/chats' ,Chatrouter)

// ─── Global Error Handler (MUST be last) ──────────────────────────────────────
app.use((err, req, res, next) => {
    console.error('❌ Unhandled Error:', {
        message: err.message,
        code: err.code,
        stack: err.stack
    });

    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({
        success: false,
        message,
        error: process.env.NODE_ENV === "development" ? err.message : "Server error"
    });
});

export default app