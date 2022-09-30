import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const IndividualRecipe = ({singleRecipe}) => {
  return (
    <ul key={singleRecipe.id}>
    <NavLink to={`/recipe/${singleRecipe.id}`}>
    <li>{singleRecipe.title}</li>
    <StyledImg src={singleRecipe.url}></StyledImg>
    </NavLink>
  </ul>
  );
};

const StyledImg = styled.img`
max-width: 200px;
max-height: 200px;
text-align: center;
`

