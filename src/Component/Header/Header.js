import React from 'react';
import { observer } from 'mobx-react-lite';
import { FaBars, FaBell, FaUserCircle, FaSignOutAlt, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarStore } from '../../Store/Sidebarstore/SideStore';
import '../Header/Header.css'
import { SC } from '../../Services/serverCall';

const Header = observer(() => {
  const location = useLocation();
  const isDashboardPage = location.pathname === '/sidebar';
  const logoutnavigate = useNavigate();
  const adminNavigate = useNavigate();
  
 
    const handleLogout = async () => {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
  
      // Remove the token and expiration date from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
  
      try {
        // Send a POST request to the backend to log out the user using the stored token
        await SC.postCall('/logout', {
          token: token,
        });
  
        // Redirect to the login page after successful logout
        logoutnavigate('/login');
      } catch (error) {
        console.error('Logout error:', error);
        // Handle any logout error, such as failed backend request
      }
    };

const handleAdmin =()=>{
   return adminNavigate ('admin');
}
  

  return (
    <>
      <header className={`header ${isDashboardPage ? 'dashboard-header' : ''}`}>
          <div className="menu-icon" onClick={() => sidebarStore.setSidebarOpen(true)}>
          <span className="material-icons-outlined" style={{cursor:'pointer'}}><FaBars/></span>
          </div>
      
        <div className="header-left">
          <form id="animated-icon">
            <FaSearch className="search-icon" />
            <input type="text" name="search" placeholder="Search.." />
          </form>
        </div>
        <div className={`header-right ${isDashboardPage ? 'dashboard-header-right' : ''}`}>
          <span id="header-icon"><FaBell /></span>
          <span id="header-icon" onClick={handleAdmin}><FaUserCircle /></span>
          <button id='logout-btn' onClick={handleLogout}>Logout <span className="material-icons-outlined"><FaSignOutAlt /></span></button>
        </div>
      </header>
    </>
  );
});

export default Header;
