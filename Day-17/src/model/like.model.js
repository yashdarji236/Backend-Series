const mongoose = require('mongoose')


const Scema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: [true, "post id is required for creating  like"]
    },
    user: {
        type: String,
        required: [true, "username is required for creating the like"]
    }
}, {
    timestamps: true
})
Scema.index({ post: 1, user: 1 }, { unique: true })
const likeModel = mongoose.model("like", Scema)
module.exports = likeModel