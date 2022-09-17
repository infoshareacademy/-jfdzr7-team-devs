import { StyledInputFile } from "./SelectImageUpload.styled";
import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

export const SelectImageToUpload = ({ onChange, onClick, text }) => {
  return (
    <>
      <h3> {text.headerUpload}</h3>
      {/* <label htmlFor="file" style={{ background: "grey", padding: "5px 10px" }} >Select file...</label>
            <StyledInputFile
                id="file"
                name="file"
                type="file"
                onChange={onChange}
            // style={{ visibility: "hidden" }}
            /> */}

      <Stack direction="row" alignItems="center" spacing={2}>
        {/* <Button variant="contained" component="label">
                        Upload Photo
                        <input hidden accept="image/*" multiple type="file" />
                    </Button> */}
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

// export default function UploadButtons() {
//   return (
//     <Stack direction="row" alignItems="center" spacing={2}>
//       <Button variant="contained" component="label">
//         Upload Photo
//         <input hidden accept="image/*" multiple type="file" />
//       </Button>
//       <IconButton color="primary" aria-label="upload picture" component="label">
//         <input hidden accept="image/*" type="file" />
//         <PhotoCamera />
//       </IconButton>
//     </Stack>
//   );
// }
