import React from 'react';
import { observer } from 'mobx-react-lite';
import { FaBars, FaBell, FaUserCircle, FaSignOutAlt, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarStore } from '../../Store/Sidebarstore/SideStore';
import '../Header/Header.css'
import { SC } from '../../Services/serverCall';
import sweetAlertConfig from '../../Component/Alerts/alertConfig';

const Header = observer(() => {
  const location = useLocation();
  const isDashboardPage = location.pathname === '/sidebar';
  const logoutNavigate = useNavigate();
  const adminNavigate = useNavigate();
  
 
  const handleLogout = async () => {
    // Get the token from localStorage
    const userToken = localStorage.getItem('userToken');
  
    try {
      // Send a POST request to the backend to log out the user using the stored token
      await SC.postCall('/logout', {
        token: userToken,
      });
  
      // Redirect to the login page after successful logout
      logoutNavigate('/');
  
      // Remove userToken from local storage after successful logout
      localStorage.removeItem('userToken');
    } catch (error) {
      sweetAlertConfig.errorAlert(error.message)
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
          <form className="animated-icon">
            <FaSearch className="search-icon" />
            <input type="text" name="search" placeholder="Search.." />
          </form>
        </div>
        <div className={`header-right ${isDashboardPage ? 'dashboard-header-right' : ''}`}>
          <span className="header-icon"><FaBell /></span>
          <span className="header-icon" onClick={handleAdmin}><FaUserCircle /></span>
          <button type='reset' className='logout-btn' onClick={handleLogout}>Logout <span className="material-icons-outlined"><FaSignOutAlt /></span></button>
        </div>
      </header>
    </>
  );
});

export default Header;
