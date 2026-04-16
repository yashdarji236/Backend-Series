import mongoose  from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
export function DataBase(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connect to database");
        
    })
}