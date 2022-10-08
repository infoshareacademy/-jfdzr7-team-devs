import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Card,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import {
  StyledDetail,
  StyledDetailedInfo,
  StyledInfo,
  StyledRecipeDetails,
  StyledSpecialTags,
  StyledTags,
} from "../../SingleRecipe/DisplayRecipe/DisplayRecipe.styled";
import { Link } from "react-router-dom";
import { GetAuthor } from "../../SingleRecipe/GetAuthor/GetAuthor";
import { singleRecipeCollection } from "../../../../api/firebaseIndex";
import { updateDoc } from "firebase/firestore";

const AcceptItem = ({ item, children }) => {
  const [expanded, setExpanded] = useState(false);
  const docRef = singleRecipeCollection(item.id);

  const handleExpandClick = () => {
    console.log(item);
    setExpanded(!expanded);
  };

  const handleAcceptRecipe = () => {
    console.log(item);
    updateDoc(docRef, {
      isApproved: true,
    }).catch((e) => {
      console.log(e);
    });
  };

  return (
    <ListItem>
      <Card raised sx={{ maxHeight: expanded ? null : "100%", width: 1 }}>
        <Box
          sx={{
            display: "flex",
            flex: "1",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <CardMedia
            component="img"
            image={item.image}
            sx={{ height: 200, width: 150 }}
          />
          <CardContent sx={{ flex: "1", p: 2 }}>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.subName}
            </Typography>
            <Typography>{item.description}</Typography>
            <StyledDetail>
              <StyledRecipeDetails>
                <StyledInfo>Serves</StyledInfo>
                <StyledDetailedInfo variant="overline">
                  {item.servings} people
                </StyledDetailedInfo>
              </StyledRecipeDetails>
              <StyledRecipeDetails>
                <StyledInfo>Time</StyledInfo>
                <StyledDetailedInfo variant="overline">
                  {item.time.total}
                </StyledDetailedInfo>
              </StyledRecipeDetails>
              <StyledRecipeDetails>
                <StyledInfo>Difficulty</StyledInfo>
                <StyledDetailedInfo variant="overline">
                  {item.difficulty}
                </StyledDetailedInfo>
              </StyledRecipeDetails>
            </StyledDetail>
          </CardContent>
          <IconButton onClick={handleAcceptRecipe} sx={{ px: 2 }}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={handleExpandClick} sx={{ px: 2 }}>
            <ExpandMoreIcon
              sx={{
                transform: expanded ? "rotate(-180deg)" : "rotate(0)",
                transition: "0.2s",
              }}
            />
          </IconButton>
          {children}
        </Box>
        <Collapse in={expanded} timeout={1000} unmountOnExit sx={{ p: 2 }}>
          <StyledSpecialTags>
            {item.tags
              ? item.tags.map((tags, index) => (
                  <StyledTags
                    sx={{ color: "#c29000" }}
                    variant="outlined"
                    component={Link}
                    key={index}
                    to={`/ListRecipes/${item.specialDiets}`}
                  >
                    {tags}
                  </StyledTags>
                ))
              : null}
          </StyledSpecialTags>
          <CardContent sx={{ display: "flex" }}>
            <List sx={{ flexBasis: "30%" }}>
              <Typography paragraph>Ingredients:</Typography>
              {item.ingredients?.map((ingredient) => (
                <ListItem>{ingredient}</ListItem>
              ))}
            </List>
            <List sx={{ flexBasis: "70%" }}>
              <Typography paragraph>Method:</Typography>
              {item.instructions?.map((instruction) => {
                return <ListItem>{instruction}</ListItem>;
              })}
            </List>
          </CardContent>
          <Typography>
            Added by: <GetAuthor userId={item.author} />
          </Typography>
        </Collapse>
      </Card>
    </ListItem>
  );
};

export default AcceptItem;
