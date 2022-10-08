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
    --color-natural-gray: #ededed;
    --color-light-gray: #c7c7c7;
    --color-gray: #757575;
    --color-black: #000000;
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
  padding: 0 24px;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-family: "Playfair Display", serif;
  font-size: 45px;
  padding: 0 0 16px 0;
`;

export const SubTitle = styled(PageTitle)`
  font-size: 35px;
  padding: 20px 0;
`;

export const StyledTitle = styled.h2`
  margin: 0px 0 20px;
  font-size: 38px;
  font-weight: 600;
  color: #fff;
`;

export const StyledParagraph = styled.p`
  color: var(--color-light-gray);
  margin: 20px 0;
`;

export const StyledParagraphRegular = styled.p`
  margin: 20px 0;
  color: var(--color-black);
`;
export const StyledParagraphLow = styled(StyledParagraphRegular)`
  margin: 0;
`;

export const StyledLink = styled(Link)`
  color: var(-color-little-light-gray);
  background-color: var(--color-orange);
  text-transform: uppercase;
  padding: 6px 16px;
  display: block;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  vertical-align: middle;
  letter-spacing: 0.02857em;
  transition: 0.3s;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  border-radius: 4px;
  width: fit-content;
  min-width: 64px;

  &:hover {
    background-color: var(--color-orange-dark);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }

  &:active {
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    transform: translateY(0);
  }
`;
