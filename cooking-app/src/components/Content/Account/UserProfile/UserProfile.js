import { useState, useEffect, createContext } from "react";
import { useParams, Outlet, NavLink } from "react-router-dom";
import { Paper, Avatar, Box, Tabs, Tab } from "@mui/material";
import {
  StyledAutorSection,
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
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "left" },
            alignItems: "center",
            height: { xs: 125, sm: 180 },
            backgroundColor: "secondary.main",
            p: 3,
            contain: "content",
            minWidth: "300px",
          }}
        >
            <Avatar
                  sx={{ height:"100%", width:{ xs: 77, sm: 132 }}}
              alt={user.firstName}
              src={user.avatarUrl}
            />
            <StyledAutorSection>
            <StyledAuthorName>
              {user.firstName} {user.lastName}
            </StyledAuthorName>
            </StyledAutorSection>
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
