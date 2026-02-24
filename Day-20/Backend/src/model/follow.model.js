const mongoose = require('mongoose')
const FollowSceme = new mongoose.Schema({
    follower: {
        type: String,

    },
    followee: {
        type: String,

    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: ["pending", "accepted", "rejecte"],
            message: "Status can only be pending , accepted or rejected"
        }
    }
}, {
    timestamps: true
})
FollowSceme.index({ follower: 1, followee: 1 }, { unique: true })

const followModel = mongoose.model("follow", FollowSceme)
module.exports = followModel