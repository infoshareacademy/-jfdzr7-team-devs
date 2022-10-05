import React from "react";
import { NavLink } from "react-router-dom";
import { CardActionArea, Paper, Box, Card, Typography } from "@mui/material";

export const IndividualRecipe = ({ singleRecipe }) => {
  return (
    <Card
      key={singleRecipe.id}
      elevation={0}
      sx={{ height: { xs: "400px", sm: "500px", md: "350px" } }}
    >
      <CardActionArea
        sx={{
          width: "100%",
        }}
        component={NavLink}
        to={`/recipe/${singleRecipe.id}`}
      >
        <Paper
          sx={{
            height: { xs: "300px", sm: "400px", md: "250px" },
          }}
        >
          <img
            src={singleRecipe.image}
            alt={singleRecipe.name}
            style={{ width: "100%", objectFit: "cover", height: "100%" }}
          />
        </Paper>

        <Box
          sx={{
            p: 2,
            textOverflow: "ellipsis",
            overflow: "hidden",
            height: "100px",
            width: "100%",
            whiteSpace: "normal",
          }}
        >
          <Typography gutterBottom variant="h6" component="div">
            {singleRecipe.name}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};
