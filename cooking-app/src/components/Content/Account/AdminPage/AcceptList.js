import {
  Dns,
  KeyboardArrowDown,
  People,
  PermMedia,
  Public,
} from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import React, { useState } from "react";

const data = [
  { icon: <People />, label: "Authentication" },
  { icon: <Dns />, label: "Database" },
  { icon: <PermMedia />, label: "Storage" },
  { icon: <Public />, label: "Hosting" },
];

const AcceptList = () => {
  const [open, setOpen] = useState(true);

  return (
    <Paper
      sx={{
        // bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
        pb: open ? 2 : 0,
      }}
    >
      <Paper variant="outlined" elevation={0}>
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setOpen(!open)}
          sx={{
            px: 3,
            pt: 2.5,
            pb: 2.5,
          }}
        >
          <ListItemText
            primary="Recipes to accept"
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px",
            }}
            sx={{ my: 0 }}
          />
          <KeyboardArrowDown
            sx={{
              mr: -1,
              transform: open ? "rotate(-180deg)" : "rotate(0)",
              transition: "0.2s",
            }}
          />
        </ListItemButton>
      </Paper>
      {open &&
        data.map((item) => (
          <ListItemButton key={item.label} sx={{ py: 0, minHeight: 32 }}>
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
            />
          </ListItemButton>
        ))}
    </Paper>
  );
};

export default AcceptList;
