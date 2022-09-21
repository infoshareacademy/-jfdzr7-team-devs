import { onSnapshot } from "firebase/firestore";
import { useEffect, useReducer, useRef, useState } from "react";
import { recipesCollection, tags } from "../../../api/firebaseIndex";
import { IndividualRecipe } from "./IndividualRecipe";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";
import { PageTitle } from "../../styles/Global.styled";
import styled from "styled-components";
import { InputElement } from "./InputElement";
import { Grid, Container } from "@mui/material";

const reducer = (currState, action) => {
  switch (action.type) {
    case "category":
      return {...currState, inputCategory: action.payload };
    case "newTextInput":
      return {...currState, textInput: action.payload };
    case "inputState":
      return {...currState, inputState: !currState.inputState}
    default:
      throw new Error();
  }
};

export const ListRecipes = () => {
  const [datafromFirebase, setdatafromFirebase] = useState([]);

  const [state, dispatcher] = useReducer(reducer, {
    inputCategory: "",
    textInput: "",
    inputState: false,
  });

const handelTextInput = (e)=>{
dispatcher({type: "newTextInput", payload: e.target.value})
}

  const handleInput = (e) => {
    dispatcher({type: "inputState"});
    dispatcher({type: "category", payload: e.target.name});
  };

  useEffect(() => {
    onSnapshot(recipesCollection, (snapshot) => {
      setdatafromFirebase(getDataFromSnapshot(snapshot));
    });
  }, []);

  console.log(state.inputState);
  console.log(state.inputCategory);
  console.log(state.textInput);

  const listofRecipe2 = datafromFirebase
    .filter((item) => {
      if (state.inputState) {
        return item.categories.includes(state.inputCategory);
      } else if (state.textInput.toLowerCase() === "") {
        return item;
      } else return item.title.toLowerCase().includes(state.textInput);
    })
    .map((singleRecipe) => {
      return (
        <Grid item xs={12} sm={6} md={3}>
          <IndividualRecipe singleRecipe={singleRecipe} />
        </Grid>
      );
    });

  return (
    <Container>
      <PageTitle>Recipes</PageTitle>
      <label htmlFor="filter">Search by recipe title </label>
      <input
        id="filter"
        value={state.textInput}
        type="text"
        onChange={handelTextInput}
      />
      <br />
      <div>
        {tags.map((singleTag) => {
          return (
            <InputElement tag={singleTag.label} handleInput={handleInput} />
          );
        })}
      </div>

      <Grid container spacing={3}>
        {listofRecipe2}
      </Grid>
    </Container>
  );
};

// const StyledDiv = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
// `;
