import { useState, useEffect, createContext } from "react";
import { useParams, Outlet, NavLink } from "react-router-dom";
import { Paper, Avatar, Box, Tabs, Tab } from "@mui/material";
import {
  StyledUserCover,
  StyledLayout,
  StyledAuthorName,
} from "./UserProfileStyled";
import { singleUserCollection } from "../../../../api/firebaseIndex";
import { Loader } from "../../../../utils/Loader";
import { onSnapshot } from "firebase/firestore";

export const UserProfileContext = createContext({
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  uid: "",
  favourites: [],
  avatarUrl: "",
});

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
        <Paper elevation={3} sx={{ minWidth: 300 }}>
          <StyledUserCover />
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "left" },
              ml: { xs:"20px", md: "150px" },
              position: "relative",
              height: { xs: 125, sm: 180 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                zIndex: 1,
                top: "-50px",
              }}
            >
              <Avatar
                alt={user.firstName}
                src={user.avatarUrl}
                sx={{ width: { xs: 150, sm: 200 }, height: "auto" }}
              />
              <StyledAuthorName>
                {user.firstName} {user.lastName}
              </StyledAuthorName>
            </Box>
          </Box>
        </Paper>

        <UserProfileContext.Provider value={user}>
          <Box sx={{ width: "100%", my: 2 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <Tab label="User Recipes" component={NavLink} to="added" />
              <Tab label="User Favourites" component={NavLink} to="following" />
            </Tabs>
          </Box>

          <Box>
            <Outlet />
          </Box>
        </UserProfileContext.Provider>
      </StyledLayout>
    </>
  );
};
