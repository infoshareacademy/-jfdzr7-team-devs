import React from "react";
import { Checkbox, Box } from "@mui/material";

export const InputElement = ({ tag, handleInput, isClicked }) => {
  return (
    <Box sx={{whiteSpace:"nowrap" }}>
      <label htmlFor={tag}>{tag}</label>
      <Checkbox
        name={tag}
        type="checkbox"
        onChange={handleInput}
        sx={{ mr: 2 }}
        checked={isClicked}
      />
    </Box>
  );
};



// import * as React from 'react';
// import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';

// export default function ClickableAndDeletableChips() {
//   const handleClick = () => {
//     console.info('You clicked the Chip.');
//   };

//   const handleDelete = () => {
//     console.info('You clicked the delete icon.');
//   };

//   return (
//     <Stack direction="row" spacing={1}>
//       <Chip
//         label="Clickable Deletable"
//         onClick={handleClick}
//         onDelete={handleDelete}
//       />
//       <Chip
//         label="Clickable Deletable"
//         variant="outlined"
//         onClick={handleClick}
//         onDelete={handleDelete}
//       />
//     </Stack>
//   );
// }