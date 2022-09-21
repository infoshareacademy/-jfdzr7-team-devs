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
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { firestoreErrorsCodes } from "../../../api/firebaseIndex";
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
  const idCurrent = useParams();

  const docRef = doc(db, "recipes", idCurrent.id);

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
        alert([e.code]);
      });
  };

  console.log(commentForm.url[0])

  const handleChange = (e) => {
    switch (e.target.name) {
      case "comment":
        setCommentForm({
          ...commentForm,
          [e.target.name]: e.target.value,
        });
        break;
        case "file":
          setImageUpload(e.target.files[0]);
        default:
          console.log("coś poszło nie tak");
        }
 
    let imageDisplay = URL.createObjectURL(e.target.files[0]);
    setFile(imageDisplay);
    console.log(imageDisplay);
  };

  useEffect(() => {
    console.log(commentForm);
  });

  const submitComment = (e) => {
    e.preventDefault();
    updateDoc(docRef, {
      comments: arrayUnion({
        author: userData?.firstName,
        authorId: userData?.uid,
        comment: commentForm.comment,
        commentTimeStamp: Timestamp.fromDate(new Date()).toDate(),
        url: commentForm.url[0],
      }),
    })
      .then(() => {})
      .catch((e) => {
        setResponseMessage(e.code);
        setShowAlert(true);
      });
    setCommentForm(defaultCommentForm);
    setFile("");
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
            onChange={handleChange}/>
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
