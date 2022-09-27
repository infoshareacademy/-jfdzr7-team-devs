import {
  StyledHeader,
  StyledHeaderContent,
  NavButton,
  NavButtonLogo,
  NavIcon,
} from "./Header.styled";
import { Container } from "../../utils/styles/Global.styled";
import { FaSearch } from "react-icons/fa";
import { MenuListDropdown } from "./MenuListDropdown";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../api/firebase";

export const Header = ({ isLoggedIn }) => {
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
              <NavButton to="/account">My Account</NavButton>
              <Button variant="text" onClick={() => signOut(auth)}>
                Log out
              </Button>
            </>
          ) : (
            <NavButton to="/login">Login</NavButton>
          )}
        </StyledHeaderContent>
      </StyledHeader>
    </Container>
  );
};
