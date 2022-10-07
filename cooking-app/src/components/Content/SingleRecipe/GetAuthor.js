import { singleUserCollection } from "../../../api/firebaseIndex";
import { onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  StyledAuthorLink,
  StyledAvatar,
  StyledDate,
  StyledAuthorContainer,
  StyledAuthorSection
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
    <StyledAuthorSection>
      <StyledAvatar alt={user.firstName} src={user.avatarUrl} />
      <StyledAuthorContainer>
      <StyledAuthorLink to={`/user/${user.uid}/added`}>
        {user.firstName} {user.lastName}
        </StyledAuthorLink>
        {createdAt && (
          <StyledDate>{moment(createdAt.toDate()).calendar()}</StyledDate>
        )}
      </StyledAuthorContainer>
      </StyledAuthorSection>
  );
};
