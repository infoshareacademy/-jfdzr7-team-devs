import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { recipesCollection } from "../../../api/firebaseIndex";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";
import { IndividualRecipe } from "../Account/UserProfile/IndividualRecipe";
import { Button, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { SubTitle } from "../../../utils/styles/Global.styled";

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
        <Grid key={index} item xs={12} sm={6} md={6} lg={3}>
          <IndividualRecipe singleRecipe={singleRecipe} />
        </Grid>
      );
    });

  return (
    <>
      <Grid container direction="column">
        <SubTitle>{category}</SubTitle>
        <Grid direction="row" container spacing={4}>
          {listofRecipe2}
        </Grid>
        <Box textAlign="right" sx={{ my: 2 }}>
          <Button
            variant="contained"
            component={Link}
            to={`/ListRecipes/${category}`}
          >
            more {category}
          </Button>
        </Box>
      </Grid>
    </>
  );
};
