import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../../App";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import {
  arrayRemove,
  arrayUnion,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  bannerArrayDocument,
  bannerCollection,
} from "../../../api/firebaseIndex";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";
import { IconButton } from "@mui/material";

const AddToBanner = ({ id }) => {
  const userData = useContext(UserDataContext);
  const docRef = bannerArrayDocument("bannerArrayDocument");

  const [bannerArray, setBannerArray] = useState([]);
  const [banner, setBanner] = useState(false);

  useEffect(() => {
    onSnapshot(bannerCollection, (snapshot) => {
      setBannerArray(getDataFromSnapshot(snapshot));
    });
  }, []);

  useEffect(() => {
    setBanner(
      bannerArray?.some((recipeId) => {
        return recipeId === id;
      })
    );
  }, [bannerArray]);

  const addToBanner = () => {
    updateDoc(docRef, {
      bannerArray: arrayUnion(id),
    })
      .then(() => {
        setBanner(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeFromBanner = () => {
    updateDoc(docRef, {
      bannerArray: arrayRemove(id),
    })
      .then(() => {
        setBanner(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange = (e) => {
    banner ? removeFromBanner() : addToBanner();
  };

  return (
    <IconButton
      style={{ height: "51px", alignSelf: "start", marginTop: "14px" }}
      onClick={handleChange}
    >
      {banner ? (
        <BookmarkAddedIcon color="neutral" fontSize="large" />
      ) : (
        <BookmarkBorderIcon color="neutral" fontSize="large" />
      )}
    </IconButton>
  );
};

export default AddToBanner;
