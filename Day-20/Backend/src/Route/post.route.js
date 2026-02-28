const express = require('express')

const postRoute = express.Router()

const multer = require('multer')

const UserIdentify = require('../middlewares/auth.middleware')

const upload = multer({storage:multer.memoryStorage()})

const postController = require('../controller/post.controller')

postRoute.post('/',upload.single('image') , UserIdentify , postController.postController)

postRoute.get('/' , UserIdentify ,  postController.getpostController )

postRoute.get('/detail/:postid' , UserIdentify  ,postController.getPostDetails)

postRoute.post('/like/:postid' , UserIdentify , postController.LikeController  )

postRoute.post('/unlike/:postid' , UserIdentify , postController.unLikeController  )

postRoute.get('/feed' , UserIdentify , postController.getFeedController )

module.exports = postRoute  