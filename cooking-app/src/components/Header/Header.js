import {
  StyledHeader,
  StyledHeaderContent,
  NavButton,
  NavButtonLogo,
} from "./Header.styled";
import { Container } from "../styles/Global.styled";
import { FaSearch } from "react-icons/fa";
import { MenuListDropdown } from "./MenuListDropdown";
import AccountMenu from "./AccountMenu";

export const Header = ({ isLoggedIn }) => {
  return (
    <Container>
      <StyledHeader>
        <StyledHeaderContent>
          <MenuListDropdown />
          <NavButton to="/tips">Tips</NavButton>
          <NavButton to="/ebook">EBook</NavButton>
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
