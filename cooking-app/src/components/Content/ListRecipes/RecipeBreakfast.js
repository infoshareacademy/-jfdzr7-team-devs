import { PageTitle } from "../../styles/Global.styled";
import { onSnapshot } from "firebase/firestore";
import { recipesCollection } from "../../../api/firebaseIndex";
import { useEffect, useReducer, useState } from "react";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";
import styled from "styled-components";
import { IndividualRecipe } from "./IndividualRecipe";

const reducer = (currentState, action)=>{
switch(action.type){
  case "salt":
    return {...currentState, saltInput: !currentState.saltInput};
  case "sweet":
    return {...currentState, sweetInput: !currentState.sweetInput};
  case "text":
    return {...currentState, filterInput: action.payload};
  default: return currentState
}}

export const RecipeBreakfast = () => {
  const [datafromFirebase, setdatafromFirebase] = useState([]);

  const [state, dispacher] = useReducer(reducer, {saltInput: false, sweetInput: false, filterInput: ""});

  const filterFunc = (e)=>{
    dispacher({type: "text", payload: e.target.value})
  }

  const saltFunc = ()=>{
  dispacher({type: "salt"})
}

const sweetFunc = ()=>{
  dispacher({type: "sweet"})
}

console.log(state.filterInput);
console.log(state.saltInput);
console.log(state.sweetInput);

  useEffect(() => {
    onSnapshot(recipesCollection, (snapshot) => {
      setdatafromFirebase(getDataFromSnapshot(snapshot));
    });
  }, []);

  const listofRecipe2 = datafromFirebase
    .filter((item) => {
        return item.categories.includes("Breakfast");
    })
    .filter((item) => {
      if (state.saltInput == true) {
        return item.categories.includes("Salt");
      } else if (state.sweetInput === true) {
        return item.categories.includes("Sweet");
      } else if (state.filterInput !== "") {
        return item.title.includes(state.filterInput)
      } else return item
    })
    .map((singleRecipe) => {
      return (
        <IndividualRecipe key={singleRecipe.id} singleRecipe={singleRecipe}/>
      );
    });

  return (
    <>
      <PageTitle>Breakfast</PageTitle>

      <label htmlFor="filter">Search by recipe title </label>
    <input
    id="filter"
        type="text"
        onChange={filterFunc} // payload
        value={state.filterInput}
      />
      <br/>

      <label htmlFor="salt">Salt</label>
      <input
        id="salt"
        type="checkbox"
        onChange={saltFunc}
        checked={state.saltInput}
        value={state.saltInput}
      />

      <label htmlFor="sweet">Sweet</label>
      <input
        id="sweet"
        type="checkbox"
        onChange={sweetFunc}
        checked={state.sweetInput}
        value={state.sweetInput}
      />

      <StyledDiv>{listofRecipe2}</StyledDiv>



    </>
  );
};

const StyledDiv = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
`
