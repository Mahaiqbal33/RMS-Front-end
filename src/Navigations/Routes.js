import{FaChalkboardTeacher, FaUserGraduate,FaCheckCircle,  FaClipboardCheck, FaLayerGroup, FaChartBar, FaCog, FaColumns ,FaCalendarAlt} from 'react-icons/fa'
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
      icon:  < FaClipboardCheck/>,
      subitems:[
        {
          path: "testlist",
          name: "TestList"
        }
      ]
    },
    {
      path: "Result",
      name: "Result",
      icon: <FaCheckCircle />,
      subitems:[
        {
          path: "ResultList",
          name: "ResultList"
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
      subitems:[
        {
          path: "teacherReport",
          name: "TeachersReport"
        }
      ]
    },
    {
      path: "features",
      name: "Features",
      icon: <FaLayerGroup />,
    },
  ];