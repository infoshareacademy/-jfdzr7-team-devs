import { Alert } from "@mui/material";

export const ErrorAccount = () => {
  return (
    <Alert severity="error" variant="outlined">
      <p> There is no Account </p>
    </Alert>
  );
};
