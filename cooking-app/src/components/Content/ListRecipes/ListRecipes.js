import { onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { recipesCollection, tags } from "../../../api/firebaseIndex"
import { IndividualRecipe } from "./IndividualRecipe";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";
import { PageTitle } from "../../styles/Global.styled";
import styled from "styled-components";
import { InputElement } from "./InputElement";

export const ListRecipes = () => {
  const [datafromFirebase, setdatafromFirebase] = useState([]);
  const [inputState, setInputState] = useState(false);
  const [inputCategory, setinputCategory] = useState(null);
  const [search, setSearch] = useState("");
  const textInput = useRef();

  const handleInput = (e) => {
    setInputState(!inputState);
    setinputCategory(e.target.name)
  };

  useEffect(() => {
    onSnapshot(recipesCollection, (snapshot) => {
      setdatafromFirebase(getDataFromSnapshot(snapshot));
    });
  }, []);

  const listofRecipe2 = datafromFirebase
    .filter((item) => {
      if (inputState) {
        return item.categories.includes(inputCategory);
      } else if (search.toLowerCase() === "") {
        return item;
      } else return item.title.toLowerCase().includes(search);
    })
    .map((singleRecipe) => {
      return <IndividualRecipe singleRecipe={singleRecipe} />;
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
      <br />
      <div>
        {tags.map((singleTag) => {
          return (
            <InputElement tag={singleTag.label} handleInput={handleInput} />
          );
        })}
      </div>

      <StyledDiv>{listofRecipe2}</StyledDiv>
    </>
  );
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

