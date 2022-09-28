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
import { UserDataContext } from "../../App";
import AccountMenu from "./AccountMenu";

export const Header = ({ isLoggedIn }) => {
  const userData = useContext(UserDataContext);

  return (
    <Container>
      <StyledHeader>
        <StyledHeaderContent>
          <MenuListDropdown />
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
