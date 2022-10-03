import React from "react";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UserDataContext } from "../../../App";
import { IconButton, Button, Paper, Avatar } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";
import { v4 } from "uuid";
import { storageErrorsCodes } from "../../../api/firebaseIndex";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../api/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../api/firebase";

const defaultAvatar =
  "https://firebasestorage.googleapis.com/v0/b/devs-project-edf3a.appspot.com/o/avatar%2Favatar%20default.jpg8d69a1ee-c52d-4004-83a4-d5efa733c5ab?alt=media&token=78be46ed-8666-41d2-b987-b8782d27da63";

const urlStorageAvatars =
  "https://firebasestorage.googleapis.com/v0/b/devs-project-edf3a.appspot.com/o/avatar%2F";
const urlStorageAvatarsCD =
  "?alt=media&token=447796ed-bf03-404d-902f-ab81082e8c0d";

export const DisplayUserData = () => {
  const CurrentUser = useContext(UserDataContext);
  // console.log("-test useContext-", CurrentUser); // null
  // console.log("-test 2 useContext-", CurrentUser?.uid); // undefined

  const [currentUserData, setCurrentUserData] = useState(null);
  useEffect(() => {
    console.log("--useEffect CurrentUser-", CurrentUser); //null
    setCurrentUserData(CurrentUser);
  }, [CurrentUser]);

  const [imageUpload, setImageUpload] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarUrlId, setAvatarUrlId] = useState("");

  const handlerImageUpload = (e) => {
    setImageUpload(e.target.files[0]);
  };

  const uploadImage = (e) => {
    e.preventDefault();
    if (!imageUpload) return;
    const imageRef = ref(storage, `${"avatar"}/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then((response) => {
        setAvatarUrl(
          `${urlStorageAvatars}${response.metadata.name}${urlStorageAvatarsCD}`
        );
        setAvatarUrlId(response.metadata.name);
      })
      .catch((e) => {
        alert(storageErrorsCodes[e.code]);
      });
  };

  const [docRefUser, setDocRefUser] = useState(null);
  useEffect(() => {
    setDocRefUser(doc(db, "users", `${currentUserData?.uid}`)); //  "B3pOmEurN6QdAhSogtO2XEQvo9s1"  avatar test avatar@avatar.pl
  }, [currentUserData]);

  const UpdateUserAvatar = (e) => {
    updateDoc(docRefUser, {
      avatarUrl: avatarUrl,
      avatarUrlId: avatarUrlId,
    }).catch((e) => alert(e));
    setAvatarUrl(null);
    setImageUpload(null); // ostatnie
    alert("avatar updated");
    getDoc(docRefUser).then((dataDB) => {
      const userDataFromDB = dataDB.data();
      console.log(userDataFromDB);
      setCurrentUserData(userDataFromDB);
      // setIsCustomAvatar(true);
    });
  };

  // import { getStorage, ref, deleteObject } from "firebase/storage";

  // const storage = getStorage();

  // // Create a reference to the file to delete
  // const desertRef = ref(storage, 'images/desert.jpg');

  // // Delete the file
  // deleteObject(desertRef).then(() => {
  //   // File deleted successfully
  // }).catch((error) => {
  //   // Uh-oh, an error occurred!
  // });

  const userAvatarRef = ref(storage, `avatar/${currentUserData?.avatarUrlId}`);

  const deleteAvatar = (e) => {
    updateDoc(docRefUser, {
      avatarUrl: "", //defaultAvatar,
      avatarUrlId: "",
    }).catch((e) => alert(e));
    deleteObject(userAvatarRef).catch((e) => alert(e));

    alert("avatar deleted");
    getDoc(docRefUser).then((dataDB) => {
      const userDataFromDB = dataDB.data();
      console.log(userDataFromDB);
      setCurrentUserData(userDataFromDB);
    });
  };

  return (
    <>
      <h3>Twoje dane {currentUserData?.firstName}</h3>
      <StyledDispalyUserData>
        <Paper
          className="paper"
          elevation={6}
          sx={{
            m: 16,
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-around",
          }}
        >
          {avatarUrl ? (
            <>
              <CloseIcon
                onClick={() => {
                  setAvatarUrl(null);
                  deleteObject(userAvatarRef);
                }}
              />
              <img
                src={avatarUrl}
                alt="avatar"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  marginTop: "20px",
                  marginLeft: "20px",
                }}
              />
            </>
          ) : (
            <>
              {/* <img
              src={currentUserData?.avatarUrl}
              alt="avatar"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                marginTop: "24px",
              }}
            /> */}
              <Avatar
                alt={currentUserData?.firstName}
                src={currentUserData?.avatarUrl}
                sx={{
                  width: 200,
                  height: 200,
                  m: 2.5,
                }}
              />
            </>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h2>{currentUserData?.firstName}</h2>
              <p>{currentUserData?.email}</p>
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
                  onChange={handlerImageUpload}
                  // ref={imageInputRef}
                />
                <PhotoCamera />
              </IconButton>
              <Button
                onClick={uploadImage}
                variant="contained"
                disabled={!imageUpload}
              >
                Take a look ;)
              </Button>
            </div>
            <div
              style={{
                marginTop: "40px",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              <Button
                onClick={UpdateUserAvatar}
                variant="contained"
                style={{ margin: "16px" }}
                disabled={!avatarUrl}
              >
                Save Update
              </Button>

              <Button
                onClick={deleteAvatar}
                variant="contained"
                style={{ margin: "16px" }}
              >
                Delete Avatar
              </Button>
              <Button
                onClick={deleteAvatar}
                variant="contained"
                style={{ margin: "16px" }}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </Paper>
      </StyledDispalyUserData>

      {/* </div> */}
    </>
  );
};

const StyledDispalyUserData = styled.div`
  @media screen and (max-width: 500px) {
    .paper {
      margin: 4px;
    }
  }
`;
