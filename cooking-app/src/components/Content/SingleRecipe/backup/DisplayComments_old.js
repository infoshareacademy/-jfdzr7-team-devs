import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../../../api/firebase";
import { doc, onSnapshot, serverTimestamp, orderBy, orderByChild, query, ref } from "firebase/firestore";
import moment from "moment";
import { StyledComment, StyledName } from "../SingleRecipe.styled";
import { singleRecipeCollection } from "../../../../api/firebaseIndex";

export const DisplayComments = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const docRef = singleRecipeCollection(id);
 
    onSnapshot(docRef, (doc) => {
      setRecipe(doc.data(), doc.id);
    });
  }, [id]);

  return (
    <>
      {recipe.comments ? (
        recipe.comments.map(
          ({ author, comment, commentTimeStamp, url }, index) => (
            <StyledComment key={index}>
              <h4>{author}</h4>
              <p>{moment(commentTimeStamp.toDate()).calendar()}</p>
              <p>{comment}</p>
              {(url.length > 0) ?
              (<img
                src={url}
                alt={`${recipe.title}
            `}
                style={{ height: "150px" }}
              />) : null }
              <br />
            </StyledComment>
          )
        )
      ) : (
        <p>no comments yet</p>
      )}
    </>
  );
};
