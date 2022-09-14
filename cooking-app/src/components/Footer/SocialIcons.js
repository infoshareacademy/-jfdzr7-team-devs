import { FaPinterest, FaFacebook, FaInstagram } from "react-icons/fa";
import { StyledSocialIcons } from "./SocialIcons.styled";

export const SocialIcons = () => {
  return (
    <StyledSocialIcons>
      <li>
        <a href="https://facebook.com">
          <FaFacebook />
        </a>
      </li>
      <li>
        <a href="https://instagram.com">
          <FaInstagram />
        </a>
      </li>
      <li>
        <a href="https://pinterest.com">
          <FaPinterest />
        </a>
      </li>
    </StyledSocialIcons>
  );
};
