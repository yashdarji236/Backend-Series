import React, { useEffect, useState } from 'react'
import Navbar from '../../shared/component/Navbar'
import { useAuth } from '../../auth/hooks/useAuth'
import { useUsers } from '../../auth/hooks/allUsers'
import '../style/profile.scss'
import { useNavigate } from 'react-router-dom'
import { useFollow } from '../../Follow/hook/useFollow'
const Profile = () => {

  const { loading, getFollower } = useFollow()
  const { user } = useAuth()
  const usenavigate = useNavigate()

  const [follower, Setfollower] = useState("0")

  useEffect(() => {
    const fetchFollower = async () => {
      const res = await getFollower()
      Setfollower(res.total)
    }
    fetchFollower()
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
    <div className='box'>
      <Navbar />
      <div className='box1'>
        <img src={user?.profileImg} alt="" />
        <div className="user">
          <p>{user?.username}</p>

          <div className="follow">
            <div className="post">
              <div className="post1">post</div>
              <div className="count">0</div>
            </div>

            <div className="post">
              <div className="post1">Followers</div>
              <div className="count">{follower}</div>
            </div>

            <div className="post">
              <div className="post1">Following</div>
              <div className="count">0</div>
            </div>
          </div>
        </div>
      </div>

      <div className="btn">
        <div onClick={() => usenavigate('/create-post')} className="create">
          Create Post
        </div>
        <div onClick={() => usenavigate('/request')} className="create">
          Requests
        </div>
      </div>
    </div>
  )
}

export default Profile

