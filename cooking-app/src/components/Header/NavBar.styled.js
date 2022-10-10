import styled from "styled-components";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)`
margin: 16px 0;
  &.active {
    color: var(--color-orange);
  }
  &.hover {
    background-color: var(--color-orange);
  }
`;

