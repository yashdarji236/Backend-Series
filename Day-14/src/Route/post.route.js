const express = require('express')
const postRoute = express.Router()
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})
const postController = require('../controller/post.controller')
postRoute.post('/',upload.single('image') , postController.postController)

module.exports = postRoute