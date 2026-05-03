import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Preloader from './Preloader'

const Protected = ({ children }) => {
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)
    const [isPreloading, setIsPreloading] = useState(true)

    if (loading || isPreloading) {
        return <Preloader onComplete={() => setIsPreloading(false)} />
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default Protected
