import styled ,{ css } from 'styled-components';

//Global Color 
export const colors = {
  primary: '#071026',
  secondary: '#428DFC',
  highlight: "#FFFFFF",
  dark: "red"
};

export const GlobalStyle = css`
  :root {
    --color-primary: ${colors.primary};
    --color-secondary: ${colors.secondary};
    --color-highlight: ${colors.highlight};
    --color-dark: ${colors.dark};
  }
`;


//p component with style

export const subtitle = styled.p`
font-size: 14px;
font-weight: 400;
line-height:17px;
/* add more styles as needed */
`;

//h1 component with style
export const heading = styled.h1`
font-size: 36px;
font-weight: 900;
line-height:34px;
/* add more styles as needed */
`;

//h3 component  with style
export const heading2 = styled.h3`
font-size: 16px;
font-weight: 500;
line-height:19px;
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

// Button component  with style
export const Button = styled.button`
 background-color: var(--color-highlight);
  color: #333;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

