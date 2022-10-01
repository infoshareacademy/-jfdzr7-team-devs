import { TextField } from "@mui/material";
import React from "react";
import { variantType } from "../../../utils/styles/muiStyles";

export const TextFieldMethods = ({
  name,
  label,
  onChange,
  value,
  handlerMethods,
}) => {
  return (
    <TextField
      sx={{ width: 900 }}
      label={label} //"Title"
      multiline
      variant={variantType.filled}
      name={name} //"name"
      // value={value}
      onChange={(e) => {
        onChange(e);
        handlerMethods(e);
      }}
    />
  );
};
