import styled from "styled-components";
import { StyledLink } from "../../../utils/styles/Global.styled";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom"

export const StyledCommentItem = styled.div`
  margin-bottom: 20px;
`;

export const StyledCommentInput = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
`;

export const StyledComment = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid lightgray;
  padding: 20px 0;
`;
export const StyledAuthorLink = styled(Link)`
  display: flex;
`;

export const StyledCommentAuthor = styled.div`
  padding: 20px 0;
`;

export const StyledCommentSection = styled.div`
  margin-left: 80px;
`;
export const StyledAvatar = styled(Avatar)`
  margin: 20px;
`;
export const StyledCommentText = styled.p`
  margin: 0 0 15px 0;
`;

export const StyledUploadImageSection = styled.div`
  background-color: var(--color-main-light-gray);
  padding: 20px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledAuthorName = styled.h3`
  color: var(--color-black);
  margin: 0px;
`;

export const StyledParagraph = styled.p`
  color: var(--color-light-gray);
  margin: 20px 0;
`;
export const StyledList = styled.ol`
  margin: 0;
  padding: 0 25px;
`;
export const StyledListItemNumber = styled.li`
  color: var(--color-black);
  margin: 20px 0;
`;

export const StyledListItem = styled(StyledListItemNumber)`
  color: var(--color-black);
  list-style-type: none;
  margin: 20px 0;
`;

export const StyledDate = styled(StyledParagraph)`
  margin: 0;
`;
export const StyledImg = styled.img`
  height: 150px;
  width: 150px;
  object-fit: cover;
  cursor: pointer;
`;

export const StyledDialog = styled.dialog`
  box-shadow: 0 8px 6px -6px black;
  position: static;
  left: 20%;
  top: 10%;
`;

export const StyledImgMain = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 16px;
`;
export const StyledUpladContainer = styled.div`
  width: 160px;
`;
export const StyledUpladImg = styled(StyledUpladContainer)`
  background-position: center;
  background-size: cover;
  width: 160px;
  height: 160px;
  margin-bottom: 20px;
`;

////////////////////
export const StyledCommentContainer = styled.div`
  padding: 25px;
`;

export const StyledRecipeContainer = styled.div`
  display: flex;
  margin-bottom: 48px;
`;

export const StyledRecipeDescription = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
`;
export const StyledRecipeDescriptionDetails = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 30px 0;
`;

export const StyledRecipeDescriptionQuote = styled(StyledRecipeDescription)`
  font-style: italic;
  margin: 40px 0px;
`;

export const StyledNutritionsSection = styled.div`
  background-color: var(--color-main-light-gray);
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 24px;
`;
export const StyledNutritionsList = styled(StyledNutritionsSection)`
  background-color: var(--color-gra);
  padding: 0;
`;

export const StyledNutritions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  border-bottom: 1px solid var(--color-gray);
`;

export const StyledRecipeDetails = styled.div`
  padding: 0px 20px;
  text-align: center;
  border-right: 0.5px solid var(--color-light-gray);
  border-left: 0.5px solid var(--color-light-gray);
  margin: 0;
  margin-right: -1px;
`;

export const StyledAsideRecipe = styled.div`
  width: 40%;
  padding: 0 25px;
`;

export const StyledMainContent = styled.div`
  width: 60%;
  padding: 0 25px;
`;

export const SubHeading = styled.p`
  text-transform: uppercase;
  font-weight: 500;
`;

export const SubHeadingBig = styled(SubHeading)`
  font-size: 25px;
`;

export const SubHeadingMedium = styled(SubHeading)`
  font-size: 20px;
  margin: 40px 0 0 0;
`;

export const SubHeadingSmall = styled(SubHeading)`
  padding: 5px;
  margin: 0;
`;
export const StyledDetailedInfo = styled.p`
  padding: 0;
  margin: 0;
  color: var(--color-gray);
`;

export const StyledTags = styled(StyledLink)`
  text-transform: uppercase;
  color: var(--color-black);
  background-color: transparent;
  box-shadow: none;
  white-space: nowrap;
  border: 1px solid var(--color-orange);
  margin: 8px 16px 8px 0px;
`;

export const StyledTagsDiet = styled(StyledLink)`
  text-transform: uppercase;
  box-shadow: none;
  white-space: nowrap;
  margin: 8px 16px 8px 0px;
`;
