import {
  StyledHeader,
  StyledHeaderContent,
  NavButton,
  NavButtonLogo,
} from "./Header.styled";
import { Container } from "../../utils/styles/Global.styled";
import { FaSearch } from "react-icons/fa";
import { MenuListDropdown } from "./MenuListDropdown";
import { useContext } from "react";
import AccountMenu from "./AccountMenu";

export const Header = ({ isLoggedIn }) => {
  return (
    <Container>
      <StyledHeader>
        <StyledHeaderContent>
          <MenuListDropdown />
        </StyledHeaderContent>
        <NavButtonLogo to="/">CookingApp</NavButtonLogo>
        <StyledHeaderContent>
          <NavButton to="/search">
            <FaSearch /> Search
          </NavButton>
          {isLoggedIn ? (
            <>
              <AccountMenu />
            </>
          ) : (
            <NavButton to="/login">Login</NavButton>
          )}
        </StyledHeaderContent>
      </StyledHeader>
    </Container>
  );
};
