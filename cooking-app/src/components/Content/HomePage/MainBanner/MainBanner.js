import { Loader } from "../../../../utils/Loader";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { recipesCollection } from "../../../../api/firebaseIndex";
import {
  StyledSlider,
  StyledBanner,
  StyledDescription,
  StyledTitle,
  StyledParagraph,
  StyledNavigation,
} from "../MainBanner/MainBanner.styled";
import { StyledLink } from "../../../../utils/styles/Global.styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";

export const MainBanner = ({ slides }) => {
  const [data, setData] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const goToNextSlide = () => {
    if (currentSlideIndex === slides.length - 1) {
      setCurrentSlideIndex(0);
    } else {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlideIndex === 0) {
      setCurrentSlideIndex(slides.length - 1);
    } else {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <>
      {slides ? (
        <StyledSlider>
          <StyledNavigation>
            <IconButton aria-label="previous" onClick={goToPreviousSlide}>
              <ArrowBackIosNewIcon fontSize="large" />
            </IconButton>
            <IconButton aria-label="next" onClick={goToNextSlide}>
              <ArrowForwardIosIcon fontSize="large" />
            </IconButton>
          </StyledNavigation>

          <StyledBanner url={slides[currentSlideIndex].image} />

          <StyledDescription>
            <StyledTitle>{slides[currentSlideIndex].name}</StyledTitle>
            <StyledParagraph>
              {slides[currentSlideIndex].metaDescription}
            </StyledParagraph>
            <StyledLink to={`/recipe/${slides[currentSlideIndex].id}`}>
              Get the recipe
            </StyledLink>
          </StyledDescription>
        </StyledSlider>
      ) : (
        <Loader />
      )}
    </>
  );
};
