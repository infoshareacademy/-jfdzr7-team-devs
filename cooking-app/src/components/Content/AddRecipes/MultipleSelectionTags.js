import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { SelectedDietContext, SelectedTagsContext } from "./AddRecipeNew";
import { tags, specialDiets } from "../../../api/firebaseIndex";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const tags = ["Sweet", "Dinner", "Dessert", "Lunch", "Salt"];
// const specialDiets = ["Dairy-free", "Vegetarian", "Gluten-free"];

function getStyles(tag, selectedTags, theme) {
  return {
    fontWeight:
      selectedTags.indexOf(tag) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function MultipleSelectTags({ handlerTags, handlerDiet, onChange }) {
  const selectedTags = React.useContext(SelectedTagsContext);
  const selectedDiet = React.useContext(SelectedDietContext);

  // console.log(selectedTags);
  const theme = useTheme();
  return (
    <div>
      <FormControl required sx={{ m: 1, width: 300 }}>
        <InputLabel id="tags">Categories</InputLabel>
        <Select
          name="tags"
          labelId="tags"
          id="tags"
          multiple
          value={selectedTags}
          onChange={(e) => {
            handlerTags(e);
            onChange(e);
          }}
          input={<OutlinedInput id="tags" label="Categories" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {tags.map((tag, index) => (
            <MenuItem
              key={index}
              value={tag}
              style={getStyles(tag, selectedTags, theme)}
            >
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required sx={{ m: 1, width: 300 }}>
        <InputLabel id="specialDiets">Special Diets</InputLabel>
        <Select
          name="specialDiets"
          labelId="specialDiets"
          id="specialDiets"
          multiple
          value={selectedDiet}
          onChange={(e) => {
            handlerDiet(e);
            onChange(e);
          }}
          input={<OutlinedInput id="specialDiets" label="specialDiets" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {specialDiets.map((tag, index) => (
            <MenuItem
              key={index}
              value={tag}
              style={getStyles(tag, selectedDiet, theme)}
            >
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
