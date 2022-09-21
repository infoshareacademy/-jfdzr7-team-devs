import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

export const SelectsBox = ({ onChange }) => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      gap={30}
      noValidate
      autoComplete="off"
    >
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="servings">Servings:</InputLabel>
        <Select
          labelId="servings"
          id="servings"
          name="servings"
          // value={age}
          onChange={onChange}
        >
          <MenuItem value={1}>1 portion</MenuItem>
          <MenuItem value={2}>2 portions</MenuItem>
          <MenuItem value={3}>3 portions</MenuItem>
          <MenuItem value={4}>4 portions</MenuItem>
          <MenuItem value={5}>5 portions</MenuItem>
          <MenuItem value={10}>10 portions</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="time">Time:</InputLabel>
        <Select
          labelId="time"
          id="time"
          name="time"
          // value={age}
          onChange={onChange}
        >
          <MenuItem value={20}>20 minutes</MenuItem>
          <MenuItem value={40}>40 minutes</MenuItem>
          <MenuItem value={60}>60 minutes</MenuItem>
          <MenuItem value={90}>90 minutes</MenuItem>
          <MenuItem value={120}>120 minutes</MenuItem>
          <MenuItem value={180}>180 minutes</MenuItem>
        </Select>
      </FormControl>

      {/* <TextField
        sx={{ width: 300 }}
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
      />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" /> */}
    </Box>
  );
};
