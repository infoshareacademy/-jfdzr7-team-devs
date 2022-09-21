import { PageTitle, StyledButton } from "../../../utils/styles/Global.styled";
import { useState, useContext } from "react";
import { TextField, Snackbar, Alert, Button, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { db } from "../../../api/firebase";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { firestoreErrorsCodes } from "../../../api/firebaseIndex";
import { variantType } from "../../../utils/styles/muiStyles";
import { UserDataContext } from "../../../App";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { StyledCommentInput } from "./SingleRecipe.styled";

const defaultCommentForm = {
  author: "",
  comment: "",
  url: [],
};

export const AddComment = () => {
  const [commentForm, setCommentForm] = useState(defaultCommentForm);
  const userData = useContext(UserDataContext);
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
        author: userData?.firstName,
        authorId: userData?.uid,
        comment: commentForm.comment,
        commentTimeStamp: Timestamp.fromDate(new Date()).toDate(),
      }),
    })
      .then(() => {})
      .catch((e) => {
        setResponseMessage(e.code);
        setShowAlert(true);
      });
    setCommentForm(defaultCommentForm);
  };

  return (
    <>
      <form onSubmit={submitComment}>
        <StyledCommentInput>
          <TextField
            multiline
            placeholder="Add comment"
            variant={variantType.filled}
            value={commentForm.comment}
            name="comment"
            onChange={updateCommentForm}
            required
            fullWidth
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
        </StyledCommentInput>

        <Button variant="contained" type="submit">
          Submit
        </Button>
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
