import { TextField } from "@mui/material";
import React from "react";
import { variantType } from "../../../utils/styles/muiStyles";

export const RecipeFormTextField = ({ name, label, onChange, placeholder }) => {
  return (
    <TextField
      placeholder={placeholder ? placeholder : null}
      fullWidth
      label={label}
      multiline
      required
      inputProps={{ maxLength: 500 }}
      variant={variantType.filled}
      name={name}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
};
