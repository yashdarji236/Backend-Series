import axios from 'axios'
const api = axios.create({
    baseURL:"http://localhost:3000/auth",
    withCredentials:true
})

export async function login(username , password){
    const res = await api.post('/login' , {
        username,
        password
    } )

    return res.data
}

export async function register(username , email , password) {
    const res = await api.post('register',{
        username,
        email,
        password
    })


    return res.data
}


export async function Getme(){
    const res = await api.get('get-me' )

    return res.data
}