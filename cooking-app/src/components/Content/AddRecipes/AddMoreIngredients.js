import { Button } from "@mui/material";
import React from "react";
import { RecipeFormTextField } from "./RecipeFormTextField";

export const AddMoreIngredients = () => {
  return (
    <>
      <RecipeFormTextField label="Enter one ingredient:" name="ingredient" />
      <Button type="submit" variant="contained">
        Next ingredient
      </Button>
    </>
  );
};
