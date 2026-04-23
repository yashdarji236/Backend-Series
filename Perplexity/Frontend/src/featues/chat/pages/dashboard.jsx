import React , { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { useChat } from '../hooks/useChat';

const dashboard = () => {

    const chat = useChat();
    const {user} = useSelector(state => state.auth)
    console.log(user);
    useEffect(() => {
        chat.initSocketConnection();
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default dashboard
