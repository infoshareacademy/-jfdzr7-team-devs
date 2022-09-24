import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  :root {
    --color-little-light-gray: #ffffff;
    --color-main-light-gray: #fafafa;
    --color-light-gray: #c7c7c7;
    --color-gray: #757575;
    --color-orange:  #f9c02d;
    --color-orange-dark:  #c29000;
    --font-family: 'Roboto', sans-serif;
  }

  body{
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }`;

export const Wrapper = styled.div`
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  max-width: 100%;
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const PageTitle = styled.h1`
  margin: 33px 0 33px;
  font-size: 30px;
  line-height: 34px;
  font-weight: 500;
`;

export const StyledTitle = styled.h2`
  margin: 0px 0 20px;
  font-size: 38px;
  font-weight: 600;
  color: #fff;
`;

export const StyledLink = styled(Link)`
  color: var(-color-little-light-gray);
  background-color: var(--color-orange);
  text-transform: uppercase;
  padding: 16px 26px;
  display: block;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: 0.3s;
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  border-radius: 0.1rem;
  width: fit-content;

  &:hover {
    background-color: var(#c29000);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }

  &:active {
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    transform: translateY(0);
  }
`;

