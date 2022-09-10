import styled from 'styled-components'
import { useState, useEffect } from "react";

const mainRecipe = [
    {
        id: 1,
        title: "Summer cheescake",
        heroMessage: "The best for garden party!",
        img: "https://www.cheesecake.pl/global/images/slides/2e25290fcb468889c457d0de54922344.jpg"
    }
]

const recipe = mainRecipe[0];

export const MainSlider = () => {

    return (
        <StyledSlider style={{backgroundImage: `url(${recipe.img}`}}>
            <SliderContent>
                <h2>{recipe.title}</h2>
                <p>{recipe.heroMessage}</p>
            </SliderContent>
        </StyledSlider>
    )
}



const StyledSlider = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 445px;
  margin-bottom: 20px;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const SliderContent = styled.div`
    padding-left: 60px;
`;