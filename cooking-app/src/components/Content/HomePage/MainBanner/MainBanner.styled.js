import styled from "styled-components";
import { Paper, Box } from "@mui/material";


export const StyledSlider = styled(Paper)`
  display: flex;
  height: 480px;
  contain: content;
`;

export const StyledDescription = styled(Paper)`
  padding: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color-main-light-gray);
`;


export const StyledNavigation = styled(Box)`
display: flex;
flex-direction: row;
justify-content: space-between;
z-index: 1;
top: 50%;
transform: translate(0, -50%);
position: absolute;
width: 100%;
padding: 10px;
`;
