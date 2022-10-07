import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { onSnapshot, query, limit, startAfter } from "firebase/firestore";
import {
  StyledComment,
  StyledImg,
  StyledCommentItem,
  StyledParagraph,
  StyledCommentSection,
  StyledCommentText,
} from "./DisplayComments.styled";
import {
  commentsRecipeCollection,
  defaultQueryConstraint,
} from "../../../../api/firebaseIndex";
import { getDataFromSnapshot } from "../../../../utils/GetDataFromSnapshot";
import { Loader } from "../../../../utils/Loader";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { GetAuthor } from "../GetAuthor/GetAuthor";

export const DisplayComments = ({ recipeName }) => {
  const [singleComment, setComment] = useState([]);
  const [load, setLoad] = useState(false);
  const [lastDoc, setLastDoc] = useState();
  const [commentsList, setCommentsList] = useState({});
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [url, setUrl] = useState();

  useEffect(() => {
    const docRef = commentsRecipeCollection(id);
    onSnapshot(docRef, (comment) => {
      setCommentsList(getDataFromSnapshot(comment));
    });
  }, [id]);

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
  }, [id, load]);

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

  if (load === false) {
    return <Loader />;
  }

  const moreLoading = commentsList.length - singleComment.length;

  const handleClickOpen = (url) => {
    setOpen(true);
    setUrl(url);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {singleComment.length > 0 ? (
        <StyledCommentItem>
          {singleComment.map(({ id, comment, createdAt, url, authorId }) => (
            <StyledComment key={id}>
              <GetAuthor userId={authorId} createdAt={createdAt} />
              <StyledCommentSection>
                <StyledCommentText>{comment}</StyledCommentText>
                {url.length > 0 ? (
                  <StyledImg
                    src={url}
                    alt={recipeName}
                    onClick={() => handleClickOpen(url)}
                  />
                ) : null}
              </StyledCommentSection>
            </StyledComment>
          ))}

          <Dialog
            open={open}
            onClose={handleClose}
            hasCloseButton
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          >
            <img
              style={{ width: "auto", height: "100%" }}
              src={url}
              alt={recipeName}
            />
          </Dialog>

          {moreLoading ? (
            <Button onClick={handleMore} fullWidth variant="contained">
              Show more
            </Button>
          ) : null}
        </StyledCommentItem>
      ) : (
        <StyledParagraph>no comments yet</StyledParagraph>
      )}
    </>
  );
};
