import { TextField } from "@mui/material";
import React from "react";
import { variantType } from "../../../utils/styles/muiStyles";

export const TextFieldIngredients = ({
  name,
  label,
  onChange,
  handlerIngredients,
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      required
      multiline
      variant={variantType.filled}
      name={name} //"name"
      // value={value}
      onChange={(e) => {
        onChange(e);
        handlerIngredients(e);
      }}
    />
  );
};
