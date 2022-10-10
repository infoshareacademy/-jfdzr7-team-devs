import { TextField } from "@mui/material";
import React from "react";
import { variantType } from "../../../utils/styles/muiStyles";

export const TextFieldMethods = ({ name, label, onChange, handlerMethods }) => {
  return (
    <TextField
      fullWidth
      required
      label={label}
      multiline
      variant={variantType.filled}
      name={name}
      onChange={(e) => {
        onChange(e);
        handlerMethods(e);
      }}
    />
  );
};
