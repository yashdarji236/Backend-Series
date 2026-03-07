import React from 'react'
import '../nav.scss'
import { Link } from "react-router-dom"
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav>
      <div className="top">
        <p className='ins'>Instagram</p>

        <div className="user">
          <NavLink
            to="/"
            end
            className={({ isActive }) => isActive ? "option active" : "option"}
          >
            <i className="ri-home-2-fill"></i>
            <span>Feed</span>
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) => isActive ? "option active" : "option"}
          >
            <i className="ri-group-fill"></i>
            <span>Users</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) => isActive ? "option active" : "option"}
          >
            <i className="ri-user-3-fill"></i>
            <span>Profile</span>
          </NavLink>
        </div>
      </div>

      <div className="bot">
        <Link to='/login' className='out'>
          <i className="ri-logout-box-r-line"></i>
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar