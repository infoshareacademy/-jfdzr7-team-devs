import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { onSnapshot, query, limit, startAfter } from "firebase/firestore";
import moment from "moment";
import { StyledComment } from "./SingleRecipe.styled";
import {
  commentsRecipeCollection,
  defaultQueryConstraint,
} from "../../../api/firebaseIndex";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";
import { Loader } from "../../../utils/Loader";
import { Button } from "@mui/material";

export const DisplayComments = () => {
  const [singleComment, setComment] = useState([]);
  const [load, setLoad] = useState(false);
  const [lastDoc, setLastDoc] = useState();
  const [commentsList, setCommentsList] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const docRef = commentsRecipeCollection(id);
    onSnapshot(docRef, (comment) => {
      setCommentsList(getDataFromSnapshot(comment));
    });
  }, []);

  useEffect(() => {
    const first = query(
      commentsRecipeCollection(id),
      defaultQueryConstraint,
      limit(5)
    );

    onSnapshot(first, (comment) => {
      setComment(getDataFromSnapshot(comment));
      setLoad(true);
    });
    setLastDoc(singleComment[singleComment.length - 1]);
  }, [load]);

  const handleMore = () => {
    const next = query(
      commentsRecipeCollection(id),
      defaultQueryConstraint,
      startAfter(lastDoc.createdAt),
      limit(3)
    );

    onSnapshot(next, (comment) => {
      setComment((singleComment) => [
        ...singleComment,
        ...getDataFromSnapshot(comment),
      ]);
    });
  };

  useEffect(() => {
    setLastDoc(singleComment[singleComment.length - 1]);
  });

  if (load === false) {
    return <Loader />;
  }

  const moreLoading = commentsList.length - singleComment.length;

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
          {moreLoading ? (
            <Button onClick={handleMore} fullWidth variant="contained" sx={{ mb: 10 }}>
              Show more
            </Button>
          ) : null}
        </div>
      ) : (
        <p>no comments yet</p>
      )}
    </>
  );
};
