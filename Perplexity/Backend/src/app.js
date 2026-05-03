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
  origin: [
    'https://backend-series-git-main-yashdarji5237-1754s-projects.vercel.app',
    'https://backend-series-seven.vercel.app'
    // add your custom domain too if you have one
  ],
  credentials: true, // needed if you're sending cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


//Routes
app.use('/api/auth', AuthRoute)
app.use('/api/chats', Chatrouter)

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