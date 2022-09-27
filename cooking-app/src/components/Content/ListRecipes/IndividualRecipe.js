import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardHeader, CardMedia } from "@mui/material";

export const IndividualRecipe = ({ singleRecipe }) => {
  return (
    <Card 
    key={singleRecipe.id} 
    sx={{ width: 270, height: 300, backgroundColor: "darkgray", display: "flex", justifyContent: "center"}}>
      <NavLink sx={{textDecoration: "none"}} to={`/recipe/${singleRecipe.id}`}>
        <CardHeader sx={{fontSize: 39, color: "white" }} title={singleRecipe.name} />
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
