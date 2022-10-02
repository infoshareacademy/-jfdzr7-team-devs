import { singleUserCollection } from "../../../api/firebaseIndex";
import { onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";


export const GetUser = ({ userId }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const docRef = singleUserCollection(userId);
    onSnapshot(docRef, (doc) => {
      setUser(doc.data(), doc.userId);
    });
  }, [userId]);

  return (
    <>
    {/* <Avatar alt={author} src={userData?.avatarUrl} /> */}
        By {user.firstName} {user.lastName}
    </>
  );
};
