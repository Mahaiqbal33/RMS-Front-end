import './App.css';
import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import './App.css'; // Create a CSS file for custom styles
import Dashboard from './Screen/Dashboard/Dashboard'
import Sidebar from './Component/Sidebar/Sidebar.js';
import Teachers from './Screen/Teachers/Teachers';
import Classes from './Screen/Classes/Classes'
import Students from './Screen/Students/Students'
import Settings from './Screen/Settings/Settings'
import Features from './Screen/Feactures/Features'
import Report from './Screen/Resports/Report'
import Teacherlist from './Screen/Teachers/Teacherlist'
import Studentlist from './Screen/Students/Studentlist'
import Testlist from './Screen/Test/Testlist'
import { createGlobalStyle } from 'styled-components';
import { GlobalStyle } from "./Theme/Topography/Topography"
import Loginform from './Screen/Loginform/Loginform';
import Test from './Screen/Test/Test';
import 'react-toastify/dist/ReactToastify.css';
const GlobalStyles = createGlobalStyle`${GlobalStyle}`;
function App() {
  return (
    <div>
      <GlobalStyles />
      <Routes>
      <Route  path='/' element={<Loginform/>}/>
        <Route path='sidebar' element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="teachers" element={<Teachers />} ></Route>
          <Route path='teacherlist' element={<Teacherlist/>}/>
          <Route path='studentlist' element={<Studentlist/>}/>
          <Route path='test' element={<Test/>}/>
          <Route path='testlist' element={<Testlist/>}/>
          <Route path="classes" element={<Classes />} />
          <Route path="students" element={<Students />} />
          <Route path="settings" element={<Settings />} />
          <Route path="Features" element={<Features />} />
          <Route path="report" element={<Report />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
