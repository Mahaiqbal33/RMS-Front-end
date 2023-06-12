import React,{ useState } from 'react'
import './Sidebar.css';
import mylogo from '../../assets/Asset2.png';
import { FaChalkboardTeacher, FaUserGraduate, FaLayerGroup, FaChartBar, FaCog, FaColumns, FaCalendarAlt  } from "react-icons/fa";
import { NavLink, Outlet, useLocation  } from "react-router-dom";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
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
  const menuItem = [
    {
      path: ".",
      name: "Dashboard",
      icon: <FaColumns />,
    },
    {
      path: "teachers",
      name: "Teachers",
      icon: <FaChalkboardTeacher />,
    },
    {
      path: "students",
      name: "Students",
      icon: <FaUserGraduate />,
    },
    {
      path: "classes",
      name: "Classes",
      icon: <FaCalendarAlt />,
    },
    {
      path: "settings",
      name: "Settings",
      icon: <FaCog />,
    },
    {
      path: "report",
      name: "Report",
      icon: <FaChartBar />,
    },
    {
      path: "features",
      name: "Features",
      icon: <FaLayerGroup />,
    },
  ];
  const isDashboardPage = location.pathname === '/';
  return (
    <div className="grid-container">
      {/* Header */}
      <header className={`header ${isDashboardPage ? 'dashboard-header' : ''}`}>
        <div className="menu-icon" onClick={openSidebar}>
          <span className="material-icons-outlined">menu</span>
        </div>
        <div className="header-left">
        <form id="animated-icon">
    <i class="uil uil-search" aria-hidden="true"></i>
    <input type="text" name="search" placeholder="Search.." />
  </form>
    
        </div>
        <div className="header-right">
          <span className="material-icons-outlined">notifications</span>
          <span className="material-icons-outlined">account_circle</span>
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
            <li key={index}> 
              <NavLink to={item.path} activeClassName="active" className="navlink">
                <div className="navlink1">
                  <div className="icon">{item.icon}</div>
                  {item.name}
                </div>
              </NavLink>
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

  )
}

export default Sidebar