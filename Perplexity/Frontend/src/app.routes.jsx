import {createBrowserRouter} from "react-router-dom";
import  Login  from "./featues/auth/pages/login.jsx";
import Register from "./featues/auth/pages/register.jsx";
import VerifyEmail from "./featues/auth/pages/verify.jsx";
export const router = createBrowserRouter([
    {
        path: "login",
        element: <Login />
    },
    {
        path: "register",
        element: <Register />
    },
    {
        path: "verify",
        element: <VerifyEmail />
    },
    {
        path: "/",
        element: <div>Home Page</div>
    }
])