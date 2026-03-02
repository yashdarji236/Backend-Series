const express = require('express')
const identifyUser = require('../middlewares/auth.middleware')
const followuser = require('../controller/user.controller')
const userRoute = express.Router()


/**
*   @route POST - user/follow/:username
*   @description - Follow a User
*   @access - Private 
*/

userRoute.get("/follow/request", identifyUser , followuser.getFollowRequests)
userRoute.patch("/follow/accept/:username", identifyUser ,followuser.acceptFollowRequest)
userRoute.patch("/follow/reject/:username", identifyUser ,followuser.rejectFollowRequest)
userRoute.post("/follow/:username" , identifyUser , followuser.followController)
userRoute.post("/follow/unfollow/:username" , identifyUser , followuser.unfollowController)
userRoute.get("/follow/accept", identifyUser , followuser.GetFollowers)
userRoute.get("/follow/user/users", identifyUser , followuser.GetUsers)
module.exports = userRoute