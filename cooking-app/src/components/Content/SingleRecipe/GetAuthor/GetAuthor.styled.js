import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";


export const StyledAuthorLink = styled(Link)`
  text-decoration: none;
  color: var(--color-black);

  &:hover {
    color: var(--color-orange);
  }
`;

export const StyledAuthorSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  margin-bottom: 20px;
`;

export const StyledAuthorContainer = styled.div`
  padding: 20px 0;
`;

export const StyledAvatar = styled(Avatar)`
  margin: 20px;
  margin-left: 0;
`;

export const StyledDate = styled.p`
  margin: 0;
  color: var(--color-light-gray);
`;