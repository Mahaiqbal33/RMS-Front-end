import './App.css';
import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import './App.css'; // Create a CSS file for custom styles
import Dashboard from './screen/Dashboard'
import Sidebar from './Component/Admin/Sidebar.js';
import Teachers from './screen/Teachers';
import Classes from './screen/Classes'
import Students from './screen/Students'
import Settings from './screen/Settings'
import Features from './screen/Features'
import Report from './screen/Report'
import Teacherlist from './screen/Teacherlist'
import Studentlist from './screen/Studentlist'
import Testlist from './screen/Testlist'
import { createGlobalStyle } from 'styled-components';
import { GlobalStyle } from './Theme/DesignSystem';
import Loginform from './screen/Loginform/Loginform';
import Test from './screen/Test';
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
