import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { onSnapshot, query, limit, startAfter } from "firebase/firestore";
import moment from "moment";
import {
  StyledComment,
  StyledAuthorName,
  StyledDate,
  StyledImg,
  StyledCommentItem,
  StyledParagraph,
  StyledDialog,
  StyledCommentInfo,
  StyledCommentAuthor,
  StyledAvatar,
  StyledCommentSection,
  StyledCommentText,
  StyledAuthorLink
} from "./SingleRecipe.styled";
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
  const [imgIsOpen, setImgOpen] = useState(false);
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

  const handleShowDialog = () => {
    return setImgOpen(!imgIsOpen);
  };


  return (
    <>
      {singleComment.length > 0 ? (
        <StyledCommentItem>
          {singleComment.map(({ id, author, comment, createdAt, url, uid }) => (
            <StyledComment key={id}>
              <StyledAuthorLink to={`/user/${uid}`}>
                <StyledAvatar />
                <StyledCommentAuthor>
                  <StyledAuthorName>{author}</StyledAuthorName>
                  <StyledDate>
                    {moment(createdAt.toDate()).calendar()}
                  </StyledDate>
                </StyledCommentAuthor>
              </StyledAuthorLink>

              <StyledCommentSection>
                <StyledCommentText>{comment}</StyledCommentText>
                {url.length > 0 ? (
                  <div>
                    <StyledImg src={url} onClick={handleShowDialog} />
                    {imgIsOpen && (
                      <StyledDialog
                        style={{ position: "absolute" }}
                        onClick={handleShowDialog}
                      >
                        <img
                          src={url}
                          style={{ width: "400px" }}
                          onClick={handleShowDialog}
                        />
                      </StyledDialog>
                    )}
                  </div>
                ) : null}
              </StyledCommentSection>
            </StyledComment>
          ))}
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
