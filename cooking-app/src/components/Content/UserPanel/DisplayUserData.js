import React from "react";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UserDataContext } from "../../../App";
import { IconButton, Button, Paper, Avatar } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";
import { v4 } from "uuid";
import {
  storageErrorsCodes,
  urlStorageAvatars,
  urlStorageAvatarsCD,
} from "../../../api/firebaseIndex";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { storage, db } from "../../../api/firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../../../api/firebase";
import { deleteUser, signOut } from "firebase/auth";
import { ErrorAccount } from "./ErrorAccount";
import {
  StyledDispalyUserData,
  StyledUserPanel,
  StyledUserPanelTitle,
} from "./DisplayUserData.styled";

//import { CustomAvatar } from "../../Header/CustomAvatar";

// const defaultAvatar =
// "https://firebasestorage.googleapis.com/v0/b/devs-project-edf3a.appspot.com/o/avatar%2Favatar%20default.jpg8d69a1ee-c52d-4004-83a4-d5efa733c5ab?alt=media&token=78be46ed-8666-41d2-b987-b8782d27da63";

// const urlStorageAvatars =
//   "https://firebasestorage.googleapis.com/v0/b/devs-project-edf3a.appspot.com/o/avatar%2F";
// const urlStorageAvatarsCD =
//   "?alt=media&token=447796ed-bf03-404d-902f-ab81082e8c0d";

export const DisplayUserData = () => {
  const CurrentUser = useContext(UserDataContext);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarUrlId, setAvatarUrlId] = useState("");
  const [docRefUser, setDocRefUser] = useState(null);
  const [isUser, setIsUser] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    //console.log("--useEffect CurrentUser-", CurrentUser);
    setCurrentUserData(CurrentUser);
    setIsUser(true);
  }, [CurrentUser]);

  // useEffect(() => {
  //   console.log(isUser);
  // }, [isUser]);

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

  useEffect(() => {
    setDocRefUser(doc(db, "users", `${currentUserData?.uid}`)); //  "B3pOmEurN6QdAhSogtO2XEQvo9s1"  avatar test avatar@avatar.pl
  }, [currentUserData]);

  const UpdateUserAvatar = (e) => {
    updateDoc(docRefUser, {
      avatarUrl: avatarUrl,
      avatarUrlId: avatarUrlId,
    }).catch((e) => alert(e));
    setAvatarUrl(null);
    setImageUpload(null);
    alert("avatar updated");
    getDoc(docRefUser).then((dataDB) => {
      const userDataFromDB = dataDB.data();
      // console.log(userDataFromDB);
      setCurrentUserData(userDataFromDB);
    });
  };

  const userAvatarRef = ref(storage, `avatar/${currentUserData?.avatarUrlId}`);

  const deleteAvatar = (e) => {
    updateDoc(docRefUser, {
      avatarUrl: "", //defaultAvatar,
      avatarUrlId: "",
    }).catch((e) => alert(storageErrorsCodes[e.code]));
    deleteObject(userAvatarRef).catch((e) => alert(e));

    alert("avatar deleted");
    getDoc(docRefUser).then((dataDB) => {
      const userDataFromDB = dataDB.data();
      console.log("---userDataFromDB---", userDataFromDB);
      setCurrentUserData(userDataFromDB);
    });
  };

  const handlerDeleteUser = () => {
    if (currentUserData?.avatarUrlId) {
      deleteObject(userAvatarRef).catch((e) => alert(e));
    }
    setIsUser(false);
    signOut(auth);

    deleteDoc(doc(db, "users", currentUserData?.uid));

    deleteUser(user).catch((e) => {
      alert(e);
    });
  };

  // {
  //   isUser ? UserPanel : <AccountError>;
  // }

  return (
    <>
      {isUser ? (
        <StyledUserPanel>
          <StyledUserPanelTitle>
            Twoje dane {currentUserData?.firstName}
          </StyledUserPanelTitle>
          <StyledDispalyUserData>
            <Paper
              className="paper"
              elevation={6}
              sx={{
                m: 16,
                marginTop: "20px",
                display: "flex",
                flexFlow: "row wrap",
                justifyContent: "space-around",
              }}
            >
              {avatarUrl ? (
                <div className="new_avatar">
                  <CloseIcon
                    sx={{
                      border: "1px solid black",
                      backgroundColor: "var(--color-orange)",
                    }}
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
                </div>
              ) : (
                <>
                  <Avatar
                    alt={currentUserData?.firstName}
                    src={currentUserData?.avatarUrl}
                    sx={{
                      width: 200,
                      height: 200,
                      m: 2.5,
                    }}
                  >
                    {`${currentUserData?.firstName.at(
                      0
                    )}${currentUserData?.lastName.at(0)}`}
                  </Avatar>
                </>
                // <CustomAvatar style={{ width: "200px", height: "200px" }} />
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
                    onClick={handlerDeleteUser}
                    variant="contained"
                    style={{ margin: "16px" }}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </Paper>
          </StyledDispalyUserData>
        </StyledUserPanel>
      ) : (
        <ErrorAccount />
      )}
    </>
  );
};

/// do pliku styled
// const StyledDispalyUserData = styled.div`
//   @media screen and (max-width: 500px) {
//     .paper {
//       margin: 0px;
//     }

//     img {
//       margin: 4px;
//       margin-top: 0;
//       margin-left: 0;
//     }

//     .new_avatar {
//       display: flex;
//       justify-content: center;
//     }
//   }
// `;

// const StyledUserPanel = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const StyledUserPanelTitle = styled.h2`
//   text-align: center;
//   font-family: "Playfair Display", sans-serif;
//   font-size: 30px;
//   font-weight: 600;
//   margin-bottom: 0;
// `;
