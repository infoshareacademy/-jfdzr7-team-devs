import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { onSnapshot } from "firebase/firestore";
import { PageTitle } from "../../../utils/styles/Global.styled";
import { Loader } from "../../../utils/Loader";
import { AddComment } from "./AddComment";
import { DisplayComments } from "./DisplayComments";
import { singleRecipeCollection } from "../../../api/firebaseIndex";
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
  StyledRecipeDescriptionQuote,
  StyledList,
  StyledListItemNumber,
  StyledListItem,
  StyledRecipeDescriptionDetails,
  StyledTagsDiet,
  StyledRecipeHeader,
} from "./SingleRecipe.styled";
import { GetAuthor } from "./GetAuthor";
import { UserDataContext } from "../../../App";
import { AddFavourites } from "./AddFavourites";
import AddToBanner from "./AddToBanner";
import { Box, Paper, Typography, Grid, Item, Button } from "@mui/material";

export const DisplayRecipe = ({ isLoggedIn }) => {
  const [recipe, setRecipe] = useState({});
  const [load, setLoad] = useState(false);
  const userData = useContext(UserDataContext);
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5}>
          <Grid xs={12} md={5} item={true}>
            <Box>
              <StyledImgMain src={recipe.image} alt={recipe.name} />
            </Box>
          </Grid>

          <Grid xs={12} md={7} item={true}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flexGrow: 1 }}>
                <PageTitle>{recipe.name}</PageTitle>
              </Box>
              <Box sx={{ display: "flex", backgroundColor: "lightgreen" }}>
                {userData ? <AddFavourites id={id} /> : null}
                {userData?.role === "admin" ? <AddToBanner id={id} /> : null}
              </Box>
            </Box>
            <GetAuthor userId={recipe.author} />
            <Box>
              <Typography variant="h6">{recipe.subName}</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", my: 2 }}>
                {recipe.specialDiets
                  ? recipe.specialDiets.map((specialDietItem, index) => (
                      <Button
                        sx={{ my: 1, mr: 2 }}
                        variant="contained"
                        component={Link}
                        key={index}
                        to={`/ListRecipes/${recipe.specialDiets}`}
                      >
                        {specialDietItem}
                      </Button>
                    ))
                  : null}
              </Box>
              <Typography sx={{ my: 3 }}>{recipe.description}</Typography>
              <Box sx={{ display: "flex", my: 3 }}>
                <StyledRecipeDetails>
                  <Typography sx={{ fontWeight: "medium" }}>Serves</Typography>
                  <Typography variant="overline" sx={{ lineHeight: "normal" }}>
                    {recipe.servings} people
                  </Typography>
                </StyledRecipeDetails>
                <StyledRecipeDetails>
                  <Typography sx={{ fontWeight: "medium" }}>Time</Typography>
                  <Typography variant="overline" sx={{ lineHeight: "normal" }}>
                    {recipe.time.total}
                  </Typography>
                </StyledRecipeDetails>
                <StyledRecipeDetails>
                  <Typography sx={{ fontWeight: "medium" }}>
                    Difficulty
                  </Typography>
                  <Typography variant="overline" sx={{ lineHeight: "normal" }}>
                    {recipe.difficulty}
                  </Typography>
                </StyledRecipeDetails>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", my: 2 }}>
                {recipe.tags
                  ? recipe.tags.map((tags, index) => (
                      <Button
                        sx={{ my: 1, mr: 2 }}
                        variant="outlined"
                        component={Link}
                        key={index}
                        to={`/ListRecipes/${recipe.specialDiets}`}
                      >
                        {tags}
                      </Button>
                    ))
                  : null}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1, mt:5 }}>
        <Grid container spacing={3}>
          <Grid xs={12} md={5} item={true}>
            <Box>
              <PageTitle style={{ fontSize: "35px", padding: "20px 0 " }}>
                Ingredients
              </PageTitle>
              {recipe.ingredients ? (
                recipe.ingredients.map((ingredients, index) =>
                  ingredients === ingredients.toUpperCase() ? (
                    <SubHeadingMedium key={index} to="/">
                      {ingredients}
                    </SubHeadingMedium>
                  ) : (
                    <StyledListItem key={index} to="/">
                      {ingredients}
                    </StyledListItem>
                  )
                )
              ) : (
                <StyledParagraph>List is empty</StyledParagraph>
              )}
            </Box>
          </Grid>

          <Grid xs={12} md={7} item={true}>
            <Box>
              <PageTitle style={{ fontSize: "35px", padding: "20px 0 " }}>
                Instructions
              </PageTitle>

              <StyledList>
                {recipe.instructions
                  ? recipe.instructions.map((instruction, index) => (
                      <StyledListItemNumber key={index} to="/">
                        {instruction}
                      </StyledListItemNumber>
                    ))
                  : null}
              </StyledList>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 8 }}>
        <PageTitle style={{ fontSize: "35px", padding: "20px 0 " }}>
          Comments
        </PageTitle>
        {!userData ? (
          <Typography>
            To add comments, please <Link to="/login">Log in</Link>
          </Typography>
        ) : (
          <AddComment />
        )}
        <DisplayComments recipeName={recipe.name} />
      </Box>
    </>
  );
};
