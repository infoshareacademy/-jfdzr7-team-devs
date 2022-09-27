import { UserDataContext } from "../../../../App";
import { useContext } from "react";
import { ButtonGroup, Button } from "@mui/material";
import {
  StyledUserCover,
  StyledLayout,
  StyledUserPhoto,
  StyledAuthorName,
  StyledUserIntro,
  StyledAvatar,
  StyledContent,
  StyledUserData,
  StyledUserNavigation,
} from "./UserProfileStyled";

export const UserProfile = () => {
  const userData = useContext(UserDataContext);
  return (
    <>
      <StyledLayout>
        <StyledUserIntro>
          <StyledUserCover>
            <StyledAvatar
              alt={userData?.firstName}
              src={userData?.avatar}
              sx={{ width: 200, height: 200 }}
            />
          </StyledUserCover>
          <StyledUserData>
            <StyledUserPhoto />
            <StyledAuthorName>Ada Góra</StyledAuthorName>
          </StyledUserData>
        </StyledUserIntro>

        <StyledUserNavigation>
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Button>User Recipes</Button>
            <Button>Following</Button>
          </ButtonGroup>
        </StyledUserNavigation>

        <StyledContent></StyledContent>
      </StyledLayout>
    </>
  );
};
