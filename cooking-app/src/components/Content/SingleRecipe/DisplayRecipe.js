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
  StyledRecipeDetails,
  StyledList,
  StyledListItemNumber,
} from "./SingleRecipe.styled";
import { GetAuthor } from "./GetAuthor";
import { UserDataContext } from "../../../App";
import { AddFavourites } from "./AddFavourites";
import AddToBanner from "./AddToBanner";
import {
  Box,
  Typography,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import styled from "styled-components";

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
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const isChecked = (item) => (checked.includes(item) ? "yes" : "no");

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
              <Box sx={{ display: "flex" }}>
                {userData ? <AddFavourites id={id} /> : null}
                {userData?.role === "admin" ? <AddToBanner id={id} /> : null}
              </Box>
            </Box>
            <Box>
              <Typography variant="h6">{recipe.subName}</Typography>
              <GetAuthor userId={recipe.author} />
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
                        sx={{ my: 1, mr: 2, color: "#c29000" }}
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
      <Box sx={{ flexGrow: 1, mt: 5 }}>
        <Grid container spacing={3}>
          <Grid xs={12} md={5} item={true}>
            <Box>
              <Box sx={{ my: 3 }}>
                <Typography variant="subTitle">Ingredients</Typography>
              </Box>
              <Box>
                {recipe.ingredients ? (
                  recipe.ingredients.map((ingredients, index) =>
                    ingredients === ingredients.toUpperCase() ? (
                      <Box sx={{ ml: 1.5, mt: 2 }}>
                        <Typography variant="h6" key={index}>
                          {ingredients}
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        key={index}
                        sx={{
                          textDecoration:
                            isChecked(ingredients) == "yes"
                              ? "line-through"
                              : "",
                        }}
                      >
                        <Checkbox
                          id={`checkbox${index}`}
                          value={ingredients}
                          onChange={handleCheck}
                        />
                        <label for={`checkbox${index}`}>{ingredients}</label>
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
              <Box sx={{ my: 3 }}>
                <Typography variant="subTitle">Instructions</Typography>
              </Box>
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
        <Box sx={{ mb: 3 }}>
          <Typography variant="subTitle">Comments</Typography>
        </Box>
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
