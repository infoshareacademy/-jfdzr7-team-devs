import { onSnapshot } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { recipesCollection, tags } from "../../../api/firebaseIndex";
import { IndividualRecipe } from "./IndividualRecipe";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";
import { PageTitle, StyledButton } from "../../styles/Global.styled";
import { InputElement } from "./InputElement";
import { Grid} from "@mui/material";
import styled from "styled-components";

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

export const ListRecipes = () => {
  const [datafromFirebase, setdatafromFirebase] = useState([]);
  const [visible, setVisible] = useState(12);

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
    onSnapshot(recipesCollection, (snapshot) => {
      setdatafromFirebase(getDataFromSnapshot(snapshot));
    });
  }, []);

  const showMoreItems = () => {
    setVisible((prev) => prev + 8);
  };

  const listofRecipe2 = datafromFirebase
    .filter((item) => {
      if (state.inputCategory.length > 0) {
        // console.log(state.inputCategory.length);
        // return item.tags?.includes(state.inputCategory);
        let arr = state.inputCategory.filter((tag) => item.tags?.includes(tag));
        return !(arr.length === 0);
      } else if (state.textInput.toLowerCase() === "") {
        return item;
      } else return item.name?.toLowerCase().includes(state.textInput);
    })
    .slice(0, visible)
    .map((singleRecipe, index) => {
        return (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <IndividualRecipe singleRecipe={singleRecipe} />
          </Grid>
        );
      
    });

  return (
    <StyledDiv>
      <PageTitle>Recipes</PageTitle>
      {/* <label htmlFor="filter">Search by recipe title </label> */}
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

      <Grid container spacing={3} style={{marginBottom: 20}}>
        {listofRecipe2}
      </Grid>
      <StyledButton onClick={showMoreItems}>Show more</StyledButton>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInputText = styled.input`
width: 100%;
height: 50px;
`