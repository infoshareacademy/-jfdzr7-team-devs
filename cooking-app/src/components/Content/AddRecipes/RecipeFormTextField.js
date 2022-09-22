import { TextField } from "@mui/material";
import React from "react";
import { variantType } from "../../styles/muiStyles";

export const RecipeFormTextField = ({
  name,
  label,
  onChange,
  value,
  handlerIngredients,
}) => {
  return (
    <TextField
      sx={{ width: 640 }}
      label={label} //"Title"
      multiline
      variant={variantType.filled}
      name={name} //"name"
      // value={value}
      // onBlur={handlerIngredients}
      onChange={(e) => {
        onChange(e);
        handlerIngredients(e);
      }}
    />
  );
};
