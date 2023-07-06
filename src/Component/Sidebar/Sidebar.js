import React from 'react';
import './Sidebar.css';
import { observer } from 'mobx-react-lite';
import mylogo from '../../assets/Asset2.png';
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import { menuItem } from '../../Navigation/Routes';
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { sidebarStore } from '../../Store/Sidebarstore/SideStore';
import Header from '../Header/Header';

const Sidebar = observer(() => {

  const location = useLocation();
  const isDashboardPage = location.pathname === '/sidebar';
   // Close sidebar functionality on mobile
  const closeSidebar = () => {
    sidebarStore.setSidebarOpen(false);
  };

  const toggleMenu = (index) => {
    sidebarStore.toggleMenu(index);
  };
    // Submenu arrow icon Mouseenter functions
  const handleMouseEnter = (index) => {
    sidebarStore.handleMouseEnter(index);
  };
  // Submenu arrow icon MouseLeave functions
  const handleMouseLeave = () => {
    sidebarStore.handleMouseLeave();
  };

  return (
    <>
      <div className="grid-container">
        {/* Header */}
        <Header />
        {/* End Header */}

        {/* Sidebar */}
        <aside id="sidebar" className={sidebarStore.sidebarOpen ? "sidebar-responsive" : ""}>
          <div className="sidebar-title">
            <div className="sidebar-brand">
              <img src={mylogo} alt='Logo' style={{ width: '165px' }} />
            </div>
            <span className="material-icons-outlined" onClick={closeSidebar} style={{cursor:'pointer'}}><FaTimes/></span>
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
                      <li key={subIndex} >
                        <NavLink to={subitems.path} className="navlink">
                          <div className='navlink1'>
                          {subitems.name}
                          </div>
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
});

export default Sidebar;
