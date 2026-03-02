import React, { useEffect } from 'react'
import Navbar from '../../shared/component/Navbar'
import { useUsers } from '../../auth/hooks/allUsers'
import { useFollow } from '../../Follow/hook/useFollow'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import '../style/request.scss'
const Request = () => {
      const { user } = useAuth()
      const { loading , request , getRequest , acceptReq } = useFollow()
      useEffect(() => {
    getRequest()
  }, [])

  
     if (loading) {
  return (
    <>
      <Navbar />
      <p>Loading...</p>
    </>
  
    
  )

  
}   

     

       
  return (
    <div>
      <Navbar/>
      
      <div className="req">
        <h1>Request</h1>
         {request?.requests?.length === 0 ? (
  <p>Request not found</p>
) : (
  request?.requests?.map(item => (
    <div className='req1' key={item._id}>
      <h2>{item.follower} </h2>
        <div onClick={()=>{acceptReq(item.follower)}} className="btn">
          {item.status === "pending" ? "accept" : ""}
      </div>
    </div>
    
    
  ))
)}
      </div>
    </div>
  )
}

export default Request
