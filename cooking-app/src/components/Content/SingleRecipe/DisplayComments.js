import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../../api/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Loader } from "../../../utils/Loader";
import { Alert } from "@mui/material";
import { ERROR_MESSAGE } from "../../../utils/ErrorMessageTexts";

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
  }, [id, load]);

  if (load === false) {
    return <Loader />;
  }

  //sprawdzenie czy istnieja juz komentarze

  const ErrorMessage = () => {
    return (
      <Alert severity="error" variant="outlined">
        {ERROR_MESSAGE.MISSING_WEBSITE}
      </Alert>
    );
  };

  return (
    <>
      {!recipe.comments ? (
        <ErrorMessage />
      ) : (
        recipe.comments.map(({ author, comment, idx }) => (
          <div>
            <p key={idx}>Author: {author}</p>
            <p>{comment}</p>
            <br />
          </div>
        ))
      )}
    </>
  );
};
