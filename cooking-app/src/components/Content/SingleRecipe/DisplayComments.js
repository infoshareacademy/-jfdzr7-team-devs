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
      {!recipe.comments ? (
        <p>no comments yet</p>
      ) : (
        recipe.comments.map(({ author, comment, idx }) => (
          <div key={idx}>
            <p>Author: {author}</p>
            {/* <p>{commentTimeStamp}</p> */}
            <p>{comment}</p>
            <br />
          </div>
        ))
      )}
    </>
  );
};
