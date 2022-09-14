import { PageTitle } from "../../styles/Global.styled";
import { useParams } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { recipesCollection } from "../../../api/firebaseIndex";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";

export const SingleRecipe = () => {
  const [recipies, setRecipies] = useState([]);

  const idCurrent = useParams();

  useEffect(() => {
    onSnapshot(recipesCollection, (singleRecipe) => {
      setRecipies(getDataFromSnapshot(singleRecipe));
    });
  }, []);

  return (
    <>
      {recipies.map((recipe) => {
        if (recipe.id === idCurrent.id) {
          return (
            <div key={recipe.id}>
              <img src={recipe.url} alt={`${recipe.title} image`} />
              <PageTitle>{recipe.title}</PageTitle>
              <p>
                Categories:
                {recipe.categories.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </p>
              <p>Time: {recipe.time}</p>
              <p>Portions: {recipe.portion}</p>
              <p>Ingredients: {recipe.ingredients}</p>
              <p>How to prepare? {recipe.describe}</p>
            </div>
          );
        }
      })}
    </>
  );
};
