import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardHeader, CardMedia } from "@mui/material";

export const IndividualRecipe = ({ singleRecipe }) => {
  return (
    <Card key={singleRecipe.id} sx={{ maxWidth: 345 }}>
      <NavLink to={`/recipe/${singleRecipe.id}`}>
        <CardHeader title={singleRecipe.name} />
        <CardMedia
          component="img"
          height="194"
          image={singleRecipe.image}
          alt={singleRecipe.imageAlt}
        />
      </NavLink>
    </Card>
  );
};
