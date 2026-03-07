import React from 'react'
import { useLocation } from "react-router"
import Post from "../component/Post"
import { useEffect, useState } from "react"
import { usePost } from '../hook/usepost'
import { useNavigate } from 'react-router'
import '../style/feed.scss'
import Navbar from '../../shared/component/Navbar'
import { useAuth } from '../../auth/hooks/useAuth'  
import { Getme } from '../../auth/service/auth.sevice'
const Home = () => {
    const { user } = useAuth()
    const {feed , handleGetfeed  , loading , handleLiked , handleunLiked} = usePost()
    const location = useLocation()
    const usenavigate = useNavigate()
    const [message, setMessage] = useState('')
    useEffect(() => {
    const checkAuth = async () => {
        try {
            await Getme()   // wait for API
        } catch (err) {
            console.log(err)
        }
    }

    checkAuth()
}, [])
     useEffect(() => {
        
        if (!user && !loading) {
            usenavigate('/login')
        }
    }, [user , loading])
    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message)
            
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    }, [location])
    useEffect(()=>{
        handleGetfeed()
    },[])
    if(loading){
        return <main><h1>Feed is Loading...</h1></main>
    }
   
    
    
    return (
        <main className='feed-pages'>
            
            <Navbar/>
        <div className="feed">
            <div className="posts">
               {feed
   ?.filter(post => post && post.user)
   .map(post => (
      <Post 
         key={post._id}
         user={post.user}
         post={post}
         loading={loading}
         handleLiked={handleLiked}
         handleunLiked={handleunLiked}
      />
))}
            </div>  
        </div>
        <div>
            {message && <p style={{ position: 'absolute', color: 'white', top: '2rem', right: '2rem', backgroundColor: 'green', padding: '1rem', borderRadius: '2rem' }}>{message}</p>}
            
        </div>
    </main>
    )
}

export default Home
