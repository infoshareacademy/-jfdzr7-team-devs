import styled from "styled-components";
import Avatar from "@mui/material/Avatar";

export const StyledLayout = styled.div`
  background-color: lightsalmon;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledUserCover = styled.div`
  background-color: royalblue;
  height: 250px;
  width: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const StyledUserData = styled.div`
  background-color: lightgoldenrodyellow;
  display: flex;
  width: 100%;
  padding: 0 25px;
  align-items: center;
`;

export const StyledAvatar = styled(Avatar)`
  position: absolute;
  z-index: 1;
  bottom: -125px;
  margin-left: 80px;
`;

export const StyledUserPhoto = styled.div`
  background-color: lightpink;
  width: 200px;
  height: 100px;
  margin-left: 80px;
`;

export const StyledUserIntro = styled.div`
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  contain: content;
`;

export const StyledUserNavigation = styled.div`
  background-color: lightgrey;
  display: flex;
  height: 50px;
  width: 100%;
  border-radius: 16px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  contain: content;
  margin: 20px 0;
`;

export const StyledUserPanel = styled(StyledUserCover)`
  background-color: lightcoral;
  flex: 1;
`;

export const StyledContent = styled.div`
  background-color: lightgreen;
  width: 900px;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 auto;
`;

export const StyledUserInfo = styled.div`
  background-color: lightgoldenrodyellow;
  display: flex;
`;

export const StyledUserDetails = styled.div`
  background-color: lightgreen;
  flex: 1;
  display: flex;
  align-items: center;
  align-content: center;
  top: 50%;
`;

export const StyledAuthorName = styled.p`
  color: var(--color-black);
  font-weight: 500;
  margin: 0px 20px;
`;
