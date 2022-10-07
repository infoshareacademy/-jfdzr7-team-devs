import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { onSnapshot } from "firebase/firestore";
import { SubTitle, PageTitle } from "../../../../utils/styles/Global.styled";
import { Loader } from "../../../../utils/Loader";
import { AddComment } from "../CommentSection/AddComment";
import { DisplayComments } from "../CommentSection/DisplayComments";
import { singleRecipeCollection } from "../../../../api/firebaseIndex";
import {
  StyledImgMain,
  StyledRecipeDetails,
  StyledList,
  StyledListItemNumber,
  StyledWrapper,
  StyledContainer,
  StyledAuthor,
  StyledSpecialTags,
  StyledTags,
  StyledQuote,
  StyledInfo,
  StyledDetailedInfo,
  StyledRecipeContent,
  StyledDetail,
} from "./DisplayRecipe.styled";
import { GetAuthor } from "../GetAuthor/GetAuthor";
import { UserDataContext } from "../../../../App";
import { AddFavourites } from "../AddFavourites";
import AddToBanner from "../AddToBanner";
import { Box, Typography, Grid, Checkbox } from "@mui/material";

export const DisplayRecipe = ({ isLoggedIn }) => {
  const [recipe, setRecipe] = useState({});
  const [load, setLoad] = useState(false);
  const [checked, setChecked] = useState([]);
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

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.name];
    } else {
      updatedList.splice(checked.indexOf(event.target.name), 1);
    }
    setChecked(updatedList);
  };

  const isChecked = (item) => (checked.includes(item) ? "yes" : "no");

  return (
    <>
      <StyledWrapper>
        <Grid container spacing={5}>
          <Grid xs={12} md={5} item={true}>
            <Box>
              <StyledImgMain src={recipe.image} alt={recipe.name} />
            </Box>
          </Grid>

          <Grid xs={12} md={7} item={true}>
            <StyledContainer>
              <StyledAuthor>
                <PageTitle>{recipe.name}</PageTitle>
              </StyledAuthor>
              <StyledContainer>
                {userData ? <AddFavourites id={id} /> : null}
                {userData?.role === "admin" ? <AddToBanner id={id} /> : null}
              </StyledContainer>
            </StyledContainer>
            <Box>
              <Typography variant="h6">{recipe.subName}</Typography>
              <GetAuthor userId={recipe.author} />
              <StyledSpecialTags>
                {recipe.specialDiets
                  ? recipe.specialDiets.map((specialDietItem, index) => (
                      <StyledTags
                        variant="contained"
                        component={Link}
                        key={index}
                        to={`/ListRecipes/${recipe.specialDiets}`}
                      >
                        {specialDietItem}
                      </StyledTags>
                    ))
                  : null}
              </StyledSpecialTags>
              <StyledQuote>{recipe.description}</StyledQuote>
              <StyledDetail>
                <StyledRecipeDetails>
                  <StyledInfo>Serves</StyledInfo>
                  <StyledDetailedInfo variant="overline">
                    {recipe.servings} people
                  </StyledDetailedInfo>
                </StyledRecipeDetails>
                <StyledRecipeDetails>
                  <StyledInfo>Time</StyledInfo>
                  <StyledDetailedInfo variant="overline">
                    {recipe.time.total}
                  </StyledDetailedInfo>
                </StyledRecipeDetails>
                <StyledRecipeDetails>
                  <StyledInfo>Difficulty</StyledInfo>
                  <StyledDetailedInfo variant="overline">
                    {recipe.difficulty}
                  </StyledDetailedInfo>
                </StyledRecipeDetails>
              </StyledDetail>

              <StyledSpecialTags>
                {recipe.tags
                  ? recipe.tags.map((tags, index) => (
                      <StyledTags
                        sx={{ color: "#c29000" }}
                        variant="outlined"
                        component={Link}
                        key={index}
                        to={`/ListRecipes/${recipe.specialDiets}`}
                      >
                        {tags}
                      </StyledTags>
                    ))
                  : null}
              </StyledSpecialTags>
            </Box>
          </Grid>
        </Grid>
      </StyledWrapper>
      <StyledWrapper>
        <Grid container spacing={3}>
          <Grid xs={12} md={5} item={true}>
            <Box>
              <SubTitle>Ingredients</SubTitle>
              <Box>
                {recipe.ingredients ? (
                  recipe.ingredients.map((ingredients, index) =>
                    ingredients === ingredients.toUpperCase() ? (
                      <StyledRecipeContent>
                        <Typography variant="h6" key={index}>
                          {ingredients}
                        </Typography>
                      </StyledRecipeContent>
                    ) : (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          textDecoration:
                            isChecked(`checkbox${index}`) == "yes"
                              ? "line-through"
                              : "",
                        }}
                      >
                        <Checkbox
                          id={`checkbox${index}`}
                          value={ingredients}
                          name={`checkbox${index}`}
                          onChange={handleCheck}
                        />
                        <Box sx={{ mt: 1.5 }}>
                          <label htmlFor={`checkbox${index}`}>
                            {ingredients}
                          </label>
                        </Box>
                      </Box>
                    )
                  )
                ) : (
                  <Typography>List is empty</Typography>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} md={7} item={true}>
            <Box>
              <SubTitle>Instructions</SubTitle>
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
      </StyledWrapper>
      <StyledWrapper>
        <SubTitle>Comments</SubTitle>

        {!userData ? (
          <Typography>
            To add comments, please <Link to="/login">Log in</Link>
          </Typography>
        ) : (
          <AddComment />
        )}
        <DisplayComments recipeName={recipe.name} />
      </StyledWrapper>
    </>
  );
};
