import { onSnapshot, collection, updateDoc } from "firebase/firestore";
import { db } from "../../../api/firebase";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";
import { doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import {
  urlStorage,
  urlStorageCD,
  storageErrorsCodes,
} from "../../../api/firebaseIndex";
import { storage } from "../../../api/firebase";
import { v4 } from "uuid";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../../App";
import { Button } from "@mui/material";
import { SelectImageToUpload } from "../AddRecipes/SelectImageToUpload";

const usersCollection = collection(db, "users");

export const GetCurrentUserData = () => {
  const CurrentUser = useContext(UserDataContext);
  // console.log("-test useContext-", CurrentUser); // null
  // console.log("-test 2 useContext-", CurrentUser?.uid); // undefined

  const [currentUserData, setCurrentUserData] = useState(null);
  useEffect(() => {
    // console.log("--useEffect CurrentUser-", CurrentUser); //null
    setCurrentUserData(CurrentUser);
  }, [CurrentUser]);

  // useEffect(() => {
  //   console.log("--useEffect currentUserData-", currentUserData); //null
  // }, [currentUserData]);

  const [docRefUser, setDocRefUser] = useState(null);
  useEffect(() => {
    setDocRefUser(doc(db, "users", `${currentUserData?.uid}`)); //  "B3pOmEurN6QdAhSogtO2XEQvo9s1"  avatar test avatar@avatar.pl
  }, [currentUserData]);
  // useEffect(() => {
  //   console.log(docRefUser); //null
  // }, [docRefUser]);

  // const refTest = doc(db, "users", "B3pOmEurN6QdAhSogtO2XEQvo9s1");
  // console.log("---refTest----", refTest);

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!docRefUser) return;
    console.log("-----w docSnap --", docRefUser);
    // const docSnap = getDoc(refTest); //  docRefUser
    getDoc(docRefUser).then((dataDB) => {
      const userDataFromDB = dataDB.data();
      console.log(userDataFromDB);
      setUser(userDataFromDB);
    });
  }, [docRefUser]);
  useEffect(() => {
    console.log(user);
  }, [user]);
  ////////////
  const [imageUpload, setImageUpload] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const folderStorageAvatar = "avatar";

  const handlerImageUpload = (e) => {
    setImageUpload(e.target.files[0]);
  };
  useEffect(() => {
    console.log("--załadowane zdjęcie", imageUpload);
  }, [imageUpload]);

  useEffect(() => {
    setImageRef(
      ref(storage, `${folderStorageAvatar}/${imageUpload?.name + v4()}`)
    );
  }, [imageUpload]);

  useEffect(() => {
    console.log("--imageRef--", imageRef);
  }, [imageRef]);
  useEffect(() => {
    console.log("avatarUrl--", avatarUrl);
  }, [avatarUrl]);

  const urlStorageAvatars =
    "https://firebasestorage.googleapis.com/v0/b/devs-project-edf3a.appspot.com/o/avatar%2F";
  const urlStorageAvatarsCD =
    "?alt=media&token=447796ed-bf03-404d-902f-ab81082e8c0d";

  const uploadImage = (e) => {
    e.preventDefault();
    if (!imageUpload) return;
    uploadBytes(imageRef, imageUpload)
      .then((response) => {
        console.log("--response z storage--", response);
        alert("Image uploaded");
        setAvatarUrl(
          `${urlStorageAvatars}${response.metadata.name}${urlStorageAvatarsCD}`
        );
      })
      // })
      .catch((e) => {
        alert(storageErrorsCodes[e.code]);
      });
  };
  ///////

  const UpdateUserAvatar = (e) => {
    updateDoc(docRefUser, { avatarUrl: avatarUrl }).catch((e) => alert(e));
    alert("avatar updated");
    getDoc(docRefUser).then((dataDB) => {
      const userDataFromDB = dataDB.data();
      console.log(userDataFromDB);
      setUser(userDataFromDB);
    });
  };
  const defaultAvatar =
    "https://firebasestorage.googleapis.com/v0/b/devs-project-edf3a.appspot.com/o/avatar%2Favatar%20default.jpg8d69a1ee-c52d-4004-83a4-d5efa733c5ab?alt=media&token=78be46ed-8666-41d2-b987-b8782d27da63";
  const deleteAvatar = () => {
    updateDoc(docRefUser, { avatarUrl: defaultAvatar }).catch((e) => alert(e));
    alert("avatar deleted");
    getDoc(docRefUser).then((dataDB) => {
      const userDataFromDB = dataDB.data();
      console.log(userDataFromDB);
      setUser(userDataFromDB);
    });
  };

  return (
    <>
      <h3>Test useContext: {CurrentUser?.firstName}</h3>
      <h3>User Panel</h3>
      {user && (
        <>
          <h3>Twoje dane {user.firstName}</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "var(--color-little-light-gray)",
              height: "360px",
            }}
          >
            <div>
              <img
                src={user.avatarUrl}
                alt="avatar"
                style={{ width: "200px", height: "200px", borderRadius: "50%" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h2>{user.firstName}</h2>
                {/* <p>Lastname: {user.lastName}</p> */}
                <p>{user.email}</p>
              </div>
              <input
                onChange={handlerImageUpload}
                type="file"
                name="avatar"
              ></input>
              <Button onClick={uploadImage} variant="contained">
                Ładuj zdjęcie
              </Button>
              <Button onClick={UpdateUserAvatar} variant="contained">
                {" "}
                Edit dane - user Avatar{" "}
              </Button>
              <Button onClick={deleteAvatar} variant="contained">
                Delete Avatar
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );

  // if (docSnap) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // }

  //
  // useEffect(() => {
  //   onSnapshot(usersCollection, (us) => {
  //     setUsers(getDataFromSnapshot(us));
  //   });
  // }, []);
};
