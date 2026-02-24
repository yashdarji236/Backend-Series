import React from 'react'
import { useLocation } from "react-router"
import { useEffect, useState } from "react"
import ''
const Home = () => {
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

    return (
        <main>
        <div className="feed">
            <div className="posts">
                <div className="user">
                    <img src="https://i.pinimg.com/736x/3b/e0/60/3be060ae3462835a6a72e2f4e17e9c43.jpg" alt="" />
                    <p>Username</p>
                </div>
                <img src="https://i.pinimg.com/736x/c3/44/9c/c3449c7256ee791cfb2721a7b9afb464.jpg" alt="" />
                <div className="btn">
                    <p className="captiom">Caption</p>
                </div>
            </div>
        </div>
        <div>
            {message && <p style={{ position: 'absolute', color: 'white', top: '2rem', right: '2rem', backgroundColor: 'green', padding: '1rem', borderRadius: '2rem' }}>{message}</p>}
            
        </div>
    </main>
    )
}

export default Home
