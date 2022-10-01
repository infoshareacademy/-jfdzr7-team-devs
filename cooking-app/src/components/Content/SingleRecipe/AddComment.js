import { PageTitle, StyledButton } from "../../styles/Global.styled";
import { useState } from "react";
import { TextField, Snackbar, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { db } from "../../../api/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { variantType } from "../../styles/muiStyles";

const defaultCommentForm = {
  author: "",
  comment: "",
};

export const AddComment = () => {
  const [commentForm, setCommentForm] = useState(defaultCommentForm);
  const [showAlert, setShowAlert] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const idCurrent = useParams();

  const docRef = doc(db, "recipes", idCurrent.id);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
    setResponseMessage("");
  };

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
      }),
    })
      .then(() => {
        setResponseMessage("comment added");
        setShowAlert(true);
      })
      .catch((e) => {
        setResponseMessage(e.code);
        setShowAlert(true);
      });
    setCommentForm(defaultCommentForm);
  };

  return (
    <>
      <PageTitle>Comments</PageTitle>

      <form onSubmit={submitComment}>
        <TextField
          label="Name"
          multiline
          variant={variantType.filled}
          value={commentForm.author}
          name="author"
          onChange={updateCommentForm}
        />
        <br />
        <TextField
          label="Add your comment"
          multiline
          variant={variantType.filled}
          value={commentForm.comment}
          name="comment"
          onChange={updateCommentForm}
        />
        <StyledButton type="submit">Submit</StyledButton>
      </form>

      <Snackbar
        open={showAlert}
        autoHideDuration={2000}
        onClose={handleClose}
        message={responseMessage}
      >
        <Alert severity="warning">{responseMessage}</Alert>
      </Snackbar>
    </>
  );
};
