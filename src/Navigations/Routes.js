import{FaChalkboardTeacher, FaUserGraduate, FaLayerGroup, FaChartBar, FaCog, FaColumns ,FaCalendarAlt} from 'react-icons/fa'
export const menuItem = [
    {
      path: ".",
      name: "Dashboard",
      icon: <FaColumns />,
    },
    {
      path: "teacher",
      name: "Teachers",
      icon: <FaChalkboardTeacher />,
      subitems:[
        {
          path: "teacherlist",
          name: "TeacherList"
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
          name: "StudentList"
        }
      ]
    },
    {
      path: "Subjects",
      name: "Subjects",
      icon: <FaCalendarAlt />,
      subitems:[
        {
          path: "subjectsList",
          name: "SubjectsList"
        }
      ]
    },
    {
      path: "test",
      name: "Test",
      icon: <FaCalendarAlt />,
      subitems:[
        {
          path: "testlist",
          name: "TestList"
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