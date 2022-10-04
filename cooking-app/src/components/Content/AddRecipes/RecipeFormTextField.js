import { TextField } from "@mui/material";
import React from "react";
import { variantType } from "../../../utils/styles/muiStyles";

export const RecipeFormTextField = ({
  name,
  label,
  onChange,
  placeholder,
  value,
}) => {
  return (
    <TextField
      placeholder={placeholder ? placeholder : null}
      sx={{ width: 900 }}
      label={label} //"Title"
      multiline
      required
      inputProps={{ maxLength: 500 }}
      variant={variantType.filled}
      name={name} //"name"
      // value={value}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
};
