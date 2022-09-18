import { FaPinterest, FaFacebook, FaInstagram } from "react-icons/fa";
import SocialIcon from "./SocialIcon";
import { StyledSocialIcons } from "./SocialIcons.styled";

export const SocialIcons = () => {
  return (
    <StyledSocialIcons>
      <SocialIcon link="https://facebook.com" element={<FaFacebook />} />
      <SocialIcon link="https://instagram.com" element={<FaInstagram />} />
      <SocialIcon link="https://pinterest.com" element={<FaPinterest />} />
    </StyledSocialIcons>
  );
};
