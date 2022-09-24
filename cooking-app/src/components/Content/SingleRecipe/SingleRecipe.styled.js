import styled from "styled-components";
import { Card, Paper, Box, CardMedia } from "@mui/material";

export const StyledRecipeSection = styled.div`
  flex: 1 0 50%;
  overflow-y: auto;
  background: green;
  padding: 30px;
`;

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
  margin-bottom: 10px;
`;

export const StyledParagraph = styled.p`
  color: var(--color-light-gray);
  margin: 20px 0;
`;
export const StyledDate = styled(StyledParagraph)`
  margin: 0;
`;
export const StyledImg = styled.img`
  height: 150px;
  width: 150px;
  object-fit: cover;
`;

export const StyledUpladContainer = styled.div`
width: 160px;
`;
export const StyledUpladImg = styled(StyledUpladContainer)`
background-position: center;
background-size: cover;
width: 160px;
height: 160px;
margin-bottom:20px;
`;
