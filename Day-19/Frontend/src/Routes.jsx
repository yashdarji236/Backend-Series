import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'


function AppRoute() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<h1>Welcome to my Website</h1>} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}


export default AppRoute