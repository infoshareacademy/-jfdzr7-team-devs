import { Divider, ListItemText, Paper } from "@mui/material";
import { getDoc, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  bannerCollection,
  singleRecipeCollection,
} from "../../../../api/firebaseIndex";
import AddToBanner from "../../SingleRecipe/AddToBanner";
import AcceptItem from "./AcceptItem";

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
      </Divider>

      {datafromFirebase?.map((item) => (
        <>
          <AcceptItem item={item}>
            <AddToBanner id={item.id} />
          </AcceptItem>
        </>
      ))}
    </Paper>
  );
};

export default BannerList;
