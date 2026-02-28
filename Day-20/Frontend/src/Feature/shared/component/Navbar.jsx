import React from 'react'
import '../nav.scss'
import { useNavigate } from 'react-router-dom'
import { Link, useLocation } from "react-router"
import { useEffect, useState } from "react"
import { NavLink } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
const Navbar = () => {
    const usenavigate = useNavigate()
    const { user } = useAuth();
  
   
  return (
    <nav>
       <div className="top">
         <p>{user?.username}</p>
         <div className="user">
             <NavLink
  to="/"
  className={({ isActive }) =>
    isActive ? "option active" : "option"
  }
>
  Feed
</NavLink>

<NavLink
  to="/users"
  className={({ isActive }) =>
    isActive ? "option active" : "option"
  }
>
  Users
</NavLink>

<NavLink
  to="/profile"
  className={({ isActive }) =>
    isActive ? "option active" : "option"
  }
>
  Profile
</NavLink>


         </div>
       </div>
       <div className="bot">
        <div className="icons">
    <NavLink
  to="/"
  className={({ isActive }) =>
    isActive ? "icon on" : "icon"
  }
>
  <i class="ri-home-2-fill"></i>
</NavLink>
<NavLink
  to="/users"
  className={({ isActive }) =>
    isActive ?"icon on" : "icon"
  }
>
  <i class="ri-group-fill"></i>
</NavLink>
<NavLink
  to="/profile"
  className={({ isActive }) =>
    isActive ?"icon on" : "icon"
  }
>
    <i class="ri-user-3-fill"></i>
</NavLink>
</div>
          <Link to='/login' className='out'>Logout</Link>
       </div>
       
    </nav>
  )
}

export default Navbar
