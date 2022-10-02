import { singleUserCollection } from "../../../api/firebaseIndex";
import { onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  StyledAuthorLink,
  StyledAvatar,
  StyledDate,
  StyledAuthorContainer,
} from "./SingleRecipe.styled";
import moment from "moment";

export const GetAuthor = ({ userId, createdAt }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const docRef = singleUserCollection(userId);
    onSnapshot(docRef, (doc) => {
      setUser(doc.data(), doc.userId);
    });
  }, [userId]);

  return (
    <StyledAuthorLink to={`/user/${user.uid}/added`}>
      <StyledAvatar alt={user.firstName} src={user.avatarUrl} />
      <StyledAuthorContainer>
        {user.firstName} {user.lastName}
        {createdAt && (
          <StyledDate>{moment(createdAt.toDate()).calendar()}</StyledDate>
        )}
      </StyledAuthorContainer>
    </StyledAuthorLink>
  );
};
