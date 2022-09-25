import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { PageTitle } from "../../../utils/styles/Global.styled";
import { Loader } from "../../../utils/Loader";
import { AddComment } from "./AddComment";
import { DisplayComments } from "./DisplayComments";
import { singleRecipeCollection } from "../../../api/firebaseIndex";
import {
  TextField,
  Snackbar,
  Alert,
  Button,
  IconButton,
  CardMedia,
  CardActionArea,
  Card,
  Box,
  Fab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  StyledImgMain,
  StyledCommentContainer,
  StyledRecipeContainer,
  StyledAsideRecipe,
  StyledMainContent,
  SubHeading,
  StyledTags,
  StyledRecipeDescription,
  StyledRecipeDetails,
  SubHeadingSmall,
  SubHeadingMedium,
  StyledParagraph,
  SubHeadingBig,
  StyledDetailedInfo,
  StyledNutritionsSection,
  StyledNutritionsList,
  StyledRecipeDescriptionQuote,
  StyledList,
  StyledNutritions,
  StyledListItemNumber,
  StyledListItem,
  StyledRecipeDescriptionDetails,
  StyledTagsDiet,
  
} from "./SingleRecipe.styled";
import styled from "styled-components";

export const DisplayRecipe = ({ isLoggedIn }) => {
  const [recipe, setRecipe] = useState({});
  const [load, setLoad] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const docRef = singleRecipeCollection(id);

    onSnapshot(docRef, (doc) => {
      setRecipe(doc.data(), doc.id);
      setLoad(true);
    });
  }, [id, load]);

  if (load === false) {
    return <Loader />;
  }

  return (
    <>
      <StyledRecipeContainer>
        <StyledAsideRecipe>
          <StyledImgMain src={recipe.image} alt={`${recipe.imageAlt}`} />
        </StyledAsideRecipe>

        <StyledMainContent>
          <PageTitle>{recipe.name}</PageTitle>
          <SubHeading>{recipe.subName}</SubHeading>
          <StyledRecipeDescription>
            {recipe.specialDiets
              ? recipe.specialDiets.map((specialDietItem, index) => (
                  <StyledTagsDiet key={index} to="/">
                    {specialDietItem}
                  </StyledTagsDiet>
                ))
              : null}
          </StyledRecipeDescription>

          <StyledRecipeDescriptionQuote>
            {recipe.description}
          </StyledRecipeDescriptionQuote>

          <StyledRecipeDescriptionDetails>
            <StyledRecipeDetails>
              <SubHeadingSmall>Serves</SubHeadingSmall>
              <StyledDetailedInfo>{recipe.servings} people</StyledDetailedInfo>
            </StyledRecipeDetails>
            <StyledRecipeDetails>
              <SubHeadingSmall>Cooks in</SubHeadingSmall>
              <StyledDetailedInfo>{recipe.time.total}</StyledDetailedInfo>
            </StyledRecipeDetails>
            <StyledRecipeDetails>
              <SubHeadingSmall>Difficulty</SubHeadingSmall>
              <StyledDetailedInfo>{recipe.difficulty}</StyledDetailedInfo>
            </StyledRecipeDetails>
          </StyledRecipeDescriptionDetails>

          <StyledRecipeDescription>
            {recipe.tags
              ? recipe.tags.map((tags, index) => (
                  <StyledTags key={index} to="/">
                    {tags}
                  </StyledTags>
                ))
              : null}
          </StyledRecipeDescription>
        </StyledMainContent>
      </StyledRecipeContainer>

      <StyledRecipeContainer>
        <StyledAsideRecipe>
          <SubHeadingBig>Ingredients</SubHeadingBig>

          {recipe.ingredients ? (recipe.ingredients.map((ingredients, index) =>
            (ingredients === ingredients.toUpperCase()) ? (
              <SubHeadingMedium key={index} to="/">
                {ingredients}
              </SubHeadingMedium>
            ) : ( 
              <StyledListItem key={index} to="/">
                {ingredients}
              </StyledListItem>
            )
          )) : <StyledParagraph>List is empty</StyledParagraph>}

        </StyledAsideRecipe>

        <StyledMainContent>
          <SubHeadingBig>Instructions</SubHeadingBig>
          <StyledList>
          {recipe.instructions
              ? 
              (recipe.instructions.map((instruction, index) => (
                 <StyledListItemNumber key={index} to="/">
                    {instruction}
                  </StyledListItemNumber>
                  
                )))
              : null}
              </StyledList>
        </StyledMainContent>
      </StyledRecipeContainer>




      <StyledCommentContainer>
        <SubHeadingBig>Comments</SubHeadingBig>
        {isLoggedIn ? (
          <p>
            To add comments, please <Link to="/login">Log in</Link>
          </p>
        ) : (
          <AddComment />
        )}
        <DisplayComments />
      </StyledCommentContainer>
    </>
  );
};

/*
<PageTitle>{recipe.title}</PageTitle>
<img src={recipe.url} alt={`${recipe.title}`} />
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
*/
