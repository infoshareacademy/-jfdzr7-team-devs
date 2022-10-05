import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export const SelectsBox = ({ onChange }) => {
  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        gap={30}
        noValidate
        autoComplete="off"
      >
        <FormControl required variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="servings">Servings:</InputLabel>
          <Select
            labelId="servings"
            id="servings"
            name="servings"
            // velue=""
            onChange={onChange}
          >
            <MenuItem value={""}>
              <em></em>
            </MenuItem>
            <MenuItem value={1}>1 portion</MenuItem>
            <MenuItem value={2}>2 portions</MenuItem>
            <MenuItem value={4}>4 portions</MenuItem>
            <MenuItem value={6}>more than 5 portions</MenuItem>
          </Select>
        </FormControl>

        <FormControl required variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="time">Total Time:</InputLabel>
          <Select
            labelId="time"
            id="time"
            name="time"
            // value=""
            onChange={onChange}
          >
            <MenuItem value={""}>
              <em></em>
            </MenuItem>
            <MenuItem value={30}>30 minutes</MenuItem>
            <MenuItem value={60}>60 minutes</MenuItem>
            <MenuItem value={90}>90 minutes</MenuItem>
            <MenuItem value={120}>120 minutes</MenuItem>
            <MenuItem value={181}> more than 180 minutes</MenuItem>
          </Select>
        </FormControl>

        <FormControl required variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="difficulty">Difficulty:</InputLabel>
          <Select
            labelId="difficulty"
            id="difficulty"
            name="difficulty"
            // value=""
            onChange={onChange}
          >
            <MenuItem value={""}>
              <em></em>
            </MenuItem>
            <MenuItem value={"Super easy"}>Super easy</MenuItem>
            <MenuItem value={"Not too tricky"}>Not too tricky</MenuItem>
            <MenuItem value={"Showing off"}>Showing off</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

//required
