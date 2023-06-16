import styled ,{ css } from 'styled-components';

//p component with style

export const Subtitle = styled.p`
 color: ${(props) => (props.white ? 'white' : 'gray')};
font-size: 14px;
font-weight: 400;
line-height:17px;
/* add more styles as needed */
`;

//h1 component with style
export const Heading = styled.h1`
color: ${(props) => (props.white ? 'white' : 'black')};
font-size: 36px;
font-weight: bold;
line-height:34px;
/* add more styles as needed */
`;

//h3 component  with style
export const Heading2 = styled.h3`
font-size: 16px;
font-weight: 500;
line-height:19px;
color: var(--color-secondary);
/* add more styles as needed */
`;

//Link component  with style
export const Link = styled.a`
  color: ${(props) => (props.primary ? 'blue' : 'gray')};
  text-decoration: none;
  font-size:16px;
  font-weight:500;
  line-height:20px;

`;


//Link component  with style
export const Sectionstyled = styled.section`
  display:flex;
  flex-direction: ${(props) => (props.row ? 'row' : 'column')};
  justify-content:center;
  align-items:center;
  width:100%;
  height:100vh;
`;
