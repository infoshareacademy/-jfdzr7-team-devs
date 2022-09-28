import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../../api/firebase";
import { getDataFromSnapshot } from "../../../utils/GetDataFromSnapshot";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../../App";
import { Button } from "@mui/material";

const usersCollection = collection(db, "users");

export const GetCurrentUserData = () => {
  const CurrentUser = useContext(UserDataContext);
  console.log("-test useContext-", CurrentUser); // null
  console.log("-test 2 useContext-", CurrentUser?.uid); // undefined

  const [currentUserData, setCurrentUserData] = useState(null);
  useEffect(() => {
    console.log("--useEffect CurrentUser-", CurrentUser); //null
    setCurrentUserData(CurrentUser);
  }, [CurrentUser]);

  useEffect(() => {
    console.log("--useEffect currentUserData-", currentUserData); //null
  }, [currentUserData]);

  const [docRefUser, setDocRefUser] = useState(null);
  useEffect(() => {
    setDocRefUser(doc(db, "users", `${currentUserData?.uid}`)); //  "B3pOmEurN6QdAhSogtO2XEQvo9s1"  avatar test avatar@avatar.pl
  }, [currentUserData]);
  useEffect(() => {
    console.log(docRefUser); //null
  }, [docRefUser]);

  const refTest = doc(db, "users", "B3pOmEurN6QdAhSogtO2XEQvo9s1");
  console.log("---refTest----", refTest);

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

  // const [imageUpload, setImageUpload] = useState(null);
  // const [formValues, setFormValues] = useState(defaultRecipe);

  // useEffect(() => {
  //   setImageRef(ref(storage, `${folderStorage}/${imageUpload?.name + v4()}`));
  // }, [imageUpload]);

  // const uploadImage = (e) => {
  //   e.preventDefault();
  //   if (!imageUpload) return;
  //   uploadBytes(imageRef, imageUpload)
  //     .then((response) => {
  //       alert("Image uploaded");
  //       setFormValues({
  //         ...formValues,
  //         url: [
  //           ...formValues.url,
  //           `${urlStorage}${response.metadata.name}${urlStorageCD}`,
  //         ],
  //       });
  //     })
  //     .catch((e) => {
  //       alert(storageErrorsCodes[e.code]);
  //     });
  // };

  return (
    <>
      <h3>Test useContext: {CurrentUser?.firstName}</h3>
      <h3>User Panel</h3>
      {user && (
        <>
          <h3>Twoje dane {user.firstName}</h3>
          <div style={{ display: "flex" }}>
            <div>
              <img
                src={user.avatarUrl}
                alt="avatar"
                style={{ width: "240px", height: "220px" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <p>Name:{user.firstName}</p>
                <p>Lastname: {user.lastName}</p>
                <p>E-mail: {user.email}</p>
              </div>
              <Button variant="contained"> Add your own Avatar </Button>
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
