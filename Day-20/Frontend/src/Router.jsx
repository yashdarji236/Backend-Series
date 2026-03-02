import { createBrowserRouter } from 'react-router-dom'
import Login from './Feature/auth/pages/Login'
import Register from './Feature/auth/pages/Register'
import Feed from './Feature/post/pages/Feed'
import CreatePages from './Feature/post/pages/CreatePages'
import Users from './Feature/post/pages/Users'
import Profile from './Feature/post/pages/Profile'
import Request from './Feature/post/pages/Request'
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
    },
    {
        path:'/create-post',
        element:<CreatePages/>
    },
    {
        path:'/users',
        element:<Users/>
    },{
        path:'/profile',
        element:<Profile />
    },{
        path:'/request',
        element:<Request/>
    }
])