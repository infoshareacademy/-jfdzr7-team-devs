import { PageTitle } from "../../../utils/styles/Global.styled";
import { useParams, Link } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { recipesCollection } from "../../../api/firebaseIndex";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";
import { ERROR_MESSAGE } from "../../../utils/ErrorMessageTexts";
import { Alert } from "@mui/material";
import { AddComment } from "./AddComment";
import { Loader } from "../../../utils/Loader";
import { DisplayComments } from "./DisplayComments";
import { variantType } from "../../../utils/styles/muiStyles";
import { StyledRecipePage } from "./SingleRecipe.styled"
import styled from "styled-components";

export const SingleRecipe = ({ isLoggedIn }) => {
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

  return (
    <>
      {recipeFound ? (
        <div>
          <div>
            <div>
              {recipes.map((recipe) => {
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
              })}
            </div>
            <PageTitle>Comments</PageTitle>
            <div>
              {!isLoggedIn ? (
                <p>
                  To add comments, please <Link to="/login">Log in</Link>
                </p>
              ) : (
                <AddComment />
              )}
              <DisplayComments />
            </div>
          </div>
        </div>
      ): (
        <ErrorMessage />
      )}
    </>
  );
};
