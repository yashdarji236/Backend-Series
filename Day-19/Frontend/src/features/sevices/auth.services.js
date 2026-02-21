import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000/auth",
    withCredentials:true
})

 export async function register( username , email , password ){
    try{
        const responce = await api.post("/register",{
            username,
            email,
            password
        },{
            withCredentials:true
        })

        return responce.data

    }
    catch(err){
        throw err
    }
}


export async function login( username , password ){
    try{
        const responce = await api.post("/login",{
            username,
            password
        } , {
            withCredentials:true
        })

        return responce.data
    }catch(err){
        throw err
    }
}

export async function Getme(){
    try{
        const responce = await api.get("/get-me")
        return responce.data
    }
    catch(err){
        throw err
    }

}