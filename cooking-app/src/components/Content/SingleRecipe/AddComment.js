import { StyledButton } from "../../styles/Global.styled";
import { useState, useContext } from "react";
import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { db } from "../../../api/firebase";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { UserDataContext } from "../../../App";

export const AddComment = () => {
  // const { userData } = useContext(UserDataContext);
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
        author: commentForm.author,
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
      <form onSubmit={submitComment}>
        <TextField
          label="Name"
          multiline
          variant="filled"
          value={commentForm.author}
          name="author"
          onChange={updateCommentForm}
        />
        <br />
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
