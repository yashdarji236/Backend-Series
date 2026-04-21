import React from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router'
const Protected = ({children}) => {
    const user = useSelector(state => state.auth.user)
     const loading = useSelector(state => state.auth.loading)
     const navigate = useNavigate()
     if(loading){
        return <h1>Loading...</h1>
     }
     if(!user){
        navigate('/register')
     }
  return children
}

export default Protected
