import React from 'react'
import {useSelector} from 'react-redux'
const dashboard = () => {
    const {user} = useSelector(state => state.auth)
    console.log(user);
    
  return (
    <div>
      
    </div>
  )
}

export default dashboard
