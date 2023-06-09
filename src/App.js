import './App.css';
import React from 'react';
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
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './Utilits/PrivateRoutes';
import NewTeacher from './Screen/Teachers/NewTeacher';
import Subjects from './Screen/Subjects/Subjects';
import SubjectsList from './Screen/Subjects/SubjectsList';
function App() {
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
          <Route path="settings" element={<Settings />} />
          <Route path="Features" element={<Features />} />
          <Route path="report" element={<Report />} />
        </Route>
    </Route>
      <Route  path='/' element={<Loginform/>}/>
      </Routes>
    </div>
  );
}

export default App;


