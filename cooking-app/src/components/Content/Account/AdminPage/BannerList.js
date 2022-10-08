import { Badge, Box, Divider, Grid, ListItemText, Paper } from "@mui/material";
import { getDoc, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  bannerCollection,
  singleRecipeCollection,
} from "../../../../api/firebaseIndex";
import { SingleCard } from "../../../../utils/SingleCard/SingleCard";


const BannerList = () => {
  const [datafromFirebase, setdatafromFirebase] = useState([]);

  useEffect(() => {
    const q = query(bannerCollection);

    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        setdatafromFirebase([]);
        doc.data().bannerArray.forEach((id) => {
          getDoc(singleRecipeCollection(id)).then((recipe) => {
            setdatafromFirebase((current) => [
              ...current,
              { ...recipe.data(), id: id },
            ]);
          });
        });
      });
    });
  }, []);

  return (
    <Paper
      sx={{
        px: 3,
        pt: 2.5,
        pb: 2.5,
        my: 2,
      }}
    >
      <Divider textAlign="left">
        <Badge badgeContent={datafromFirebase.length} color="primary">
          <ListItemText
            primary="Home Page Banner List"
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: "bold",
              lineHeight: "20px",
              mb: "2px",
            }}
            sx={{ my: 1 }}
          />
        </Badge>
      </Divider>

      <>
        <Grid container direction="column">
          {/*<SubTitle>{category}</SubTitle>*/}
          <Grid direction="row" container spacing={4}>
            {datafromFirebase.map((singleRecipe, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={6} lg={3}>
                  <SingleCard singleRecipe={singleRecipe} />
                </Grid>
              );
            })}
          </Grid>
          <Box textAlign="right" sx={{ my: 2 }}></Box>
        </Grid>
      </>
    </Paper>
  );
};

export default BannerList;
