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
import styled from "styled-components";
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

  return (
    <>
      {recipeFound ? (
        <StyledLayout>
          <RecipeWrapper>
            <StyledRecipeGallery />
            <StyledRecipeSection >
              <DisplayRecipe />
            </StyledRecipeSection>
          </RecipeWrapper>
        </StyledLayout>
      ) : (
        <ErrorMessage />
      )}
    </>
  );
};

const StyledLayout = styled.div`
  overflow: hidden;
  background: white;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
`;

const RecipeWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const StyledRecipeGallery = styled.div`
  flex: 1 0 50%;
  background: lightblue;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url("https://images.unsplash.com/photo-1627308594190-a057cd4bfac8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG9hdG1lYWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60")
`;

const StyledRecipeSection = styled.div`
  flex: 1 0 50%;
  overflow-y: auto;
  padding: 30px;
`;

const StyledCommentInput = styled.div`
width: 100%;
display: flex;
`;