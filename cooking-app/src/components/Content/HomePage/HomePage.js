import { MainBanner } from "./MainBanner/MainBanner";

const slides = [
  {
    name: "Turkey tonnato",
    metaDescription:
      "Jamie's turkey tonnato recipe is a brilliant twist on the Italian classic served with a tuna spiked mayo it is simply delicious.",
    image:
      "https://cdn.jamieoliver.com/recipe-database/oldImages/medium/1319_13_1412612063.jpg",
  },
  {
    name: "Mexican marinated pork tenderloin",
    metaDescription:
      "Find a delicious pork tenderloin recipe with Mexican marinade from Jamie Oliver; pork tenderloin is a lean and juicy cut of pork perfect for Sunday lunch",
    image:
      "https://cdn.jamieoliver.com/recipe-database/medium/74B9VPWGqs8BGNa_ee3BCy.jpg",
  },
  {
    name: "Arnold Bennett frittata",
    metaDescription:
      "Jamie's turkey tonnato recipe is a brilliant twist on the Italian classic served with a tuna spiked mayo it is simply delicious.",
    image:
      "https://cdn.jamieoliver.com/recipe-database/medium/134798615.jpg",
  },
];

export const HomePage = () => {
  return <MainBanner slides={slides} />;
};
