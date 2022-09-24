import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  onSnapshot,
  query,
  limit,
  startAfter,
  getDocs,
  docs,
} from "firebase/firestore";
import moment from "moment";
import { StyledComment } from "../SingleRecipe.styled";
import {
  commentsRecipeCollection,
  defaultQueryConstraint,
} from "../../../../api/firebaseIndex";
import { getDataFromSnapshot } from "../../../../utils/GetDataFromSnapshot";
import { Loader } from "../../../../utils/Loader";
import { Button } from "@mui/material";

export const DisplayComments = () => {
  const [singleComment, setComment] = useState([]);
  const [load, setLoad] = useState(false);
  const [lastDoc, setLastDoc] = useState();
  const [nextCommentLoading, setNextCommentLoading] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const first = query(
      commentsRecipeCollection(id),
      defaultQueryConstraint,
      limit(3)
    );

    onSnapshot(first, (comment) => {
      setComment(getDataFromSnapshot(comment));
      setLastDoc(comment.docs.length - 1);
      setLoad(true);
    });
  }, [load]);
  console.log("pierwszy raz", singleComment);
  console.log(singleComment.createdAt);

  const handleMore = () => {
    const next = query(
      commentsRecipeCollection(id),
      defaultQueryConstraint,
      startAfter(2),
      limit(3)
    );

    onSnapshot(next, (comment) => {
      setComment(getDataFromSnapshot(comment));
      // setComment((singleComment) => [
      //   ...singleComment,
      //   ...getDataFromSnapshot(comment),
      // ]);
      setNextCommentLoading(getDataFromSnapshot(comment));
      setLastDoc(comment.docs.length - 1);
      setLoad(true);
    });
    console.log("drugi  drugi raz", singleComment);
  };

  if (load === false) {
    return <Loader />;
  }

  return (
    <>
      {singleComment ? (
        <div>
          {singleComment.map(({ id, author, comment, createdAt, url }) => (
            <StyledComment key={id}>
              <h4>{author}</h4>
              <p>{moment(createdAt.toDate()).calendar()}</p>
              <p>{comment}</p>
              {url.length > 0 ? (
                <img src={url} style={{ height: "150px" }} />
              ) : null}
              <br />
            </StyledComment>
          ))}
          <Button onClick={handleMore}>Show more</Button>
        </div>
      ) : (
        <p>no comments yet</p>
      )}
    </>
  );
};
