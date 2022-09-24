import { PageTitle, StyledButton } from "../../../utils/styles/Global.styled";
import { useState, useContext, useEffect } from "react";
import {
  TextField,
  Snackbar,
  Alert,
  Button,
  IconButton,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Card,
  CardActions,
  sizing,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { db } from "../../../api/firebase";
import { arrayUnion, doc, Timestamp, updateDoc, addDoc} from "firebase/firestore";
import {
  firestoreErrorsCodes,
  storageErrorsCodes,
  singleRecipeCollection,
} from "../../../api/firebaseIndex";
import { variantType } from "../../../utils/styles/muiStyles";
import { UserDataContext } from "../../../App";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { StyledCommentInput } from "./SingleRecipe.styled";
import { addDoc } from "firebase/firestore";
import { storage } from "../../../api/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import {
  urlStorage,
  urlStorageCD,
  folderStorage,
  recipesCollection,
  commentsRecipeCollection
} from "../../../api/firebaseIndex";

const defaultCommentForm = {
  author: "",
  authorId: "",
  comment: "",
  commentTimeStamp: "",
  url: [],
};

export const AddComment = () => {
  const [commentForm, setCommentForm] = useState(defaultCommentForm);
  const userData = useContext(UserDataContext);
  const [showAlert, setShowAlert] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [file, setFile] = useState("");
  const [imageRef, setImageRef] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const { id } = useParams();

  // const docRef = singleRecipeCollection(id);
  const docRef = commentsRecipeCollection(id)

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
    setResponseMessage("");
  };

  const uploadImage = (e) => {
    e.preventDefault();
    if (!imageUpload) return;
    const imageRef = ref(
      storage,
      `${folderStorage}/${imageUpload.name + v4()}`
    );
    uploadBytes(imageRef, imageUpload)
      .then((response) => {
        alert("Image uploaded");
        setCommentForm({
          ...commentForm,
          url: [
            ...commentForm.url,
            `${urlStorage}${response.metadata.name}${urlStorageCD}`,
          ],
        });
      })
      .catch((e) => {
        alert(storageErrorsCodes[e.code]);
      });
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "comment":
        setCommentForm({
          ...commentForm,
          [e.target.name]: e.target.value,
          author: userData?.firstName,
          authorId: userData?.uid,
          createdAt: Timestamp.fromDate(new Date()).toDate(),
          url: [],
        });
        break;
      case "file":
        setImageUpload(e.target.files[0]);
        let imageDisplay = URL.createObjectURL(e.target.files[0]);
        setFile(imageDisplay);
      default:
        console.log("sth goes wrong");
    }
  };

  // const submitComment = (e) => {
  //   e.preventDefault();
  //   updateDoc(docRef, {
  //     comments: arrayUnion(commentForm)
  //   })
  //     .then(() => {})
  //     .catch((e) => {
  //       setResponseMessage(e.code);
  //       setShowAlert(true);
  //     });
  //   setCommentForm(defaultCommentForm);
  //   setFile("");
  //   e.target.reset();
  // };

  const submitComment = (e) => {
    e.preventDefault();
   addDoc(docRef, commentForm).catch((e)=> {
    console.log(e);
   });
   alert("zapisano kementarz");
   setCommentForm(defaultCommentForm);
   e.target.rest();
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
            onChange={handleChange}
            required
            fullWidth
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              name="file"
              onChange={handleChange}
            />
            <PhotoCamera />
          </IconButton>
          <button onClick={uploadImage}>upload photo</button>
        </StyledCommentInput>

        {file.length > 0 && (
          <Card sx={{ width: 140 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={file}
              />
            </CardActionArea>
          </Card>
        )}

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


     {/* <Box sx={{ width: 140 }}>
              <Card sx={{ width: 140, mb: 2 }}>
                <CardActionArea style={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    // image={file}
                  />
                  <Fab color="primary" aria-label="add">
                    <DisabledByDefaultRoundedIcon />
                  </Fab>

                 
                </CardActionArea>
              </Card>

              <Button
                variant="contained"
                fullWidth
                onClick={uploadImage}
                startIcon={<CheckIcon />}
              >
                Confirm
              </Button>