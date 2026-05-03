import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protected = ({ children }) => {
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    if (loading) {
        return <div className="min-h-screen bg-[#191a1a] flex items-center justify-center"><span className="w-8 h-8 rounded-full border-2 border-[#e8e8f0] border-t-transparent animate-spin"></span></div>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default Protected
