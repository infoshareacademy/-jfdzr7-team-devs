import styled from "styled-components";
import { Paper, Box } from "@mui/material";
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
  object-position: center;
`;

export const StyledDescription = styled(Paper)`
  padding: 55px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledDescriptionText = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

export const BannerTitle = styled(PageTitle)`
  font-size: 40px;
  padding: 0;
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
