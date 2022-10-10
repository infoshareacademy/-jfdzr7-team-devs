import styled from "styled-components";
import { PageTitle } from "../../../utils/styles/Global.styled";

export const StyledPageTitle = styled(PageTitle)`
  text-align: center;
`;

export const StyledFormWrapper = styled.div`
  text-align: center;
  max-width: 100%;
  margin: auto;
  box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.5);

  @media screen and (max-width: 500px) {
    max-width: 100%;
    margin: auto;
  }
`;

export const StyledForm = styled.form`
  padding-top: 20px;
  max-width: 80%;
  margin: auto;

  @media screen and (max-width: 500px) {
    max-width: 100%;
    padding-left: 2px;
    padding-right: 2px;
  }
`;
