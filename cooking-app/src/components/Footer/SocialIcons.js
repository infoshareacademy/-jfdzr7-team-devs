import { FaPinterest, FaFacebook, FaInstagram } from "react-icons/fa";
import SocialIcon from "./SocialIcon";
import { StyledSocialIcons } from "./SocialIcons.styled";

export const SocialIcons = () => {
  return (
    <StyledSocialIcons>
      <SocialIcon
        link="https://github.com/suff42"
        url="https://avatars.githubusercontent.com/u/43515005?v=4"
      />
      <SocialIcon
        link="https://github.com/magdalena-rozalewicz"
        url="https://avatars.githubusercontent.com/u/100789535?v=4"
      />
      <SocialIcon
        link="https://github.com/agatagree"
        url="https://avatars.githubusercontent.com/u/98839155?v=4"
      />
        <SocialIcon
        link="https://github.com/marcinel123"
        url="https://avatars.githubusercontent.com/u/95523781?v=4"
      />
    </StyledSocialIcons>
  );
};
