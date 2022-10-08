import { Container } from "../../utils/styles/Global.styled";
import {
  StyledFooter,
  StyledFooterContent,
  StyledContact,
  StyledMessage,
  StyledCopyRight,
} from "./Footer.styled";
import { SocialIcons } from "./SocialIcons";

export const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <StyledFooterContent
          sx={{
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <div>
            <StyledCopyRight>
              Copyright &copy; {new Date().getFullYear()} Devs Project
            </StyledCopyRight>
          </div>
          <StyledContact
            sx={{
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <StyledMessage>Get in touch with us!</StyledMessage>
            <SocialIcons />
          </StyledContact>
        </StyledFooterContent>
      </Container>
    </StyledFooter>
  );
};
