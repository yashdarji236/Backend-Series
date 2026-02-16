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

module.exports = {
  postController
};
