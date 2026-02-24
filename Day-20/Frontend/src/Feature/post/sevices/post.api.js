import axios from 'axios'
const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function Getfeed(){
    const res = await api.get("/posts/feed")
    return res.data
}

