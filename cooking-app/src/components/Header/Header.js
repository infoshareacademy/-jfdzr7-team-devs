import {
  StyledHeader,
  StyledHeaderContent,
  NavButton,
  NavButtonLogo,
  NavIcon,
} from "./Header.styled";
import { Container } from "../styles/Global.styled";
import { FaSearch } from "react-icons/fa";
import { MenuListDropdown } from "./MenuListDropdown";
import { Avatar, Button, IconButton } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../api/firebase";
import { useContext } from "react";
import { UserDataContext } from "../../App";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountMenu from "./AccountMenu";

export const Header = ({ isLoggedIn }) => {
  const userData = useContext(UserDataContext);

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
