import{FaChalkboardTeacher, FaUserGraduate, FaLayerGroup, FaChartBar, FaCog, FaColumns ,FaCalendarAlt} from 'react-icons/fa'
export const menuItem = [
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