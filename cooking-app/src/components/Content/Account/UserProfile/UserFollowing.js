import { getDoc } from "firebase/firestore";
import { useEffect, useReducer, useState, useRef, useContext } from "react";
import { singleRecipeCollection, tags } from "../../../../api/firebaseIndex";
import { IndividualRecipe } from "./IndividualRecipe";
import { InputElement } from "./InputElement";
import { Button, Grid, TextField, Box, Typography } from "@mui/material";
import { UserProfileContext } from "./UserProfile";

const reducer = (currState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...currState,
        inputCategory: [...currState.inputCategory, action.payload],
      };
    case "DELETE_ITEM":
      return {
        ...currState,
        inputCategory: currState.inputCategory.filter(
          (tag) => tag !== action.payload
        ),
      };
    case "newTextInput":
      return { ...currState, textInput: action.payload };
    case "inputState":
      return { ...currState, inputState: !currState.inputState };
    default:
      throw new Error();
  }
};

export const UserFollowing = () => {
  const [datafromFirebase, setdatafromFirebase] = useState([]);
  const [visible, setVisible] = useState(12);
  // const { id } = useParams();
  // const [user, setUser] = useState([]);
  const preventUpdate = useRef(false);
  const user = useContext(UserProfileContext);

  // useEffect(() => {
  //   const userRef = singleUserCollection(id);
  //   onSnapshot(userRef, (doc) => {
  //     setUser(doc.data(), doc.id);
  //   });
  // }, []);

  useEffect(() => {
    if (user.favourites && !preventUpdate.current) {
      preventUpdate.current = true;
      user.favourites.forEach((recipeId) => {
        getDoc(singleRecipeCollection(recipeId)).then((recipe) => {
          setdatafromFirebase((current) => [...current, 
            {...recipe.data(), id: recipeId },
          ]);
          // setdatafromFirebase((current) => [...current, recipe.data()]);
        });
      });
    }
  }, [user]);

  const [state, dispatcher] = useReducer(reducer, {
    inputCategory: "",
    textInput: "",
    inputState: false,
  });

  const handelTextInput = (e) => {
    dispatcher({ type: "newTextInput", payload: e.target.value });
  };

  const handleInput = (e) => {
    dispatcher({ type: "inputState" });
    if (e.target.checked) {
      dispatcher({ type: "ADD_ITEM", payload: e.target.name });
    } else {
      dispatcher({ type: "DELETE_ITEM", payload: e.target.name });
    }
  };

  const showMoreItems = () => {
    setVisible((prev) => prev + 8);
  };

  const moreLoading = datafromFirebase.length - visible;

  const listofRecipe2 = datafromFirebase
    .filter((item) => {
      if (state.inputCategory.length > 0) {
        let arr = state.inputCategory.filter((tag) => item.tags?.includes(tag));
        return !(arr.length === 0);
      } else if (state.textInput.toLowerCase() === "") {
        return item;
      } else return item.name?.toLowerCase().includes(state.textInput);
    })
    .slice(0, visible)
    .map((singleRecipe, index) => {
      return (
        <Grid key={index} item xs={12} sm={12} md={4} lg={3}>
          <IndividualRecipe singleRecipe={singleRecipe} />
        </Grid>
      );
    });

  return (
    <Box>
      {user.favourites == 0 ? (
        <Typography sx={{ p: "16px" }}>
          User has not saved any recipes yet
        </Typography>
      ) : (
        <Box>
          <TextField
            multiline
            placeholder="Find recipe"
            variant="outlined"
            value={state.textInput}
            type="text"
            onChange={handelTextInput}
            fullWidth
          />

          <Box sx={{ my: 2 }}>
            {tags.map((singleTag, index) => {
              return (
                <InputElement
                  key={index}
                  tag={singleTag}
                  handleInput={handleInput}
                />
              );
            })}
          </Box>

          <Grid direction="row" container spacing={4} sx={{ py: 5 }}>
            {listofRecipe2}
          </Grid>
          {moreLoading >= 0 ? (
            <Button onClick={showMoreItems} variant="contained" sx={{ mb: 10 }}>
              Show more
            </Button>
          ) : null}
        </Box>
      )}
    </Box>
  );
};
