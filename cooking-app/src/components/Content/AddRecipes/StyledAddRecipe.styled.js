import styled from "styled-components";
import { PageTitle } from "../../../utils/styles/Global.styled";

export const StyledPageTitle = styled(PageTitle)`
  text-align: center;
`;

export const StyledFormWrapper = styled.div`
  text-align: center;
  max-width: 80%;
  margin: auto;
  box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.5);

  @media screen and (max-width: 500px) {
    max-width: 98%;
    margin: auto;
  }
`;

export const StyledForm = styled.form`
  max-width: 80%;
  margin: auto;

  @media screen and (max-width: 500px) {
    max-width: 100%;
  }
`;
