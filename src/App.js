import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { GlobalStyle } from './Theme/DesignSystem';
import Loginform from './Screen/Loginform/Loginform';
const GlobalStyles = createGlobalStyle`${GlobalStyle}`;

function App() {

  return (
    <>
     <GlobalStyles />
     <Loginform/>
    </>
  );
}

export default App;
