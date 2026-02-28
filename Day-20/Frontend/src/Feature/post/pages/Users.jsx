import React from 'react'
import Navbar from '../../shared/component/Navbar'
import { useUsers } from '../../auth/hooks/allUsers'
import { useFollow } from '../../Follow/hook/useFollow'
import '../style/users.scss'

const Users = () => {
  const { users, loading } = useUsers()

  const {
    request,
    handleRequest,
  } = useFollow()

  if (loading) return <p>Loading...</p>
  if (!users.length) return <p>No users found</p>

  return (
    <div>
      <Navbar />

      <div className='users'>
        {users.map(user => {
          const status = request?.[user.username]
           // pending / accepted / rejected

          return (
            <div className='user' key={user._id}>
              <div className="info">
                <img src={user.profileImg} width="70" />
                <p>{user.username}</p>
              </div>

              {!status && (
                <button onClick={() => handleRequest(user.username)}>
                  Follow
                </button>
              )}

              {status === "pending" && (
                <button disabled>
                  Requested
                </button>
              )}

              {status === "accepted" && (
                <button>
                  Following
                </button>
              )}

              {status === "rejected" && (
                <button onClick={() => handleRequest(user._id)}>
                  Follow 
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Users