const ImageKit = require("@imagekit/nodejs/index.js");
const postModel = require('../model/post.model')
const jwt = require('jsonwebtoken')
const likeModel = require('../model/like.model')
const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});
async function postController(req, res) {
  const file = await imageKit.files.upload({
    file: req.file.buffer.toString("base64"),
    fileName: req.file.originalname,
    folder: "cohert-2-inta-clone"
  });
  const post = await postModel.create({
    caption: req.body.caption,
    ImgUrl: file.url,
    user: req.user.id
  })
  res.status(201).json({
    message: "post created successfully!",
    post
  })
}
async function getpostController(req , res){ 
 
  const userId = req.user.id;
  const posts = await postModel.find({
    user:userId,
  })
  res.status(200).json({
    message:'user message successfully',
    posts
  })

}
async function getPostDetails(req , res){
 
  const userId = req.user.id
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
async function LikeController(req,res){
  const username = req.user.username
  const postId = req.params.postid
  const post = await postModel.findById(postId)
  if(!post){
    return res.status(404).json({
      message:"Post Not Found"
    })
  }

const like = await likeModel.create({
  post:postId,
  user:username
})
res.status(200).json({
  message:"post Liked Successfully",
  like
})

}

async function unLikeController(req,res){
    const username = req.user.username
    const postId = req.params.postid

    const IspostLiked = await likeModel.findOne({
        post:postId,
        user:username
    })
    if(!IspostLiked){
      return res.status(400).json({
        message:"You Don't Like this post"
      })
    }

    await likeModel.findByIdAndDelete({_id:IspostLiked._id})
    return res.status(200).json({
      message:"post unliked SuccessFully"
    })
}

async function getFeedController(req, res) {
  const user = req.user

  const posts = await postModel
    .find()
    .populate("user").find({}).sort({_id:-1})
    .lean()

  const feed = await Promise.all(
    posts.map(async (post) => {
      const isLiked = await likeModel.findOne({
        user: user.username,
        post: post._id
      })

      return {
        ...post,
        isLiked: !!isLiked   // boolean (true / false)
      }
    })
  )

  res.status(200).json({
    message: "post Fetch Successfully",
    posts: feed
  })
 
}
module.exports = {
  postController ,
  getpostController,
  getPostDetails ,
  LikeController ,
  getFeedController , 
  unLikeController
};
