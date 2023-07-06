// import React from 'react'
// import "./Header.css"
// import { observer } from 'mobx-react-lite';
// import {  FaBars,FaBell, FaUserCircle,FaSignOutAlt, FaSearch} from "react-icons/fa";
// import {  useLocation, useNavigate } from "react-router-dom";
// import {sidebarStore} from '../../Store/Sidebarstore/SideStore';
// import { authStore } from '../../Store/LoginStore/AuthStore';
// const Header = observer(() => {
//     const location = useLocation();
//     const isDashboardPage = location.pathname === '/sidebar';
//     const logoutnavigate = useNavigate();
//     const handeLogout = () => {
//         authStore.logout();
//         if (!authStore.isLoggedIn) {
//           return logoutnavigate("/");
//         }
//       };
//   return (
//     <>
//        <header className={`header ${isDashboardPage ? 'dashboard-header' : ''}`}>
//           <div className="menu-icon" onClick={() => sidebarStore.setSidebarOpen(true)}>
//             <span className="material-icons-outlined" style={{cursor:'pointer'}}><FaBars/></span>
//           </div>
//           <div className="header-left">
//             <form id="animated-icon">
//               {/* <i className="uil uil-search" aria-hidden="true"></i> */}
//               <FaSearch className="search-icon" />
//               <input type="text" name="search" placeholder="Search.." />
//             </form>
//           </div>
//           <div className={`header-right ${isDashboardPage ? 'dashboard-header-right' : ''}`}>
//             <span id="header-icon"><FaBell/></span>
//             <span id="header-icon"><FaUserCircle/></span>
//             <button id='logout-btn' onClick={handeLogout}>Logout <span className="material-icons-outlined"><FaSignOutAlt/></span></button>
//           </div>
//         </header>
//     </>
//   )
// })

// export default Header
import React from 'react';
import { observer } from 'mobx-react-lite';
import { FaBars, FaBell, FaUserCircle, FaSignOutAlt, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarStore } from '../../Store/Sidebarstore/SideStore';
import { authStore } from '../../Store/LoginStore/AuthStore';
import '../Header/Header.css'

const Header = observer(() => {
  const location = useLocation();
  const isDashboardPage = location.pathname === '/sidebar';
  const logoutnavigate = useNavigate();
  const handeLogout = () => {
    authStore.logout();
    if (!authStore.isLoggedIn) {
      return logoutnavigate("/");
    }
  };

  

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
          <span id="header-icon"><FaUserCircle /></span>
          <button id='logout-btn' onClick={handeLogout}>Logout <span className="material-icons-outlined"><FaSignOutAlt /></span></button>
        </div>
      </header>
    </>
  );
});

export default Header;
