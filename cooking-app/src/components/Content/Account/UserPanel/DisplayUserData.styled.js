import styled from "styled-components";

export const StyledDispalyUserData = styled.div`
  @media screen and (max-width: 500px) {
    .paper {
      margin: 0px;
    }

    img {
      margin: 4px;
      margin-top: 0;
      margin-left: 0;
    }

    .new_avatar {
      display: flex;
      justify-content: center;
    }
  }
`;

export const StyledUserPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledUserPanelTitle = styled.h1`
  text-align: center;
  font-family: "Playfair Display", sans-serif;
  font-size: 48px;
  font-weight: 600;
  margin-top: 16px;
`;
