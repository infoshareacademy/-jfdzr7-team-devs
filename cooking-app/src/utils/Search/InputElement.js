import React from "react";
import { Checkbox, Box } from "@mui/material";

export const InputElement = ({ tag, handleInput, isClicked }) => {
  return (
    <Box sx={{ whiteSpace: "nowrap" }}>
      <label htmlFor={tag}>{tag}</label>
      <Checkbox
        name={tag}
        type="checkbox"
        onChange={handleInput}
        sx={{ mr: 2 }}
        checked={isClicked}
        hidden
      />
    </Box>
  );
};
