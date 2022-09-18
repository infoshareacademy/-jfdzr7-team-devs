import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../../api/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const DisplayComments = () => {
  const [recipe, setRecipe] = useState({});
  const [load, setLoad] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const docRef = doc(db, "recipes", id);

    onSnapshot(docRef, (doc) => {
      setRecipe(doc.data(), doc.id);
      setLoad(true);
    });
  }, [id]);

  return (
    <>
      {recipe.comments ? (
        recipe.comments.map(({ author, comment }, index) => (
          <div key={index}>
            <p>Author: {author}</p>
            <p>{comment}</p>
            <br />
          </div>
        ))
      ) : (
        <p>no comments yet</p>
      )}
    </>
  );
};
