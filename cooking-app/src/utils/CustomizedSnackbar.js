import { Alert, Snackbar } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const CustomizedSnackbar = ({
  showSnackbar,
  setShowSnackbar,
  errorData,
  severity,
}) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSnackbar(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {errorData}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomizedSnackbar;
