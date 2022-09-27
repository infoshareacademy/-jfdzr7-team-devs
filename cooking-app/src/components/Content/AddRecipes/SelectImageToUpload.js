import * as React from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

export const SelectImageToUpload = ({ onChange, onClick, text }) => {
  return (
    <>
      <h3> {text.headerUpload}</h3>
      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          size="large"
        >
          <input
            hidden
            accept="image/*"
            type="file"
            name="file"
            onChange={onChange}
          />
          <PhotoCamera />
        </IconButton>
        <button onClick={onClick}>{text.buttonUpload}</button>
      </Stack>
    </>
  );
};
