import './App.css';
import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createGlobalStyle } from 'styled-components';
import { GlobalStyle } from './Theme/DesignSystem';
import Loginform from './Screen/Loginform/Loginform';
const GlobalStyles = createGlobalStyle`${GlobalStyle}`;

function App() {

  return (
    <>
     <GlobalStyles />
    <Loginform></Loginform>

    </>
  );
}

export default App;
