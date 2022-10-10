import { onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { recipesCollection } from "../../../api/firebaseIndex";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";
import { SingleCard } from "../../../utils/SingleCard/SingleCard";
import { Button, Grid, Box, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const HomePageSection = ({ category }) => {
  const [datafromFirebase, setdatafromFirebase] = useState([]);

  useEffect(() => {
    const q = query(recipesCollection, where("isApproved", "==", true));
    onSnapshot(q, (snapshot) => {
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
          <SingleCard singleRecipe={singleRecipe} />
        </Grid>
      );
    });

  return (
    <>
      <Grid container direction="column">
        <Typography
          variant="styled"
          sx={{
            fontSize: { xs: "24px", sm: "30px" },
            my: 3,
          }}
        >
          {category}
        </Typography>
        <Grid direction="row" container spacing={4}>
          {listofRecipe2}
        </Grid>
        <Box textAlign="right" sx={{ mt: 1, mb: 3 }}>
          <Button
            variant="contained"
            component={Link}
            to={`/ListRecipes/${category}`}
          >
            more {category}
          </Button>
        </Box>
      </Grid>
      <Divider />
    </>
  );
};
