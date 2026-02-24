import React from 'react'
import { useLocation } from "react-router"
import Post from "../pages/component/Post"
import { useEffect, useState } from "react"
import { usePost } from '../hook/usepost'
import '../style/feed.scss'
const Home = () => {
    const {feed , handleGetfeed , loading} = usePost()
    const location = useLocation()
    const [message, setMessage] = useState('')
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
    console.log(feed);
    
    return (
        <main className='feed-pages'>
        <div className="feed">
            <div className="posts">
               {feed.map(post=>{
                        return <Post user={post.user} post={post} />
                    })}
            </div>  
        </div>
        <div>
            {message && <p style={{ position: 'absolute', color: 'white', top: '2rem', right: '2rem', backgroundColor: 'green', padding: '1rem', borderRadius: '2rem' }}>{message}</p>}
            
        </div>
    </main>
    )
}

export default Home
