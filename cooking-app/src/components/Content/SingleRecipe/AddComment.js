import { useState, useContext, useRef } from "react";
import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import { TextField, Button, IconButton, Fab } from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";
import { Timestamp, addDoc } from "firebase/firestore";
import { storageErrorsCodes } from "../../../api/firebaseIndex";
import { variantType } from "../../../utils/styles/muiStyles";
import { UserDataContext } from "../../../App";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";
import {
  StyledCommentInput,
  StyledUploadImageSection,
  StyledForm,
  StyledUpladImg,
  StyledUpladContainer,
} from "./SingleRecipe.styled";
import { storage } from "../../../api/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import {
  urlStorage,
  urlStorageCD,
  folderStorage,
  commentsRecipeCollection,
} from "../../../api/firebaseIndex";

const defaultCommentForm = {
  author: "",
  authorId: "",
  comment: "",
  createdAt: "",
  url: [],
};

export const AddComment = () => {
  const [commentForm, setCommentForm] = useState(defaultCommentForm);
  const userData = useContext(UserDataContext);
  const [file, setFile] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageChoosen, setImageChoosen] = useState(true);
  const { id } = useParams();
  const imageInputRef = useRef();

  const docRef = commentsRecipeCollection(id);

  const uploadImage = (e) => {
    e.preventDefault();
    if (!imageUpload) return;
    const imageRef = ref(
      storage,
      `${folderStorage}/${imageUpload.name + v4()}`
    );
    uploadBytes(imageRef, imageUpload)
      .then((response) => {
        setImageChoosen(!imageChoosen);
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
          authorId: userData?.uid,
          createdAt: Timestamp.fromDate(new Date()).toDate(),
          url: [],
        });
        break;
      case "file":
        setImageChoosen(!imageChoosen);
        setImageUpload(e.target.files[0]);
        let imageDisplay = URL.createObjectURL(e.target.files[0]);
        setFile(imageDisplay);
        break;
      default:
        console.log("default");
    }
  };

  const submitComment = (e) => {
    e.preventDefault();
    addDoc(docRef, commentForm).catch((e) => {
      console.log(e);
    });
    setCommentForm(defaultCommentForm);
    setFile("");
    e.target.reset();
  };

  const handleStopUpload = (e) => {
    setFile("");
    setImageChoosen(!imageChoosen);
    imageInputRef.current.value = "";
  };

  return (
    <>
      <StyledForm onSubmit={submitComment}>
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
              ref={imageInputRef}
            />
            <PhotoCamera />
          </IconButton>
        </StyledCommentInput>

        {file.length > 0 && (
          <StyledUploadImageSection>
            <StyledUpladContainer>
              <Fab
                color="primary"
                aria-label="delate"
                size="small"
                style={{ float: "right" }}
                // onClick={handleStopUpload}
                disabled={imageChoosen}
              >
                <CloseIcon onClick={handleStopUpload} />
              </Fab>
              <StyledUpladImg style={{ backgroundImage: `url(${file})` }} />
              <Button
                variant="contained"
                fullWidth
                onClick={uploadImage}
                startIcon={<CheckIcon />}
                disabled={imageChoosen}
              >
                Confirm
              </Button>
            </StyledUpladContainer>
          </StyledUploadImageSection>
        )}

        <LoadingButton
          type="submit"
          loading={!imageChoosen}
          loadingIndicator="Submit comment"
          endIcon={<SendIcon />}
          variant="contained"
        >
          Submit comment
        </LoadingButton>
      </StyledForm>
    </>
  );
};
