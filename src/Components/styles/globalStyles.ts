import styled, { createGlobalStyle } from 'styled-components';
import { color } from './colors';
import { device } from './deviceSizes';

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Source Sans Pro', sans-serif;
 } 
`;

export const Page = styled.div`
  background-color: ${color.background};
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  padding-top: 100px;
  color: white;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  padding: 16px;
`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 50px;
  padding-left: 50px;

  @media ${device.tablet} {
    padding-right: 30px;
    padding-left: 30px;
  }
`;

export default GlobalStyle;
