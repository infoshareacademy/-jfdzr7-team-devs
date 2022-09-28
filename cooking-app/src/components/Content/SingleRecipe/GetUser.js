import { singleUserCollection } from "../../../api/firebaseIndex";
import { onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { SubHeading} from "./SingleRecipe.styled"

export const GetUser = ({ userId }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(userId);
    const docRef = singleUserCollection(userId);
    onSnapshot(docRef, (doc) => {
      setUser(doc.data(), doc.userId);
    });
  }, [userId]);

  return (
    <>
      <SubHeading>
        By {user.firstName} {user.lastName}
      </SubHeading>
    </>
  );
};
