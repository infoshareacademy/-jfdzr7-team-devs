import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../../api/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { PageTitle } from "../../../utils/styles/Global.styled";
import { Loader } from "../../../utils/Loader";
import { AddComment } from "./AddComment";
import { DisplayComments } from "./DisplayComments";

export const DisplayRecipe = ({ isLoggedIn }) => {
  const [recipe, setRecipe] = useState({});
  const [load, setLoad] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const docRef = doc(db, "recipes", id);

    onSnapshot(docRef, (doc) => {
      setRecipe(doc.data(), doc.id);
      setLoad(true);
    });
  }, [id, load]);

  if (load === false) {
    return <Loader />;
  }

  return (
    <>
      <div>
        <PageTitle>{recipe.title}</PageTitle>
        <img src={recipe.url} alt={`${recipe.title}`} />
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
      <PageTitle>Comments</PageTitle>
      <div>
        {isLoggedIn ? (
          <p>
            To add comments, please <Link to="/login">Log in</Link>
          </p>
        ) : (
          <AddComment />
        )}
        <DisplayComments />
      </div>
    </>
  );
};
