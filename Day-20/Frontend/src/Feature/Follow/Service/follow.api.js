import axios from 'axios'
const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})


export async function Followrequest(username){
    const res = await api.post("user/follow/"+username)
    return res.data
}

