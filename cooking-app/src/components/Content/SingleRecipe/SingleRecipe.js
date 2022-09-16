import { PageTitle } from "../../styles/Global.styled";
import { useParams } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { recipesCollection } from "../../../api/firebaseIndex";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";
import { ERROR_MESSAGE } from "../../../utils/ErrorMessageTexts";
import Alert from "@mui/material/Alert";

export const SingleRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const idCurrent = useParams();

  useEffect(() => {
    onSnapshot(recipesCollection, (singleRecipe) => {
      setRecipes(getDataFromSnapshot(singleRecipe));
    });
  }, []);

  ///czy tutaj wydzielamy styl alertu na zewnatrz?
  const ErrorMessage = () => {
    return (
      <Alert severity="error" variant="outlined">
        {ERROR_MESSAGE.MISSING_WEBSITE}
      </Alert>
    );
  };

  const recipeFound = recipes.some((item) => {
    if (item.id === idCurrent.id) {
      return true;
    } else return false;
  });

  return (
    <>
      {!recipeFound ? (
        <ErrorMessage />
      ) : (
        recipes.map((recipe) => {
          if (recipe.id === idCurrent.id) {
            return (
              <div key={recipe.id}>
                <img src={recipe.url} alt={`${recipe.title}`} />
                <PageTitle>{recipe.title}</PageTitle>
                <p>
                  Categories:
                  {recipe.categories.map((category, index) => (
                    <li key={index}>{category}</li>
                  ))}
                </p>
                <p>Time: {recipe.time}</p>
                <p>Portions: {recipe.portion}</p>
                <p>Ingredients: {recipe.ingredients}</p>
                <p>How to prepare? {recipe.describe}</p>
              </div>
            );
          }
        })
      )}
    </>
  );
};
