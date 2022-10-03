import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardHeader, CardMedia } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Paper, Box } from "@mui/material";

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
        backgroundImage:`url(${singleRecipe.image})`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        }} />

        <Box
          sx={{
            p:2,
            textOverflow: "ellipsis",
            overflow:'hidden',
            height: "100px",
            width: "100%",
            whiteSpace:"normal"
          }}
        >
          <Typography gutterBottom variant="h6" component="div" >
            {singleRecipe.name}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>

    // <Card
    //   key={singleRecipe.id}
    //   sx={{
    //     width: 280,
    //     height: 300,
    //     backgroundColor: "darkgray",
    //     display: "flex",
    //     justifyContent: "center",
    //   }}
    // >
    //   <NavLink style={{textDecoration: 'none'}}
    //     to={`/recipe/${singleRecipe.id}`}
    //   >
    //     <CardMedia
    //       sx={{ width: 280, height: 250, borderRadius: 2 }}
    //       component="img"
    //       src={singleRecipe.image}
    //       alt={singleRecipe.imageAlt}
    //     />
    //     <CardHeader
    //       titleTypographyProps={{
    //         variant:"h5",
    //         color:"text.secondary"
    //       }}
    //       title={singleRecipe.name}
    //     />
    //   </NavLink>
    // </Card>
  );
};
