import { PageTitle } from "../../styles/Global.styled";
import { onSnapshot } from "firebase/firestore";
import { recipesCollection } from "../../../api/firebaseIndex";
import { useEffect, useReducer, useState } from "react";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";
import styled from "styled-components";
import { IndividualRecipe } from "./IndividualRecipe";

const reducer = (currentState, action)=>{
switch(action){
  case "salt":
    return {saltInput: !currentState.saltInput};
  case "sweet":
    return {sweetInput: !currentState.sweetInput};
  default: return currentState
}}

export const RecipeLunch = () => {
  const [datafromFirebase, setdatafromFirebase] = useState([]);

  const [state, dispacher] = useReducer(reducer, {saltInput: false, sweetInput: false});

const saltFunc = ()=>{
  dispacher("salt")
}

const sweetFunc = ()=>{
  dispacher("sweet")
}

  useEffect(() => {
    onSnapshot(recipesCollection, (snapshot) => {
      setdatafromFirebase(getDataFromSnapshot(snapshot));
    });
  }, []);

  const listofRecipe2 = datafromFirebase
    .filter((item) => {
        return item.categories.includes("Dinner");
    })
    .filter((item) => {
      if (state.saltInput == true) {
        return item.categories.includes("Salt");
      } else if (state.sweetInput === true) {
        return item.categories.includes("Sweet");
      } else { 
        return item}})
    .map((singleRecipe) => {
      return (
        <IndividualRecipe key={singleRecipe.id} singleRecipe={singleRecipe}/>
      );
    });

  return (
    <>
      <PageTitle>Lunch</PageTitle>

      <label htmlFor="salt">Salt</label>
      <input
        id="salt"
        type="checkbox"
        onChange={saltFunc}
        checked={state.saltInput}
      />

      <label htmlFor="sweet">Sweet</label>
      <input
        id="sweet"
        type="checkbox"
        onChange={sweetFunc}
        checked={state.sweetInput}
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


