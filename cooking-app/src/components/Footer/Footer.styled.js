import styled from "styled-components";
import { Box } from "@mui/material";

export const StyledFooter = styled.div`
  background-color: #1b1b1c;
  color: #989898;
  font-size: 0.9em;
  padding: 0 15px;
`;

export const StyledContact = styled(Box)`
  display: flex;
  align-items:center;
`;

export const StyledMessage = styled.h2`
  padding: 20px;
`;

export const StyledFooterContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  p {
    padding: 15px 0;
    border-top: 1px solid #252626;
    width: 100%;
    text-align: center;
  }
`;
