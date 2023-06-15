import './App.css';
import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import './App.css'; // Create a CSS file for custom styles
import Dashboard from './Screen/Dashboard'
import Sidebar from './Component/Admin/Sidebar.js';
import Teachers from './Screen/Teachers';
import Classes from './Screen/Classes'
import Students from './Screen/Students'
import Settings from './Screen/Settings'
import Features from './Screen/Features'
import Report from './Screen/Report'
import Teacherlist from './Screen/Teacherlist'
import Studentlist from './Screen/Studentlist'
import Testlist from './Screen/Testlist'
import { createGlobalStyle } from 'styled-components';
import { GlobalStyle } from './Theme/DesignSystem';
import Loginform from './Screen/Loginform/Loginform';
import Test from './Screen/Test';
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
