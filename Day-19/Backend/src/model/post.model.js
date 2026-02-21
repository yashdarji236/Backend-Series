const mongoose = require('mongoose')
const Scheme = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    ImgUrl: {
        type: String,
        required: [true, "img url is required for creating post"]
    },
    user: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
        required: [true , "user id is required for creating a post!"]
    }
})

const PostModel = mongoose.model("post", Scheme)

module.exports = PostModel