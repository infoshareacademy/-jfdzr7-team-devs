import React from "react";
import { NavLink } from "react-router-dom";
import { CardActionArea, Paper, Box, Card, Typography } from "@mui/material";
import styled from "styled-components";

export const SingleCard = ({ singleRecipe }) => {
  return (
    <Card
      key={singleRecipe.id}
      elevation={0}
      sx={{ height: { xs: "400px", sm: "500px", md: "350px" } }}
    >
      <StyledCard
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
          <StyledTitle gutterBottom variant="h6" component="div">
            {singleRecipe.name}
          </StyledTitle>
        </StyledName>
      </StyledCard>
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

const StyledTitle = styled(Typography)`
  &:hover {
    color: var(--color-orange);
  }
`;

const StyledCard = styled(CardActionArea)`
  &:hover {
    transition: 0.3s;
    background-color: white;
    width: 100%;
  }
`;
