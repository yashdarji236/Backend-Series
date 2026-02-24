import { createBrowserRouter } from 'react-router-dom'
import Login from './Feature/auth/pages/Login'
import Register from './Feature/auth/pages/Register'
import Feed from './Feature/post/pages/Feed'
export const user = createBrowserRouter([
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:"/",
        element:<Feed/>
    }
])