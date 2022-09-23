import { onSnapshot } from "firebase/firestore";
import { useEffect, useReducer, useRef, useState } from "react";
import { recipesCollection, tags } from "../../../api/firebaseIndex";
import { IndividualRecipe } from "./IndividualRecipe";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";
import { PageTitle } from "../../styles/Global.styled";
import { InputElement } from "./InputElement";
import { Grid, Container } from "@mui/material";

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

  console.log(state.inputState);
  console.log(state.inputCategory);
  console.log(state.textInput);

  // const result = certs.filter(cert => {
  //   let arr = details.filter(detail => detail.b === cert.b)
  //   return !(arr.length === 0)
  // });

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
    .map((singleRecipe, index) => {
      while (index < 20) {
        return (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <IndividualRecipe singleRecipe={singleRecipe} />
          </Grid>
        );
      }
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
