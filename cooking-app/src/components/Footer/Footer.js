import { Container } from "../styles/Global.styled";
import { StyledFooter, StyledFooterContent } from "./Footer.styled";
import { SocialIcons } from "./SocialIcons";

export const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <StyledFooterContent>
          <h2>Check us here!</h2>
          <SocialIcons />
          <p>Copyright &copy; {new Date().getFullYear()} Devs Project</p>
        </StyledFooterContent>
      </Container>
    </StyledFooter>
  );
};
