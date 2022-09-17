import { onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { recipesCollection } from "../../../api/firebaseIndex";
import { IndividualRecipe } from "./IndividualRecipe";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";
import { PageTitle } from "../../styles/Global.styled";
import styled from "styled-components";

export const ListRecipes = () => {
  const [datafromFirebase, setdatafromFirebase] = useState([]);
  const [search, setSearch] = useState("");
  const [salt, setSalt] = useState(false);
  const [sweet, setSweet] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [dessert, setDessert] = useState(false);
  const [lunch, setLunch] = useState(false);

  const textInput = useRef();
  const saltInput = useRef();
  const sweetInput = useRef();
  const breakfastInput = useRef();
  const dinnerInput = useRef();
  const dessertInput = useRef();
  const lunchInput = useRef();


  useEffect(() => {
    onSnapshot(recipesCollection, (snapshot) => {
      setdatafromFirebase(getDataFromSnapshot(snapshot));
    });
  }, []);

  const listofRecipe2 = datafromFirebase
    .filter((item) => {
      if (salt == true) {
        return item.categories.includes("Salt");
      } else if (sweet === true) {
        return item.categories.includes("Sweet");
      } else if (breakfast === true) {
        return item.categories.includes("Breakfast");
      } else if (dinner === true) {
        return item.categories.includes("Dinner");
      } else if (lunch === true) {
        return item.categories.includes("Lunch");
      } else if (dessert === true) {
        return item.categories.includes("Dessert");
      } else if (search.toLowerCase() === "") {
        return item;
      } else return item.title.toLowerCase().includes(search);
    })
    .map((singleRecipe) => {
      return (
        <IndividualRecipe singleRecipe={singleRecipe}/>
      );
    });


  return (
    <>
    <PageTitle>Recipes</PageTitle>
    <label htmlFor="filter">Search by recipe title </label>
    <input
    id="filter"
        ref={textInput}
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <br/>

      <label htmlFor="salt">Salt</label>
      <input
        ref={saltInput}
        name="salt"
        type="checkbox"
        onChange={() => {
          setSalt(!salt);
        }}
      />

      <label htmlFor="sweet">Sweet</label>
      <input
        ref={sweetInput}
        name="sweet"
        type="checkbox"
        onChange={() => {
          setSweet(!sweet);
        }}
      />

      <label htmlFor="dinner">Dinner</label>
      <input
        ref={dinnerInput}
        name="dinner"
        type="checkbox"
        onChange={() => {
          setDinner(!dinner);
        }}
      />

<label htmlFor="lunch">Lunch</label>
      <input
        ref={lunchInput}
        name="breakfast"
        type="checkbox"
        onChange={() => {
          setLunch(!lunch);
        }}
      />

      <label htmlFor="breakfast">Breakfast</label>
      <input
        ref={breakfastInput}
        name="breakfast"
        type="checkbox"
        onChange={() => {
          setBreakfast(!breakfast);
        }}
      />

<label htmlFor="dessert">Dessert</label>
      <input
        ref={dessertInput}
        name="dessert"
        type="checkbox"
        onChange={() => {
          setDessert(!dessert);
        }}
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

