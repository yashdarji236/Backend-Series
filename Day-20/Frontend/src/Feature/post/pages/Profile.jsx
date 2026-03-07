
import React, { useEffect, useState, useRef, useCallback } from 'react'
import Navbar from '../../shared/component/Navbar'
import { useAuth } from '../../auth/hooks/useAuth'
import '../style/profile.scss'
import Post from "../component/Post"
import { usePost } from '../hook/usepost'
import { useNavigate } from 'react-router-dom'
import { useFollow } from '../../Follow/hook/useFollow'

const Profile = () => {

  const { getFollower } = useFollow()
  const { user } = useAuth()
  const usenavigate = useNavigate()


  const { userPost, GetUserPost, loading, handleLiked, handleunLiked, Getlikes } = usePost()

  const [follower, Setfollower] = useState(0)
  const [postCount, SetpostCount] = useState(0)
  const [posts, setPosts] = useState([])
  const [likesCount, setLikesCount] = useState({})

  const [selectedPost, setSelectedPost] = useState(null)
  const [peekPost, setPeekPost] = useState(null)

  const holdTimer = useRef(null)
  const holdTriggered = useRef(false)

  // ───────── Fetch Likes ─────────
  const fetchLikes = async (postId) => {
    try {

      const res = await Getlikes(postId)

      setLikesCount(prev => ({
        ...prev,
        [postId]: res?.message?.length || 0
      }))

    } catch (err) {
      console.log(err)
    }
  }

  // ───────── Enrich post ─────────
  const enrichPost = useCallback((p) => ({
    ...p,
    user: {
      ...p.user,
      profileImg: p.user?.profileImg || user?.profileImg,
      username: p.user?.username || user?.username,
    }
  }), [user])

  // ───────── Long press preview ─────────
  const startHold = (p) => {

    holdTriggered.current = false

    holdTimer.current = setTimeout(() => {
      holdTriggered.current = true
      setPeekPost(enrichPost(p))
    }, 400)

  }

  const endHold = () => {
    clearTimeout(holdTimer.current)
    setTimeout(() => setPeekPost(null), 180)
  }

  // ───────── Click open modal ─────────
  const handleClick = (p) => {

    if (holdTriggered.current) return
    setSelectedPost(enrichPost(p))

  }

  const closeModal = () => setSelectedPost(null)

  const handleOverlayClick = (e) => {

    if (e.target === e.currentTarget) closeModal()

  }

  // ───────── Like Toggle ─────────
  const toggleLike = async (postId) => {

    await handleLiked(postId)

    // refresh like count
    fetchLikes(postId)

  }

  // ───────── Load Posts ─────────
  useEffect(() => {

    GetUserPost()

  }, [])

  useEffect(() => {

    if (userPost?.posts) {

      setPosts(userPost.posts)
      SetpostCount(userPost.total)

      // ✅ fetch likes for each post
      userPost.posts.forEach(p => {
        fetchLikes(p._id)
      })

    }

  }, [userPost])

  // ───────── Followers ─────────
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
        <p style={{ textAlign: 'center', marginTop: '3rem' }}>
          Loading...
        </p>
      </>
    )

  }

  return (

    <div className='box'>

      <Navbar />

      {/* Profile header */}
      <div className='box1'>

        <img src={user?.profileImg} alt="" />

        <div className="user">

          <p>{user?.username}</p>

          <div className="follow">

            <div className="post">
              <div className="count">{postCount}</div>
              <div className="post1">posts</div>
            </div>

            <div className="post">
              <div className="count">{follower}</div>
              <div className="post1">followers</div>
            </div>

            <div className="post">
              <div className="count">0</div>
              <div className="post1">following</div>
            </div>

          </div>

        </div>

      </div>

      {/* Buttons */}
      <div className="btn">

        <div
          onClick={() => usenavigate('/create-post')}
          className="create"
        >
          Create Post
        </div>

        <div
          onClick={() => usenavigate('/request')}
          className="create"
        >
          Requests
        </div>

      </div>

      <div className="line">Posts</div>

      {/* Posts grid */}
      <div className="user-post">

        <div className="posts">

          {posts.map(p => (

            <div
              key={p._id}
              className="post"
              onMouseDown={() => startHold(p)}
              onMouseUp={endHold}
              onMouseLeave={endHold}
              onClick={() => handleClick(p)}
              onTouchStart={() => startHold(p)}
              onTouchEnd={endHold}
            >

              <img src={p.ImgUrl} alt="" draggable={false} />

              <div
                className="post-overlay"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleLike(p._id)
                }}
              >

                <span>

                  <svg viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>

                  {likesCount[p._id] || 0}

                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Peek preview */}
      {peekPost && (
        <div className="peek-overlay">
          <div className="peek-card">
            <img src={peekPost.ImgUrl} alt="" />
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedPost && (

        <div
          className="post-modal-overlay"
          onClick={handleOverlayClick}
        >

          <div className="post-modal">

            <button
              className="modal-close"
              onClick={closeModal}
            >
              ✕
            </button>

            <Post
              user={selectedPost.user}
              post={selectedPost}
              loading={loading}
              handleLiked={handleLiked}
              handleunLiked={handleunLiked}
            />

          </div>

        </div>

      )}

    </div>
  )
}

export default Profile
