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

export const Header = () => {
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
          <NavButton to="/login">Login</NavButton>
          <NavIcon href="https://facebook.com">
            <FaFacebook />
          </NavIcon>
          <NavIcon href="https://instagram.com">
            <FaInstagram />
          </NavIcon>
          <NavIcon href="https://pinterest.com">
            <FaPinterest />
          </NavIcon>
        </StyledHeaderContent>
      </StyledHeader>
    </Container>
  );
};
