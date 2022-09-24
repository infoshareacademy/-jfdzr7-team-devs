import styled from "styled-components";
import { Card, Paper, Box } from "@mui/material";

export const StyledRecipeSection = styled.div`
  flex: 1 0 50%;
  overflow-y: auto;
  background: green;
  padding: 30px;
`;

export const StyledCommentInput = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
`;

export const StyledComment = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid lightgray;
`;

export const StyledUploadImageSection = styled.div`
  background-color: var(--color-main-light-gray);
  padding: 20px;
`;

export const StyledForm = styled.form`
  /* background-color: lightsalmon; */
  display: flex;
  flex-direction: column;
  width: 100%;
`;


