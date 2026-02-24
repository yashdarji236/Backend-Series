const followModel = require('../model/follow.model')


async function followController(req , res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    // ❌ Self follow check
    if(followerUsername === followeeUsername){
        return res.status(400).json({
            message:"You cannot follow yourself"
        })
    }

    // 🔍 Check already exists
    const existingFollow = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(existingFollow){
        return res.status(400).json({
            message:"Follow request already sent"
        })
    }

    // ✅ Create request (default = pending)
    const followRequest = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    })

    res.status(201).json({
        message:`Follow request sent to ${followeeUsername}`,
        follow: followRequest
    })
}

async function getFollowRequests(req,res){
    const currentUsername = req.user.username

    const requests = await followModel.find({
        followee: currentUsername,
        status: "pending"
    })

    res.status(200).json({
        total: requests.length,
        requests
    })
}

async function acceptFollowRequest(req,res){
    const followerUsername = req.params.username
    const currentUsername = req.user.username
    const request = await followModel.findOne({
        follower: followerUsername,
        followee: currentUsername,
        status: "pending"
    })
    if(!request){
         return res.status(404).json({
            message: "Follow request not found"
        })
    }
     request.status = "accepted"
    await request.save()

    res.status(200).json({
        message: `${followerUsername} is now your follower`
    })
}

async function rejectFollowRequest(req,res){
    const currentUsername = req.user.username
    const followerUsername = req.params.username
     const request = await followModel.findOne({
        follower: followerUsername,
        followee: currentUsername,
        status: "pending"
    })

    if (!request) {
        return res.status(404).json({
            message: "Follow request not found"
        })
    }

    request.status = "rejected"
    await request.save()

    res.status(200).json({
        message: "Follow request rejected"
    })
}

async function unfollowController(req,res){
    const followeeUsername = req.params.username
    const followerUsername = req.user.username

    if(followeeUsername == followerUsername){
        return res.status(400).json({
            message:"You cannot unfollow your self"
        })
    }



    const unFollow = await followModel.findOne({
         follower: followerUsername,
        followee: followeeUsername,
         status: "accepted"
    })

    if(!unFollow){
        return res.status(400).json({
            message:`you cannot follow ${followeeUsername}`
        })
    }
     await followModel.deleteOne({
        _id: unFollow._id
    })

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}
module.exports = {
    followController , 
    getFollowRequests,
    acceptFollowRequest,
    rejectFollowRequest,
    unfollowController
}