import React,{ useState } from 'react'
import './Sidebar.css';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../Store/AuthStore';
import mylogo from '../../assets/Asset2.png';
import { FaChalkboardTeacher, FaUserGraduate, FaLayerGroup, FaChartBar, FaCog, FaColumns, FaCalendarAlt  } from "react-icons/fa";
import { NavLink, Outlet, useLocation, useNavigate  } from "react-router-dom";

const Sidebar =observer( () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate1 = useNavigate();
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
      subitems:[
        {
          path: "teacherlist",
          name: "Teacherlist"
        }
      ]
    },
    {
      path: "students",
      name: "Students",
      icon: <FaUserGraduate />,
      subitems:[
        {
          path: "studentlist",
          name: "Studentlist"
        }
      ]
    },
    {
      path: "classes",
      name: "Classes",
      icon: <FaCalendarAlt />,
    },
    {
      path: "test",
      name: "Test",
      icon: <FaCalendarAlt />,
      subitems:[
        {
          path: "testlist",
          name: "Testlist"
        }
      ]
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
  const isDashboardPage = location.pathname === '/sidebar';
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
    <i class="uil uil-search" aria-hidden="true"></i>
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
            <li key={index}> 
              <NavLink to={item.path} activeClassName="active" className="navlink">
                <div className="navlink1">
                  <div className="icon">{item.icon}</div>
                  {item.name}
                </div>
              </NavLink>
              {item.subitems && (
                <ul className='sub-menu'>
                  {item.subitems.map((subitems,subIndex)=>
                    <li key={subIndex} className='navlink1'>
                      <NavLink to={subitems.path}className="navlink">
                        {subitems.name}
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