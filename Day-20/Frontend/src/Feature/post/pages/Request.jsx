import React, { useEffect } from 'react'
import Navbar from '../../shared/component/Navbar'
import { useFollow } from '../../Follow/hook/useFollow'
import { useAuth } from '../../auth/hooks/useAuth'
import '../style/request.scss'

const Request = () => {
  const { user } = useAuth()
  const { loading, request, getRequest, acceptReq } = useFollow()

  useEffect(() => {
    getRequest()
  }, [])

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="req__loading">Loading...</p>
      </>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="req">
        <h1>Follow Requests</h1>

        {request?.requests?.length === 0 ? (
          <p className="req__empty">No pending requests</p>
        ) : (
          request?.requests?.map(item => (
            <div className='req1' key={item._id}>
              <span className="req1__name">{item.follower}</span>
              <div className="req1__actions">
                {item.status === "pending" && (
                  <>
                    <div onClick={() => acceptReq(item.follower)} className="btn btn--confirm">
                      Confirm
                    </div>
                    <div className="btn btn--delete">
                      Delete
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Request