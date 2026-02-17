const express = require('express')
const postRoute = express.Router()
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})
const postController = require('../controller/post.controller')
postRoute.post('/',upload.single('image') , postController.postController)
postRoute.get('/' , postController.getpostController )
postRoute.get('/detail/:postid' , postController.getPostDetails)
module.exports = postRoute