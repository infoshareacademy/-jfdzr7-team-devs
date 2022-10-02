import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { recipesCollection } from "../../../api/firebaseIndex";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";
import { IndividualRecipe } from "../ListRecipes/IndividualRecipe";
import { Button, Paper, Grid } from "@mui/material";

import { NavLink } from "react-router-dom";

export const HomePageSection = ({ category }) => {
  const [datafromFirebase, setdatafromFirebase] = useState([]);

  useEffect(() => {
    onSnapshot(recipesCollection, (snapshot) => {
      setdatafromFirebase(getDataFromSnapshot(snapshot));
    });
  }, []);

  const listofRecipe2 = datafromFirebase
    .filter((item) => {
      if (item.tags?.includes(category)) {
        return item;
      }
    })
    .slice(0, 4)
    .map((singleRecipe, index) => {
      return (
        <Grid key={index} item>
          <IndividualRecipe singleRecipe={singleRecipe} />
        </Grid>
      );
    });

  return (
    <>
      <Grid container justifyContent="center" direction="column" alignItems="center" spacing={1}>
      <h3>Your best ever {category}!</h3>
        <Paper
          sx={{
            width: "auto",
            height: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr) 30px",
            gridTemplateRows: "minmax(100px, auto)",
            marginBottom: 4,
            boxShadow: 6,
          }}
          variant="outlined"
        >
            
          {listofRecipe2}
          <NavLink style={{ textDecoration: "none" }} to={`/ListRecipes/${category}`}>
            <Button sx={{ marginTop: "60px", height: 150, width: 30 }} variant="contained">
              Show More
            </Button>
          </NavLink>
        </Paper>
      </Grid>
    </>
  );
};
