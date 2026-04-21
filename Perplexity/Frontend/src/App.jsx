import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes.jsx'
import { useAuth } from './featues/auth/hook/useAuth.js'
const App = () => {
  const auth = useAuth()
  useEffect(() => {
    auth.fetchCurrentUser()
  }, [])
  return (

    <RouterProvider router={router} />
  )
}

export default App
