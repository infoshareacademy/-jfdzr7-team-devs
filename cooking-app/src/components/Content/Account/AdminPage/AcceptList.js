import { Badge, Divider, ListItemText, Paper } from "@mui/material";
import { onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { recipesCollection } from "../../../../api/firebaseIndex";
import { getDataFromSnapshot } from "../../../../utils/GetDataFromSnapshot";
import AcceptItem from "./AcceptItem";

const AcceptList = () => {
  const [datafromFirebase, setdatafromFirebase] = useState([]);

  useEffect(() => {
    const q = query(recipesCollection, where("isApproved", "==", false));
    onSnapshot(q, (snapshot) => {
      setdatafromFirebase(getDataFromSnapshot(snapshot));
    });
  }, []);

  return (
    <Paper
      sx={{
        pb: 2.5,
        px: 3,
        py: 2.5,
        my: 2,
      }}
    >
      <Divider textAlign="left">
        <Badge badgeContent={datafromFirebase.length} color="primary">
          <ListItemText
            primary="Waiting List"
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

      {datafromFirebase?.map((item) => (
        <AcceptItem item={item} />
      ))}
    </Paper>
  );
};

export default AcceptList;
