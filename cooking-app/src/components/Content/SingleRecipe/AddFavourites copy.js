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
  const userData = useContext(UserDataContext);
  // const userId = userData.uid;
  const docRef = singleUserCollection(userData.uid);

  const [favourite, setFavourite] = useState(true)


  // const isSaved = userData.favourites.some((recipeId) => {
  //   if (recipeId === id) {
  //     return true;
  //   } else return false;
  // });


  // let isSaved = userData.favourites.some((recipeId) => {
  //   if (recipeId === id) {
  //     return true;
  //   } else return false;
  // });
useEffect(() => {
  console.log(userData.favourites)
})
  

  const handleSave = (e) => {
    e.preventDefault();
    if (favourite) {
      updateDoc(docRef, {
        favourites: arrayUnion(id),
      })
        .then(() => {
          setFavourite(!favourite);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(docRef, {
        favourites: arrayRemove(id),
      })
        .then(() => {
          setFavourite(!favourite);
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
        {!favourite ? (
          <FavoriteIcon color="neutral" fontSize="large" />
          
        ) : (
          <FavoriteBorderIcon color="neutral" fontSize="large" />
        )}
      </IconButton>
    </>
  );
};
