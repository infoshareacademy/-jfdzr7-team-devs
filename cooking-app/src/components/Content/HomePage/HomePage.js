import { MainBanner } from "./MainBanner/MainBanner";
import styled from "styled-components";
import { HomePageSection } from "./HomePageSection";

const slides = [
  {
    name: "1 Turkey tonnato",
    metaDescription:
      "Jamie's turkey tonnato recipe is a brilliant twist on the Italian classic served with a tuna spiked mayo it is simply delicious.",
    image:
      "https://cdn.jamieoliver.com/recipe-database/oldImages/medium/1319_13_1412612063.jpg",
  },
  {
    name: "2 Mexican marinated pork tenderloin",
    metaDescription:
      "Find a delicious pork tenderloin recipe with Mexican marinade from Jamie Oliver; pork tenderloin is a lean and juicy cut of pork perfect for Sunday lunch",
    image:
      "https://cdn.jamieoliver.com/recipe-database/medium/74B9VPWGqs8BGNa_ee3BCy.jpg",
  },
  {
    name: "3 Arnold Bennett frittata",
    metaDescription:
      "Jamie's turkey tonnato recipe is a brilliant twist on the Italian classic served with a tuna spiked mayo it is simply delicious.",
    image: "https://cdn.jamieoliver.com/recipe-database/medium/134798615.jpg",
  },
];

const arr = ["Breakfast", "Mains", "Snacks", "Desserts"];

export const HomePage = () => {
  return (
    <StyledMain>
      <MainBanner slides={slides} />

      {arr.map((category, index) => {
        return <HomePageSection key={index} category={category} />;
      })}
    </StyledMain>
  );
};

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
`;
