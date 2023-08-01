import './App.css';
import React,{useEffect}  from 'react';
import {  Route, Routes } from 'react-router-dom';
import './App.css'; // Create a CSS file for custom styles
import Dashboard from './Screen/Dashboard/Dashboard'
import Sidebar from './Component/Sidebar/Sidebar.js';
import Students from './Screen/Students/Students'
import Settings from './Screen/Settings/Settings'
import Features from './Screen/Features/Feature'
import Report from './Screen/Reports/Report'
import Teacherlist from './Screen/Teachers/Teacherlist'
import Studentlist from './Screen/Students/Studentlist'
import Testlist from './Screen/Test/Testlist'
import Loginform from './Screen/Loginform/Loginform';
import NewTest from './Screen/Test/NewTest';
import PrivateRoutes from './Utilits/PrivateRoutes';
import NewTeacher from './Screen/Teachers/NewTeacher';
import Subjects from './Screen/Subjects/Subjects';
import SubjectsList from './Screen/Subjects/SubjectsList';
import AddResult from './Screen/Result/AddResult';
import ResultList from './Screen/Result/ResultList';
import Admin from './Screen/Admin/Admin';
import { useNavigate } from 'react-router-dom';
import checkTokenExpiration from './Utilits/checkTokenExpiration'; // Adjust the import path if needed

function App() {
  const navigate = useNavigate(); // Get the 'navigate' function from react-router-dom

 
  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem('userToken'));
    if (tokenData) {
      const { expirationTime } = tokenData;
      const currentTime = new Date();
      const expirationTimeDate = new Date(expirationTime);
      const timeDifference = expirationTimeDate.getTime() - currentTime.getTime();

      if (timeDifference > 0) {
        // Set a timeout to call checkTokenExpiration when the token expires
        const timeoutId = setTimeout(() => {
          checkTokenExpiration(navigate);
        }, timeDifference);

        // Clear the timeout when the component unmounts
        return () => {
          clearTimeout(timeoutId);
        };
      }
    }
  }, [navigate]);

  return (
    <div>
     <Routes>
    <Route element= {<PrivateRoutes/>}>
    <Route path='sidebar' element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="teacher" element={<NewTeacher></NewTeacher>} ></Route>
          <Route path='teacherlist' element={<Teacherlist/>}/>
          <Route path='studentlist' element={<Studentlist/>}/>
          <Route path='test' element={<NewTest/>}/>
          <Route path='testlist' element={<Testlist/>}/>
          <Route path="Subjects" element={<Subjects/>} />
          <Route path='subjectsList' element={<SubjectsList/>}/>
          <Route path="students" element={<Students />} />
          <Route path='Result'   element={<AddResult/>}/>
          <Route path='ResultList'   element={<ResultList/>}/>
          <Route path="settings" element={<Settings />} />
          <Route path="Features" element={<Features />} />
          <Route path="report" element={<Report />} />
          <Route path='admin'  element={<Admin/>}/>
        </Route>
    </Route>
      <Route  path='/' element={<Loginform/>}/>
      </Routes>
    </div>
  );
}

export default App;


