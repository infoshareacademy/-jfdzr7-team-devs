import { Loader } from "../../../../utils/Loader";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { recipesCollection } from "../../../../api/firebaseIndex";
import {
  StyledSlider,
  StyledBanner,
  BannerContent,
  StyledDescription,
  StyledTitle,
  StyledParagraph,
} from "../MainBanner/MainBanner.styled";
import { StyledLink } from "../../../../utils/styles/Global.styled";

export const MainBanner = () => {
  const [data, setData] = useState([]);

  const getDataFromSnapshot = (data) => {
    return data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

 

  useEffect(() => {
    onSnapshot(recipesCollection, (singleRecipe) => {
      setData(getDataFromSnapshot(singleRecipe));
    });
  }, []);

  const dailyRecipe = data[Math.floor(Math.random() * data.length)];

  return (
    <>
      {dailyRecipe ? (
        <StyledSlider>
          <StyledBanner url={dailyRecipe.image} />

          <StyledDescription>
            <StyledTitle>{dailyRecipe.name}</StyledTitle>
            <StyledParagraph>{dailyRecipe.metaDescription}</StyledParagraph>
            <StyledLink to={`/recipe/${dailyRecipe.id}`}>
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
