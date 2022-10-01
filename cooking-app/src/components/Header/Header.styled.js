import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

export const StyledHeader = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 25px;
  margin-bottom: 40px;
`;

export const StyledHeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

export const NavButton = styled(NavLink)`
  color: #585757;
  text-transform: uppercase;
  padding: 6px 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  outline: none;

  &:hover {
    color: #fab01f;
  }
`;

export const NavButtonLogo = styled(NavButton)`
  color: #000;
  font-size: 20px;
  text-transform: none;
`;

export const NavIcon = styled.a`
  color: #585757;
  padding: 6px 6px;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    color: #fab01f;
  }
`;

export const MenuLink = styled(Link)`
  color: #585757;
  text-transform: uppercase;
  padding: 6px 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  outline: none;

  &:hover {
    color: #fab01f;
  }
`;
