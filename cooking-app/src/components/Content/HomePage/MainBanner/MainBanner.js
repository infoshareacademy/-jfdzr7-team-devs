import { Loader } from "../../../../utils/Loader";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { recipesCollection } from "../../../../api/firebaseIndex";
import { StyledBanner, BannerContent } from "../MainBanner/MainBanner.styled";
import { StyledTitle, StyledLink } from "../../../styles/Global.styled";

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
      {!dailyRecipe ? (
        <Loader />
      ) : (
        <StyledBanner
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(71,71,71,1) 0%, rgba(255,255,255,0) 50%), url(${dailyRecipe.url}`,
          }}
        >
          <BannerContent>
            <StyledTitle>{dailyRecipe.title}</StyledTitle>
            <StyledLink to={`/recipe/${dailyRecipe.id}`}>
              Get the recipe
            </StyledLink>
          </BannerContent>
        </StyledBanner>
      )}
    </>
  );
};
