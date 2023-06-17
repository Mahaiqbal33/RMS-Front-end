import React,{ useState } from 'react'
import './Sidebar.css';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../Store/AuthStore';
import mylogo from '../../assets/Asset2.png';
import { FaChevronDown,FaChevronUp, } from "react-icons/fa";
import { NavLink, Outlet, useLocation, useNavigate  } from "react-router-dom";
import { menuItem } from './Routes';

const Sidebar =observer( () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState([]);
  const location = useLocation();
  const navigate1 = useNavigate();
  const isDashboardPage = location.pathname === '/sidebar';
  const openSidebar = () => {
    if (!sidebarOpen) {
      setSidebarOpen(true);
    }
  };

  const closeSidebar = () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };
  const handeLogout=()=>{
    authStore.logout();
    if (!authStore.isLoggedIn) {
      return navigate1("/");
    }
  }
  const toggleMenu = (index) => {
    if (openMenus.includes(index)) {
      setOpenMenus(openMenus.filter((item) => item !== index));
    } else {
      setOpenMenus([...openMenus, index]);
    }
  };

  const handleMouseEnter = (index) => {
    setOpenMenus([...openMenus, index]);
  };

  const handleMouseLeave = () => {
    setOpenMenus([]);
  };
 
 
  return (
    <>
    <div className="grid-container">
      {/* Header */}
      <header className={`header ${isDashboardPage ? 'dashboard-header' : ''}`}>
        <div className="menu-icon" onClick={openSidebar}>
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
          <button id='logout-btn' onClick={handeLogout}>Logout <span className="material-icons-outlined" >logout</span></button>
        </div>
      </header>
      {/* End Header */}

      {/* Sidebar */}
      <aside id="sidebar" className={sidebarOpen ? "sidebar-responsive" : ""}>
        <div className="sidebar-title">
          <div className="sidebar-brand">
          <img src={mylogo} alt='Logo'  style={{width:'165px'}}  />
          </div>
          <span className="material-icons-outlined" onClick={closeSidebar}>close</span>
        </div>
        <ul className="link">
          {menuItem.map((item, index) => (
            <li key={index} onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}> 
              <NavLink to={item.path}  className="navlink">
                <div className="navlink1" onClick={() => toggleMenu(index)}>
                  <div className="icon">{item.icon}</div>
                  {item.name}
                  {item.subitems && (
                    <div className="menu-item-arrow">
                      {openMenus.includes(index) ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  )}
                </div>
              </NavLink>
              {item.subitems && openMenus.includes(index) && (
                <ul className='sub-menu'>
                  {item.subitems.map((subitems,subIndex)=>
                    <li key={subIndex}>
                      <NavLink to={subitems.path} className="navlink">
                        <div className='navlink1'>
                        {subitems.name}
                        </div>
                      </NavLink>
                    </li> )}
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

export default Sidebar