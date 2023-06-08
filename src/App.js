import './App.css';
import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Buttoncomponent from './Component/Buttoncomponent';
import { createGlobalStyle } from 'styled-components';
import { GlobalStyle } from './Theme/DesignSystem';

const GlobalStyles = createGlobalStyle`${GlobalStyle}`;

function App() {

  return (
    <>
     <GlobalStyles />
    <Buttoncomponent/>

    </>
  );
}

export default App;
