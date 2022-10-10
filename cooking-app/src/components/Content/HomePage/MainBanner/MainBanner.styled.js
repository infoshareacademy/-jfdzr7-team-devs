import styled from "styled-components";
import { Paper, Box, Typography } from "@mui/material";
import { PageTitle } from "../../../../utils/styles/Global.styled";

export const StyledSlider = styled(Paper)`
  display: flex;
  contain: content;
  min-width: 250px;
`;

export const StyledImg = styled.img`
  width: 100%;
  object-fit: cover;
  height: 100%;
  object-position: cover;
`;

export const StyledDescription = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledDescriptionText = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledText = styled(Box)`
  flex: 1;
  overflow: hidden;
`;

export const StyledNavigation = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 1;
  bottom: 12px;
  position: absolute;
  width: 100%;
  padding: 5px;

`;
