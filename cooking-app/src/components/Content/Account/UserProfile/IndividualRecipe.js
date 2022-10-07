import React from "react";
import { NavLink } from "react-router-dom";
import { CardActionArea, Paper, Box, Card, Typography } from "@mui/material";
import styled from "styled-components";

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

        <StyledName>
          <Typography gutterBottom variant="h6" component="div">
            {singleRecipe.name}
          </Typography>
        </StyledName>
      </CardActionArea>
    </Card>
  );
};

const StyledName = styled(Box)`
  display: block;
  display: -webkit-box;
  max-width: 100%;
  height: 90px;
  padding: 20px 10px;
  margin: 0 auto;
  font-size: 20px;
  line-height: 1;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
