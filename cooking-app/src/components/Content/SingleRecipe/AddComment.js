import { StyledButton } from "../../styles/Global.styled";
import { useState, useContext } from "react";
import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { db } from "../../../api/firebase";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { UserDataContext } from "../../../App";

export const AddComment = () => {
  const userData = useContext(UserDataContext);
  const defaultCommentForm = {
    author: "",
    comment: "",
  };

  const [commentForm, setCommentForm] = useState(defaultCommentForm);
  const idCurrent = useParams();

  const docRef = doc(db, "recipes", idCurrent.id);

  const updateCommentForm = (e) => {
    setCommentForm({
      ...commentForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitComment = (e) => {
    e.preventDefault();
    updateDoc(docRef, {
      comments: arrayUnion({
        author: userData?.firstName,
        authorId: userData?.uid,
        comment: commentForm.comment,
        commentTimeStamp: Timestamp.fromDate(new Date()).toDate(),
      }),
    })
      .then((docRef) => {
        console.log("new comment added");
      })
      .catch((error) => {
        console.log(error);
      });

    setCommentForm(defaultCommentForm);
  };

  return (
    <>
    <p>{userData?.firstName} Zostaw nam komenatrz:</p>
      <form onSubmit={submitComment}>
        <TextField
          label="Add your comment"
          multiline
          variant="filled"
          value={commentForm.comment}
          name="comment"
          onChange={updateCommentForm}
        />
        <StyledButton type="submit">Submit</StyledButton>
      </form>
    </>
  );
};
