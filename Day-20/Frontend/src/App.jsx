import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { user } from './Router'
import './Feature/shared/global.scss'
import { Authprovider } from './Feature/auth/auth.Context'
import { PostProvider } from './Feature/post/postContext'
const App = () => {
  return (
    <Authprovider>
      <PostProvider>
        <RouterProvider router={user} />
      </PostProvider>
    </Authprovider>
  )
}

export default App
