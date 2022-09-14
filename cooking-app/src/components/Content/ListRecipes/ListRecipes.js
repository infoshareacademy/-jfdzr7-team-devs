import { PageTitle } from "../../styles/Global.styled";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { recipesCollection } from "../../../api/firebaseIndex";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";

export const ListRecipes = () => {
  const [recipies, setRecipies] = useState([]);

  useEffect(() => {
    onSnapshot(recipesCollection, (singleRecipe) => {
      setRecipies(getDataFromSnapshot(singleRecipe));
    });
  }, []);

  return (
    <>
      <PageTitle>Recipes</PageTitle>
      {recipies.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </>
  );
};
