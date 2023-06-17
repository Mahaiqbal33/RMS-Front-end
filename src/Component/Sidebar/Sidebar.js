import React from 'react';
import './Sidebar.css';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../Store/AuthStore';
import mylogo from '../../assets/Asset2.png';
import {  FaChevronDown, FaChevronUp } from "react-icons/fa";
import { menuItem} from './Routes'
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import sidebarStore from '../../Store/SideStore';

const Sidebar = observer(() => {
  const location = useLocation();
  const logoutnavigate = useNavigate();
  const isDashboardPage = location.pathname === '/sidebar';
   // Close sidebar functionality on mobile
  const closeSidebar = () => {
    sidebarStore.setSidebarOpen(false);
  };
    // Logout icon function
  const handeLogout = () => {
    authStore.logout();
    if (!authStore.isLoggedIn) {
      return logoutnavigate("/");
    }
  };

  const toggleMenu = (index) => {
    sidebarStore.toggleMenu(index);
  };
    // Submenu arrow icon Mouseenter functions
  const handleMouseEnter = (index) => {
    sidebarStore.openMenus = [...sidebarStore.openMenus, index];
  };
  // Submenu arrow icon MouseLeave functions
  const handleMouseLeave = () => {
    sidebarStore.openMenus = [];
  };

 

  return (
    <>
      <div className="grid-container">
        {/* Header */}
        <header className={`header ${isDashboardPage ? 'dashboard-header' : ''}`}>
          <div className="menu-icon" onClick={() => sidebarStore.setSidebarOpen(true)}>
            <span className="material-icons-outlined">menu</span>
          </div>
          <div className="header-left">
            <form id="animated-icon">
              <i className="uil uil-search" aria-hidden="true"></i>
              <input type="text" name="search" placeholder="Search.." />
            </form>
          </div>
          <div className={`header-right ${isDashboardPage ? 'dashboard-header-right' : ''}`}>
            <span className="material-icons-outlined" id="header-icon">notifications</span>
            <span className="material-icons-outlined" id="header-icon">account_circle</span>
            <button id='logout-btn' onClick={handeLogout}>Logout <span className="material-icons-outlined">logout</span></button>
          </div>
        </header>
        {/* End Header */}

        {/* Sidebar */}
        <aside id="sidebar" className={sidebarStore.sidebarOpen ? "sidebar-responsive" : ""}>
          <div className="sidebar-title">
            <div className="sidebar-brand">
              <img src={mylogo} alt='Logo' style={{ width: '165px' }} />
            </div>
            <span className="material-icons-outlined" onClick={closeSidebar} style={{cursor:'pointer'}}>close</span>
          </div>
          <ul className="link">
            {menuItem.map((item, index) => (
              <li key={index} onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}>
                <NavLink to={item.path} className="navlink">
                  <div className="navlink1" onClick={() => toggleMenu(index)}>
                    <div className="icon">{item.icon}</div>
                    {item.name}
                    {item.subitems && (
                      <div className="menu-item-arrow">
                        {sidebarStore.openMenus.includes(index) ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                    )}
                  </div>
                </NavLink>
                {item.subitems && sidebarStore.openMenus.includes(index) && (
                  <ul className='sub-menu'>
                    {item.subitems.map((subitems, subIndex) =>
                      <li key={subIndex} className='navlink1'>
                        <NavLink to={subitems.path} className="navlink">
                          {subitems.name}
                        </NavLink>
                      </li>)}
                  </ul>
                )}
              </li>
            ))}

          </ul>
        </aside>
        {/* End Sidebar */}

        {/* Main */}
        <main className={`main-container ${isDashboardPage ? 'dashboard-content' : ''}`}>
          <Outlet />
        </main>

      </div>
    </>
  )
})

export default Sidebar;
