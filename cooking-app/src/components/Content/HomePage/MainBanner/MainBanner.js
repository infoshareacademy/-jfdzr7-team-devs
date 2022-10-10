import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getDoc, onSnapshot, query } from "firebase/firestore";
import {
  bannerCollection,
  singleRecipeCollection,
} from "../../../../api/firebaseIndex";
import {
  StyledDescription,
  StyledNavigation,
  StyledSlider,
  StyledImg,
  StyledDescriptionText,
  BannerTitle,
  StyledText,
} from "../MainBanner/MainBanner.styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton, Paper, Button, Box, Typography } from "@mui/material";
import { Loader } from "../../../../utils/Loader";

export const MainBanner = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [datafromFirebase, setdatafromFirebase] = useState([]);

  const preventUpdate = useRef(false);

  useEffect(() => {
    if (!preventUpdate.current) {
      const q = query(bannerCollection);

      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          setdatafromFirebase([]);
          doc.data().bannerArray.forEach((id) => {
            getDoc(singleRecipeCollection(id)).then((recipe) => {
              setdatafromFirebase((current) => [
                ...current,
                { ...recipe.data(), id: id },
              ]);
            });
          });
        });
        preventUpdate.current = true;
      });
    }
  }, []);

  const goToNextSlide = () => {
    if (currentSlideIndex === datafromFirebase.length - 1) {
      setCurrentSlideIndex(0);
    } else {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlideIndex === 0) {
      setCurrentSlideIndex(datafromFirebase.length - 1);
    } else {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <>
      {datafromFirebase != 0 ? (
        <Paper sx={{ mb: 1.5}}>
          <StyledSlider
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              height: { sm: "450px" },
              maxHeight:{ xs:"600px", sm: "450px"}
            }}
          >
            <Paper
              sx={{
                flex: 1,
                width: { xs: "100%", sm: "50%", md:"50%" },
                height: { xs: "300px", sm: "450px" },
              }}
            >
              <StyledImg
                src={datafromFirebase[currentSlideIndex].image}
                alt={datafromFirebase[currentSlideIndex].name}
              />
            </Paper>

            <StyledDescription
              elevation={0}
              sx={{
                width: { xs: "100%", sm: "50%" , md: "50%"},
                textAlign: { xs: "center", md: "left" },
                pb: "30px",
                px: {xs:"10px", sm:"24px", md:"40px"},
                pt:"30px",
                backgroundColor: "secondary.main"
              }}
            >
              <StyledDescriptionText sx={{
                height: { xs:"200px",sm: "333px" },
                textAlign: "center"}}>
                <Typography 
                variant="styled" 
                sx={{fontSize: {xs: "24px", sm:"30px",md: "40px"}}}>
                  {datafromFirebase[currentSlideIndex].name}
                </Typography>

                <StyledText>
                  <Typography variant="body1" sx={{ my: 2 }}>
                    {datafromFirebase[currentSlideIndex].metaDescription}
                  </Typography>
                </StyledText>
              </StyledDescriptionText>
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Button
                  variant="contained"
                  component={Link}
                  to={`/recipe/${datafromFirebase[currentSlideIndex].id}`}
                  sx={{ whiteSpace: "nowrap", zIndex:"2" }}
                >
                  Check it!
                </Button>
              </Box>
            </StyledDescription>

            <StyledNavigation>
              <IconButton aria-label="previous" onClick={goToPreviousSlide}>
                <ArrowBackIosNewIcon fontSize="large"  color="primary"/>
              </IconButton>
              <IconButton aria-label="next" onClick={goToNextSlide}>
                <ArrowForwardIosIcon fontSize="large" color="primary"/>
              </IconButton>
            </StyledNavigation>
          </StyledSlider>
        </Paper>
      ) : (
        <Loader />
      )}
    </>
  );
};
