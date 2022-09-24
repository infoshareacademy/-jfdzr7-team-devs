import { PageTitle } from "../../../utils/styles/Global.styled";
import { useParams, Link } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { recipesCollection } from "../../../api/firebaseIndex";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";
import { ERROR_MESSAGE } from "../../../utils/ErrorMessageTexts";
import { Alert } from "@mui/material";
import { Loader } from "../../../utils/Loader";
import { variantType } from "../../../utils/styles/muiStyles";
import { DisplayRecipe } from "./DisplayRecipe";

export const SingleRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [load, setLoad] = useState(false);
  const idCurrent = useParams();

  useEffect(() => {
    onSnapshot(recipesCollection, (singleRecipe) => {
      setRecipes(getDataFromSnapshot(singleRecipe));
      setLoad(true);
    });
  }, [load]);

  if (load === false) {
    return <Loader />;
  }

  const ErrorMessage = () => {
    return (
      <Alert severity="error" variant={variantType.outlined}>
        {ERROR_MESSAGE.MISSING_WEBSITE}
      </Alert>
    );
  };

  const recipeFound = recipes.some((item) => {
    if (item.id === idCurrent.id) {
      return true;
    } else return false;
  });

  return <>{recipeFound ? <DisplayRecipe /> : <ErrorMessage />}</>;
};