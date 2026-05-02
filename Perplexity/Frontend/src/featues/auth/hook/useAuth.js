import {useDispatch} from 'react-redux'
import { register , login , Getme } from '../services/auth.api'
import { setUser,setLoading,setError } from '../auth.slice'


export function useAuth(){
    const dispatch = useDispatch()

    async function registerUser({username , email , password}){
        try{
            dispatch(setLoading(true))
            const data = await register({username , email , password})
            return data

        }catch(err){
            dispatch(setError(err.message? err.message : 'Registration failed'))
            return { success: false, message: err.message || 'Registration failed' }
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function loginUser({email , password}){
        try{
            dispatch(setLoading(true))
            const data = await login({email , password})
            if(data.success){
                dispatch(setUser(data.data.user))
            }
            return data
        }catch(err){
            dispatch(setError(err.message? err.message : 'Login failed'))
            return { success: false, message: err.message || 'Login failed' }
        }finally{
            dispatch(setLoading(false))
        }
    }
    async function fetchCurrentUser(){
        try{
            dispatch(setLoading(true))
            const data = await Getme()
            if(data.success){
                dispatch(setUser(data.data.user))
            }
            return data
        }catch(err){
            dispatch(setError(err.message? err.message : 'Failed to fetch user'))
            return { success: false, message: err.message || 'Failed to fetch user' }
        }finally{
            dispatch(setLoading(false))
        }
    }
    return {registerUser , loginUser , fetchCurrentUser}
}
