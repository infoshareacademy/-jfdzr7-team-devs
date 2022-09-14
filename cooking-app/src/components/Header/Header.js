import {
  StyledHeader,
  StyledHeaderContent,
  NavButton,
  NavButtonLogo,
  NavIcon,
} from "./Header.styled";
import { Container } from "../styles/Global.styled";
import { FaSearch } from "react-icons/fa";
import { FaPinterest, FaFacebook, FaInstagram } from "react-icons/fa";
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
          <NavButton to="/tips">Tips</NavButton>
          <NavButton to="/ebook">EBook</NavButton>
        </StyledHeaderContent>
        <NavButtonLogo to="/">CookingApp</NavButtonLogo>
        <StyledHeaderContent>
          <NavButton to="/search">
            <FaSearch /> Search
          </NavButton>
          {!isLoggedIn ? null : <NavButton to="/account">My Account</NavButton>}
          {!isLoggedIn ? (
            <NavButton to="/login">Login</NavButton>
          ) : (
            <Button variant="text" onClick={() => signOut(auth)}>
              Log out
            </Button>
          )}
        </StyledHeaderContent>
      </StyledHeader>
    </Container>
  );
};
