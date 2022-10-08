import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import { StyledButton } from "./NavBar.styled";


export const NavBar = ({ isLoggedIn }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{ bgcolor: "background.paper", mb: 5 }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  component={NavLink}
                  to="/"
                  sx={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Home
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  component={NavLink}
                  to="/ListRecipes"
                  sx={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Recipes
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <StyledButton
              component={NavLink}
              to="/"
              sx={{color:"primary.contrastText"}}
            >
              Home
            </StyledButton>
            <StyledButton
              component={NavLink}
              to="/ListRecipes"
              sx={{color:"primary.contrastText"}}
            >
              Recipes
            </StyledButton>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex" },
              flexGrow: 1,
              fontFamily: "Playfair Display",
              fontWeight: 700,
              fontSize: "25px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            CookBook
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <>
                <AccountMenu />
              </>
            ) : (
              <StyledButton
                component={NavLink}
                to="/login"
                sx={{color:"primary.contrastText"}}
              >
                Login
              </StyledButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
