import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useContext } from "react";
import { UserDataContext } from "../../App";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { LibraryAdd, Logout, Settings } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "../../api/firebase";
import { NavLink } from "react-router-dom";
import { CustomAvatar } from "./CustomAvatar";

const AccountMenu = () => {
  const userData = useContext(UserDataContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    signOut(auth);
  };
  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {/*<Avatar alt={userData?.firstName} src={userData?.avatarUrl} />*/}
          <CustomAvatar />
          <KeyboardArrowDownIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={NavLink} to={`/user/${userData?.uid}/added`}>
          <CustomAvatar /> Profile
        </MenuItem>

        {userData?.role === "admin" ? (
          <MenuItem component={NavLink} to="/admin">
            <Avatar /> Admin panel
          </MenuItem>
        ) : null}

        <Divider />

        <MenuItem component={NavLink} to="/account">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem component={NavLink} to="/addRecipe">
          <ListItemIcon>
            <LibraryAdd fontSize="small" />
          </ListItemIcon>
          Add Recipe
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Log out
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
