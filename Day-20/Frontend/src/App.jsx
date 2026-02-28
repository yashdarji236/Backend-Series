import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { user } from './Router'
import './Feature/shared/global.scss'
import { Authprovider } from './Feature/auth/auth.Context'
import { PostProvider } from './Feature/post/postContext'
import { FollowProvider } from './Feature/Follow/FollowContext'
const App = () => {
  return (
    <Authprovider>
      <PostProvider>
        <FollowProvider>
          <RouterProvider router={user} />
        </FollowProvider>
      </PostProvider>
    </Authprovider>
  )
}

export default App
