import React from 'react'

import '../styles/Header.scss'

const Header = () => {
  return (
      <nav className='navbar'>
        <div className="navbar__hamburger">
          <i class="fas fa-bars"></i>
        </div>
        <div className="navbar__logo">
          <a href="#">
            <h3>Busy Bee</h3>
          </a>
        </div>
        <div className="navbar__items">
          <ul>
            <a href="#"><li>Users</li></a> 
            <a href="#"><li>Settings</li></a> 
          </ul>
        </div>
      </nav>
  )
}

export default Header
