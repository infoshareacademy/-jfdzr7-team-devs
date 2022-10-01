import styled from "styled-components";

export const StyledSlider = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 480px;
  border-radius: 16px;
  margin: 25px;
  background-color: lightblue;
  contain: content;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`;

export const StyledBanner = styled.div`
  width: 60%;
  background-color: lightgreen;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;

export const StyledDescription = styled.div`
  padding: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  background-color: var(--color-main-light-gray);
`;

export const StyledTitle = styled.h2`
  margin: 0px 0 20px;
  font-size: 38px;
  font-weight: 600;
`;

export const StyledParagraph = styled.p`
  font-size: 18px;
`;

export const StyledNavigation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: auto;
  z-index: 1;
  padding: 25px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
`;
