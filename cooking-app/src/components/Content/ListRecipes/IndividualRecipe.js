import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardHeader, CardMedia } from "@mui/material";

export const IndividualRecipe = ({ singleRecipe }) => {
  return (
    <Card key={singleRecipe.id} sx={{ maxWidth: 345 }}>
      <NavLink to={`/recipe/${singleRecipe.id}`}>
        <CardHeader title={singleRecipe.title} subheader="data dodania?" />
        <CardMedia
          component="img"
          height="194"
          src={singleRecipe.url}
          alt={singleRecipe.title}
        />
      </NavLink>
    </Card>
  );
};
