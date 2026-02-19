const jwt = require('jsonwebtoken')

async function IdentifyUser(req,res,next){
  
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({
      message: "Token is Not provided , Unothorized access!"
    })
  }
  let decode = null;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
  } catch (err) {
    return res.status(401).json({
      message: "user not authorized!"
    })
  }


  req.user = decode

  next()
}


module.exports = IdentifyUser