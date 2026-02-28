import axios from 'axios'
const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function Getfeed(){
    const res = await api.get("/posts/feed")
    return res.data
}

export async function createPost(image , caption){
    const formData = new FormData()
    formData.append("image" , image)
    formData.append("caption" , caption)
    const res = await api.post("/posts" , formData)
    return res.data
}

export async function postLiked(postId){
    const res = await api.post("/posts/like/"+postId)
    return res.data
}


export async function postUnliked(postId){
    const res = await api.post("/posts/unlike/"+postId)
    return res.data
}


