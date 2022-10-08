import styled from "styled-components";
import { Box } from "@mui/material";

export const StyledFooter = styled.div`
  background-color: #1b1b1c;
  color: #989898;
  font-size: 0.9em;
  padding: 0 10px;
`;

export const StyledContact = styled(Box)`
  display: flex;
  align-items: center;
`;

export const StyledMessage = styled.h3`
  padding: 10px;
  margin: 0;
  white-space: nowrap;
  font-weight:400;
`;

export const StyledFooterContent = styled(Box)`
  display: flex;
  align-items: center;
  padding: 15px 0;
  justify-content: space-between;
`;

export const StyledCopyRight = styled.h3`
  /* border-top: 1px solid #252626; */
  width: 100%;
  text-align: center;
  margin: 0;
  background-color: "lightgreen";
  padding: 10px;
  font-weight:400;
`;
