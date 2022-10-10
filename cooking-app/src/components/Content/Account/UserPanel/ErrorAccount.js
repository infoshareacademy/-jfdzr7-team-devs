import { Alert } from "@mui/material";

export const ErrorAccount = () => {
  return (
    <Alert severity="error" variant="outlined">
      <p> There is no Account </p>
    </Alert>
  );
};

export const UpdateSuccess = () => {
  return (
    <Alert severity="success" variant="outlined">
      <p> Success ! Yor Profile Is Alraeady Updated !</p>
    </Alert>
  );
};
