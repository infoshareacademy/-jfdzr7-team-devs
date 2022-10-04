import { Loader } from "../../../../utils/Loader";
import { useState } from "react";
import {
  StyledDescription,
  StyledNavigation,
} from "../MainBanner/MainBanner.styled";
import { PageTitle } from "../../../../utils/styles/Global.styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton, Paper, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const MainBanner = ({ slides }) => {
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
        <Paper>
          <Paper
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              height: { md: "450px" },
              minHeight: { xs: "600px", md: "450px" },
              contain: "content",
              minWidth: "300px",
            }}
          >
            <Paper
              sx={{
                flex: 1,
                backgroundImage: `url(${slides[currentSlideIndex].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: { xs: "100%", md: "60%" },
              }}
            />

            <StyledDescription
              elevation={0}
              sx={{
                width: { xs: "100%", md: "40%" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <PageTitle style={{ fontSize: "40px", padding: "0" }}>
                {slides[currentSlideIndex].name}
              </PageTitle>
              <Typography variant="body1" sx={{my:2}}>
                {slides[currentSlideIndex].metaDescription}
              </Typography>
              <Box
                sx={{
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Button
                  variant="contained"
                  component={Link}
                  to={`/recipe/${slides[currentSlideIndex].id}`}
                >
                  Get the recipe
                </Button>
              </Box>
            </StyledDescription>

            <StyledNavigation>
            <IconButton aria-label="previous" onClick={goToPreviousSlide}>
              <ArrowBackIosNewIcon fontSize="large" />
            </IconButton>
            <IconButton aria-label="next" onClick={goToNextSlide}>
              <ArrowForwardIosIcon fontSize="large" />
            </IconButton>
          </StyledNavigation>
          </Paper>
        </Paper>
      ) : (
        <Loader />
      )}
    </>
  );
};
