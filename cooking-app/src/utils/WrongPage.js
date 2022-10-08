import React from "react";
import { Card, CardHeader, CardMedia } from "@mui/material";
import { Container } from "@mui/system";

export const WrongPage = () => {
  return (
      <Container
        sx={{
          m: 4,
          width: "auto",
          maxWidth: "auto",
          textAlign: "center",
        }}
      >
        <h1>Sorry Chef, there is nothing here!</h1>
        <iframe width="100%" src="https://embed.lottiefiles.com/animation/106560" style={{border: "none"}}></iframe>
      </Container>
  );
};
