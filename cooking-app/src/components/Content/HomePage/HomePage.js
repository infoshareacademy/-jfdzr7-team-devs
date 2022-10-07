import { MainBanner } from "./MainBanner/MainBanner";
import { HomePageSection } from "./HomePageSection";
import { Box } from "@mui/material";

const arr = ["Breakfast", "Mains", "Snacks", "Desserts"];

export const HomePage = () => {
  return (
    <Box>
      <MainBanner />
      {arr.map((category, index) => {
        return <HomePageSection key={index} category={category} />;
      })}
    </Box>
  );
};
