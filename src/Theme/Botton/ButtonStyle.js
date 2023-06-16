import styled  from 'styled-components';

// Button component  with style
export const Button = styled.button`
 background-color: var(--color-secondary);
 display: flex;
flex-direction: row;
align-items: center;
padding: 10px 24px;
border:none;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
text-align: center;
border-radius: 4px;
color: #FFFFFF;
flex: none;
order: 1;
flex-grow: 0;
transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
