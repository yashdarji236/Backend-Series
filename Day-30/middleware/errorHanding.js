import dotenv from 'dotenv'
dotenv.config()

function HandleError(err,req,res,next){
   const responce = {
    message:err.message
   }
   if(process.env.NODE_ENV === "development"){
    responce.stack = err.stack
   }
   res.status(err.status).json(responce)
}

export default HandleError