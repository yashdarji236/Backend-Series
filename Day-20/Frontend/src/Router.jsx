import { createBrowserRouter } from 'react-router-dom'
import Login from './Feature/auth/pages/Login'
import Register from './Feature/auth/pages/Register'
import Feed from './Feature/post/pages/Feed'
import CreatePages from './Feature/post/pages/CreatePages'
import Users from './Feature/post/pages/Users'
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
    }
])