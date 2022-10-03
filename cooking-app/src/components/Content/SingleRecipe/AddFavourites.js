import { useContext, useState, useEffect } from "react";
import { UserDataContext } from "../../../App";
import { singleUserCollection } from "../../../api/firebaseIndex";
import { arrayUnion, updateDoc, arrayRemove } from "firebase/firestore";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const AddFavourites = ({ id }) => {
  const userData = useContext(UserDataContext);
  const docRef = singleUserCollection(userData.uid);

  const [favourite, setFavourite] = useState(true);

  useEffect(() => {
    const isChecked = userData.favourites.some((recipeId) => {
      return recipeId === id;
    });

    if (isChecked) {
      setFavourite(true);
    } else {
      setFavourite(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (!favourite) {
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
        style={{ height: "51px" }}
        onClick={handleChange}
      >
        {favourite ? (
          <FavoriteIcon color="neutral" fontSize="large" />
        ) : (
          <FavoriteBorderIcon color="neutral" fontSize="large" />
        )}
      </IconButton>
    </>
  );
};
