import { Alert } from "@mui/material";

export const defaultRecipeValue = {
  author: "",
  name: "",
  description: "",
  ingredients: [],
  instructions: [],
  tags: [],
  specialDiets: [],
  time: { total: "" },
  servings: "",
  difficulty: "",
  image: [],
  isApproved: false,
};

export const SuccessAddRecipe = () => {
  return (
    <Alert severity="success" variant="outlined">
      <p> Thank You ! Your Recipe Will Be Checked By the Administrator ! </p>
    </Alert>
  );
};
export const PhotoRequired = () => {
  return (
    <Alert severity="warning" variant="outlined">
      {" Photo Is Required"}
    </Alert>
  );
};
