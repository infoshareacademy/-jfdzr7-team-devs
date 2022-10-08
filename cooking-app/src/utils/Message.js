import { Box } from "@mui/material";

export const ErrorMessage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src="https://img.freepik.com/free-vector/404-error-with-people-holding-numbers-concept-illustration_114360-7923.jpg?w=1380&t=st=1665224274~exp=1665224874~hmac=db5fe31f7084430b55e8111f96b036783c095d2b1e6516efd81e28c289f105c7"
        alt="error404"
        style={{ width: "60%", objectFit: "cover", height: "auto" }}
      />
    </Box>
  );
};

