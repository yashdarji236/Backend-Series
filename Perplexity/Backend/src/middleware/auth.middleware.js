import jwt from 'jsonwebtoken'


export async function authMiddleware(req,res,next){
    const oken = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorised User!",
            suucess:false,
            err:"No Token provided"
        })
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECTRET);
        req.user = decoded
        next()
    }catch(err){
        return res.status(401).json({
            message:"Unauthorized User",
            success:false,
            err:"Invalid token"
        })
    }
}