import { Container } from "../../utils/styles/Global.styled";
import { StyledFooter, StyledFooterContent, StyledContact, StyledMessage } from "./Footer.styled";
import { SocialIcons} from "./SocialIcons";

export const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <StyledFooterContent>
          <StyledContact sx={{flexDirection: { xs: "column", sm: "row" }}}>
          <StyledMessage>Get in touch with us!</StyledMessage>
          <SocialIcons />
          </StyledContact>
          <p>Copyright &copy; {new Date().getFullYear()} Devs Project</p>
        </StyledFooterContent>
      </Container>
    </StyledFooter>
  );
};
