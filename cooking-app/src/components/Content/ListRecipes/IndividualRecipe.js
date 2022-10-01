import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardHeader, CardMedia } from "@mui/material";

export const IndividualRecipe = ({ singleRecipe }) => {
  return (
    <Card
      key={singleRecipe.id}
      sx={{
        width: 280,
        height: 300,
        backgroundColor: "darkgray",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <NavLink style={{textDecoration: 'none'}}
        to={`/recipe/${singleRecipe.id}`}
      >
        <CardMedia
          sx={{ width: 280, height: 250, borderRadius: 2 }}
          component="img"
          src={singleRecipe.image}
          alt={singleRecipe.imageAlt}
        />
        <CardHeader
          titleTypographyProps={{
            variant: "h6",
            align: "center",
            color: "white",
            fontFamily: "Montserrat"
          }}
          title={singleRecipe.name}
        />
      </NavLink>
    </Card>
  );
};
