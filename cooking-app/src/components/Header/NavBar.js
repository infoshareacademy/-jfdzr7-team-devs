import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import AccountMenu from "./AccountMenu";

export const NavBar = () => {
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
            <Button
              component={NavLink}
              to="/"
              sx={{
                my: 2,
                color: "primary.contrastText",
                display: "block",
                "&:hover": {
                  color: "primary.main",
                },
                "&:active": {
                  color: "primary.main",
                  fontWeight: 700,
                },
              }}
            >
              Home
            </Button>
            <Button
              component={NavLink}
              to="/ListRecipes"
              sx={{
                my: 2,
                color: "primary.contrastText",
                display: "block",
                "&:hover": {
                  color: "primary.main",
                },
                "&:active": {
                  color: "primary.main",
                  fontWeight: 700,
                },
              }}
            >
              Recipes
            </Button>
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
            <AccountMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
