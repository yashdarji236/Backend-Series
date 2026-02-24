import { useContext } from "react";
import { AuthContext } from "../auth.Context";
import { login , register , Getme } from '../service/auth.sevice'

export const useAuth = ()=>{
    const context = useContext(AuthContext)
    const {  user , Setuser , loading , Setloading } = context


    const handleLogin = async  (username , password)=>{
        Setloading(true)
        const res = await login(username , password)

        Setuser(res.user)

        Setloading(false)
        return res
    }

    const handleRegister = async (username , email , password)=>{
        Setloading(true)
        const res = await register(username , email , password)
        Setuser(res.user)
        Setloading(false)
        return res
    }


    return {
        user , loading , handleLogin , handleRegister 
    }
}