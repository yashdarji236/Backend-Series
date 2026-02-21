import React from 'react'
import { RouterProvider } from 'react-router-dom'
import  AppRoute  from './Routes'
import './style.scss'
import { AuthProvider } from './features/auth/authContext'
const App = () => {
  return (
    
    <AuthProvider>
   <AppRoute/>
   </AuthProvider>

  )
}

export default App
