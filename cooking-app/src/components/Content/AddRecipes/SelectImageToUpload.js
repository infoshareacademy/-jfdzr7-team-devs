import * as React from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { useContext } from "react";
import { ImageUrlContext } from "./AddRecipeNew";
import { PhotoRequired } from "./RecipeHelper";

export const SelectImageToUpload = ({ onChange, onClick, text }) => {
  const imageUrl = useContext(ImageUrlContext);
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
            required
            hidden
            accept="image/*"
            type="file"
            name="file"
            onChange={onChange}
          />
          {imageUrl ? (
            <img
              src={imageUrl}
              style={{
                width: "120px",
                height: "120px",
                background: "pink",
                marginRight: "24px",
              }}
            ></img>
          ) : (
            <PhotoRequired />
          )}
          <PhotoCamera sx={{ fontSize: "24px" }} />
        </IconButton>
        <Button onClick={onClick} variant="contained">
          {text.buttonUpload} Upload photo
        </Button>
      </Stack>
    </>
  );
};
