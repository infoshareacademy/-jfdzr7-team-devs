import * as React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { NavButton } from "./Header.styled";
import { useState, useRef } from "react";

export const MenuListDropdown = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <NavButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onMouseEnter={handleToggle}
        to="/ListRecipes"
      >
        Recipes
      </NavButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        onMouseLeave={handleClose}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {
                    // te dropdown nie będzię wykorzystany w tym miejscu, chwilowo
                    // zawieszamy prace nad nim
                    /* <MenuLink to={`/ListRecipes/breakfast`} onClick={handleClose}>
                    Breakfast
                  </MenuLink>
                  <MenuLink to={`/ListRecipes/lunch`} onClick={handleClose}>
                    Lunch
                  </MenuLink>
                  <MenuLink to={`/ListRecipes/dinner`} onClick={handleClose}>
                    Dinner
                  </MenuLink>
                  <MenuLink to={`/ListRecipes/dessert`} onClick={handleClose}>
                    Dessert
                  </MenuLink> */
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
};
