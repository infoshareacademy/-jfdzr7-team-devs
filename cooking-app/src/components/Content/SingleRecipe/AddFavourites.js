import { useContext, useState, useEffect } from "react";
import { UserDataContext } from "../../../App";
import { singleUserCollection } from "../../../api/firebaseIndex";
import {
  arrayUnion,
  onSnapshot,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const AddFavourites = ({ id }) => {
  const [user, setUser] = useState({});
  const userData = useContext(UserDataContext);
  const [saved, setSavedState] = useState(false);
  const userId = userData.uid;

  const docRef = singleUserCollection(userId);


  const handleSave = (e) => {
    e.preventDefault();
    if (saved) {
      updateDoc(docRef, {
        favourites: arrayUnion(id),
      })
        .then(() => {
          setSavedState(!saved);
        })
        .catch((e) => {
          console.log(e);
        });

      return console.log("saved");
    } else {
      updateDoc(docRef, {
        favourites: arrayRemove(id),
      })
        .then(() => {
          setSavedState(!saved);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <>
        <IconButton
          aria-label="favourites"
          style={{ height: "51px", alignSelf: "start", marginTop: "14px" }}
          onClick={handleSave}
        >
          {saved ? (
            <FavoriteBorderIcon color="neutral" fontSize="large" />
          ) : (
            <FavoriteIcon color="neutral" fontSize="large" />
          )}
        </IconButton>
    </>
  );
};
