import styled from "styled-components";
import { Typography, Box, Button } from "@mui/material";

export const StyledList = styled.ol`
  margin: 0;
  padding: 0 25px;
`;
export const StyledListItemNumber = styled.li`
  color: var(--color-black);
  margin: 6px 0 20px 0;
`;

export const StyledImgMain = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 16px;
`;

export const StyledRecipeDetails = styled.div`
  padding: 0px 10px;
  text-align: center;
  border-right: 0.5px solid var(--color-light-gray);
  border-left: 0.5px solid var(--color-light-gray);
  margin: 0;
  margin-right: -1px;
`;

export const StyledWrapper = styled(Box)`
  flex-grow: 1;
  margin-bottom: 60px;
`;

export const StyledContainer = styled(Box)`
  display: flex;
`;

export const StyledSpecialTags = styled(Box)`
  && {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }
`;

export const StyledAuthor = styled(Box)`
  flex-grow: 1;
`;

export const StyledTags = styled(Button)`
  && {
    white-space: nowrap;
    margin: 8px 16px 8px 0;
  }
`;

export const StyledQuote = styled(Typography)`
  && {
    margin: 30px 0px;
  }
`;

export const StyledInfo = styled(Typography)`
  && {
    font-weight: 500;
  }
`;

export const StyledDetailedInfo = styled(Typography)`
  && {
    line-height: normal;
  }
`;

export const StyledRecipeContent = styled(Box)`
  && {
    margin: 20px 30px 0 42px;
  }
`;

export const StyledDetail = styled(Box)`
  && {
    display: flex;
    flex-wrap: nowrap;
    margin: 30px 0px;
  }
`;
