import styled from "styled-components";
import { Paper, Typography } from "@mui/material";

export const StyledLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledUserCover = styled(Paper)`
  background: linear-gradient(
    74deg,
    rgba(227, 227, 227, 1) 0%,
    rgba(191, 147, 49, 1) 96%
  );
  height: 250px;
  width: 100%;
  padding: 25px;
  min-width: 300px;
`;

export const StyledAuthorName = styled.h2`
  color: var(--color-black);
  font-weight: 500;
  margin: 0px 20px;
  
`;

export const StyledUserNavigation = styled.div`
  background-color: lightgrey;
  display: flex;
  height: 50px;
  width: 100%;
  border-radius: 16px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  contain: content;
  margin: 20px 0;
`;

export const StyledUserPanel = styled(StyledUserCover)`
  background-color: lightcoral;
  flex: 1;
`;

export const StyledContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 auto;
`;

export const StyledUserInfo = styled.div`
  background-color: lightgoldenrodyellow;
  display: flex;
`;

export const StyledUserDetails = styled.div`
  background-color: lightgreen;
  flex: 1;
  display: flex;
  align-items: center;
  align-content: center;
  top: 50%;
`;
