import axios from 'axios'
const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})


export async function Followrequest(username){
    const res = await api.post("user/follow/"+username)
    return res.data
}

export async function GetRequest(){
    const res = await api.get("user/follow/request")
    return res.data
}


export async function AcceptRequest(requestId){
    const res = await api.patch("user/follow/accept/"+requestId)
    return res.data
}

export async function GetFollowers(){
    const res = await api.get("user/follow/accept")
    return res.data
}

export async function getUsers(){
    const res = await api.get("user/follow/user/users")
    return res.data
}