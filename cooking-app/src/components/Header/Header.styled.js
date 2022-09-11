import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const StyledHeader = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 20px 0 20px 0;
`;

export const StyledHeaderContent = styled.div`
  display: flex;
`;

export const NavButton = styled(NavLink)`
  color:#585757;
  text-transform: uppercase;
  padding: 6px 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9em;

  &:hover {
    color: #fab01f;
  }
`;

export const NavButtonLogo = styled(NavButton)`
  color: #000;
  font-size: 1.25em;
  text-transform: none;
`;

export const NavIcon = styled.a`
  color:#585757;
  padding: 6px 6px;
  text-decoration: none;
  font-size: 0.9em;

  &:hover {
    color: #fab01f;
  }
`;

export const NavText = styled.p`
  color:#585757;
  text-transform: uppercase;
  padding: 6px 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9em;
  cursor: pointer;
  margin: 0;

  &:hover {
    color: #fab01f;
  }
`;