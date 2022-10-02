import {
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { useEffect, useReducer, useState, useRef } from "react";
import {
  singleUserCollection,
  singleRecipeCollection,
  tags,
} from "../../../../api/firebaseIndex";
import { IndividualRecipe } from "./IndividualRecipe";
import styled from "styled-components";
import { InputElement } from "./InputElement";
import { Button, Grid } from "@mui/material";
import { useParams } from "react-router-dom";

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
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const preventUpdate = useRef(false);

  useEffect(() => {
    const userRef = singleUserCollection(id);
    onSnapshot(userRef, (doc) => {
      setUser(doc.data(), doc.id);
    });
  }, []);

  useEffect(() => {
    if (user.favourites && !preventUpdate.current) {
      preventUpdate.current = true;
      user.favourites.forEach((recipeId) => {
        getDoc(singleRecipeCollection(recipeId)).then((recipe) => {
          setdatafromFirebase((current) => [...current, recipe.data()]);
        });
      });
    }
  }, [user]);

  ////////////////////////////////

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

  const userFavourites = user.favourites;
    // const moreLoading = user.favourites.length - visible;

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
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <IndividualRecipe singleRecipe={singleRecipe} />
        </Grid>
      );
    });
  

  return (
    <StyledDiv>
      {/* <h2>Total saved recipes:{user?.favourites}</h2>

      <div>
        {datafromFirebase.map((recipe) => (
          <p key={recipe.uid}>
            {recipe.name}
          </p>
        ))}
      </div> */}

      <StyledInputText
        id="filter"
        placeholder="please enter the recipe name..."
        value={state.textInput}
        type="text"
        onChange={handelTextInput}
      />
      <br />
      <div>
        {tags.map((singleTag, index) => {
          return (
            <InputElement
              key={index}
              tag={singleTag}
              handleInput={handleInput}
            />
          );
        })}
      </div>

      <Grid
        direction="row"
        container
        spacing={3}
        sx={{
          marginBottom: 2,
          paddingRight: 2,
        }}
        justifyContent="center"
      >
        {listofRecipe2}
      </Grid>
      {/* {moreLoading >= 0 ? (
        <Button onClick={showMoreItems} variant="contained">
          Show more
        </Button>
      ) : null}  */}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: auto;
`;

const StyledInputText = styled.input`
  width: 100%;
  height: 50px;
`;
