import { onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { recipesCollection, tags } from "../../../../api/firebaseIndex";
import { IndividualRecipe } from "./IndividualRecipe";
import { getDataFromSnapshot } from "../../../../utils/GetDataFromSnapshot";
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

export const UserRecipes = () => {
  const [datafromFirebase, setdatafromFirebase] = useState([]);
  const [visible, setVisible] = useState(4);
  const { id } = useParams();

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

  useEffect(() => {
    const q = query(
      recipesCollection,
      where("isApproved", "==", true),
      where("author", "==", id)
    );
    onSnapshot(q, (snapshot) => {
      setdatafromFirebase(getDataFromSnapshot(snapshot));
    });
  }, []);

  const showMoreItems = () => {
    setVisible((prev) => prev + 4);
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
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <IndividualRecipe singleRecipe={singleRecipe} />
        </Grid>
      );
    });

  return (
    <StyledDiv>
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
      {(moreLoading >= 0) ? (
        <Button onClick={showMoreItems} variant="contained">
          Show more
        </Button>
      ) : null}
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
