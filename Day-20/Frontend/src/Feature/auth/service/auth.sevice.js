import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/auth",
    withCredentials:true
})

export async function login(username , password){
   try {
    const res = await api.post('/login', {
      username,
      password
    });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Username or password doesn't exist"
    };
  }
   
}

export async function register(username , email , password , profileImg , bio) {
    try{
        const res = await api.post('/register',{
        username,
        email,
        password,
        profileImg,
        bio
    })
    return { success:true , data:res.data}
    }
    catch(error){
        return{
            success:false,
            message:error.response?.data?.message
        }
    }


    return res.data
}


export async function Getme(){
    const res = await api.get('get-me' )

    return res.data
}

export async function GetAllusers(){
    const res = await api.get("user")
    return res.data.user
}