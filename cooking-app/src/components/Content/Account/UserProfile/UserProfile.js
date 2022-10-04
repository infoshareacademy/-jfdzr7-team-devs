import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ButtonGroup, Button, Grid, Paper, Avatar } from "@mui/material";
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
  StyledTab,
} from "./UserProfileStyled";
import { singleUserCollection } from "../../../../api/firebaseIndex";
import { Loader } from "../../../../utils/Loader";
import { onSnapshot } from "firebase/firestore";
import { Outlet, NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { height } from "@mui/system";

export const UserProfile = () => {
  const [user, setUser] = useState({});
  const [load, setLoad] = useState(false);
  const [value, setValue] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const docRef = singleUserCollection(id);
    onSnapshot(docRef, (doc) => {
      setUser(doc.data(), doc.id);
      setLoad(true);
    });
  }, [id, load]);

  if (load === false) {
    return <Loader />;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <StyledLayout>
        <Paper elevation={3} sx={{minWidth:300}}>
          <StyledUserCover />

          <Box sx={{
                display: "flex",
                justifyContent: {xs:"center", md:"left"},
                ml: {md:"150px"},
                position: "relative",
                height: {xs:125, sm:180 },
              }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                zIndex:1,
                top: "-50px",
              }}
            >
              <Avatar
                alt={user.firstName}
                src={user.avatarUrl}
                sx={{ width: {xs:150, sm:200 }, height: "auto" }}
              />
              <StyledAuthorName>
                {user.firstName} {user.lastName}
              </StyledAuthorName>
            </Box>
          </Box>
        </Paper>


        <Box sx={{ width: "100%", my: 2 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <Tab label="User Recipes" component={NavLink} to="added"/>
            <Tab label="User Favourites" component={NavLink} to="following" />
          </Tabs>
        </Box>

        <StyledContent>
          <Outlet />
        </StyledContent>
      </StyledLayout>
    </>
  );
};

