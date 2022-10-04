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
      sx={{ width: 900 }}
      label={label} //"Title"
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
