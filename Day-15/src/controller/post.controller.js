const ImageKit = require("@imagekit/nodejs/index.js");
const postModel = require('../model/post.model')
const jwt = require('jsonwebtoken')
const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function postController(req, res) {

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
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


  const file = await imageKit.files.upload({
    file: req.file.buffer.toString("base64"),
    fileName: req.file.originalname,
    folder: "cohert-2-inta-clone"
  });
  const post = await postModel.create({
    caption: req.body.caption,
    ImgUrl: file.url,
    user: decode.id
  })
  res.status(201).json({
    message: "post created successfully!",
    post
  })
}
async function getpostController(req , res){
  const token  = req.cookies.token
   if (!token) {
    return res.status(401).json({
      message: "Token not provided"
    })
  }

  let decoded = null;
  try{
    decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)
  }
  catch(err){
    return res.status(401).json({
      message:"Token invalid"
    })
  }
  const userId = decoded.id;
  const posts = await postModel.find({
    user:userId,
  })
  res.status(200).json({
    message:'user message successfully',
    posts
  })

}
async function getPostDetails(req , res){
  const token = req.cookies.token

  if(!token){
    req.status(401).json({
      message:"Unauthorized user!"
    })
  }
  let decoded = null;
  try{
    decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)
  }catch(err){
    return res.status(401).json({
      message:"Invalid Token"
    })
  }
  const userId = decoded.id
  const postId = req.params.postid
  const post = await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
      message:"Post not found"
    })
  }
  const IsValidUser = post.user.toString() === userId
  if(!IsValidUser){
    return res.status(403).json({
      message:"Forrbidden Content!"
    })
  }
  return res.status(200).json({
    message:"Post Fetched Successfully!",
    post
  })
}



module.exports = {
  postController ,
  getpostController,
  getPostDetails
};
