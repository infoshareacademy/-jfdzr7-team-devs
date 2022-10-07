import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserDataContext } from "../../../../App";
import { IconButton, Button, Paper, Avatar } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";
import { v4 } from "uuid";
import {
  storageErrorsCodes,
  urlStorageAvatars,
  urlStorageAvatarsCD,
} from "../../../../api/firebaseIndex";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, storage, db } from "../../../../api/firebase";
import { deleteUser, signOut } from "firebase/auth";
import { ErrorAccount } from "./ErrorAccount";
import {
  StyledDispalyUserData,
  StyledUserPanel,
  StyledUserPanelTitle,
} from "./DisplayUserData.styled";
import { AdminStatus, StandardUserStatus } from "./UserStatus";

export const DisplayUserData = () => {
  const CurrentUser = useContext(UserDataContext);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarUrlId, setAvatarUrlId] = useState("");
  const [docRefUser, setDocRefUser] = useState(null);
  const [isUser, setIsUser] = useState(true);
  const userAvatarRef = ref(storage, `avatar/${currentUserData?.avatarUrlId}`);
  const user = auth.currentUser;

  useEffect(() => {
    setCurrentUserData(CurrentUser);
    setIsUser(true);
  }, [CurrentUser]);

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
    setDocRefUser(doc(db, "users", `${currentUserData?.uid}`));
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
      setCurrentUserData(userDataFromDB);
    });
  };

  const deleteAvatar = (e) => {
    updateDoc(docRefUser, {
      avatarUrl: "",
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
    deleteDoc(doc(db, "users", currentUserData?.uid));
    deleteUser(user).catch((e) => {
      alert(e);
    });
    setIsUser(false);
    // signOut(auth);
  };

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
                  {currentUserData?.role === "admin" ? (
                    <AdminStatus />
                  ) : (
                    <StandardUserStatus />
                  )}
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
