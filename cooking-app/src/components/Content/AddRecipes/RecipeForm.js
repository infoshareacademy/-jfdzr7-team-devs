import { Button } from "@mui/material";
import { useContext } from "react";
import { IngredientsContext, PreparingContext } from "./AddRecipeNew";
import { MultipleSelectTags } from "./MultipleSelectionTags";
import { RecipeFormTextField } from "./RecipeFormTextField";
import { SelectImageToUpload } from "./SelectImageToUpload";
import { SelectsBox } from "./SelectsBox";
import { TextFieldIngredients } from "./TextFieldIngredients";
import { TextFieldMethods } from "./TextFieldMethods";

export const RecipeForm2 = ({
  onChange,
  onClick,
  handleSubmit,
  handlerTags,
  handlerDiet,
  handlerIngredients,
  handlerMethods,
  handlerAddInputIngredient,
  handlerAddInputMethod,
}) => {
  const ingredients = useContext(IngredientsContext);
  const methods = useContext(PreparingContext);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <RecipeFormTextField label="Title" name="name" onChange={onChange} />
      <RecipeFormTextField
        label="Short description"
        name="description"
        onChange={onChange}
      />
      <SelectsBox onChange={onChange} />
      <div>
        <h3>Ingredients</h3>
        <p>Add one by one:</p>
        {ingredients.map((ingred, i) => {
          return (
            <TextFieldIngredients
              label="Enter one ingredient:" // ? nie może być labelki//  TO DO dostawić nagłówek
              name="ingredients"
              // value={ingred}
              onChange={onChange}
              handlerIngredients={(e) => handlerIngredients(e, i)}
            />
          );
        })}
        <Button onClick={handlerAddInputIngredient} variant="contained">
          Next ingredient{" "}
        </Button>
      </div>
      <div>
        <h3>How to prepare</h3>
        <p>Enter step by step:</p>
        {methods.map((method, i) => {
          return (
            <TextFieldMethods
              label="Enter one step:"
              name="instructions"
              onChange={onChange}
              handlerMethods={(e) => handlerMethods(e, i)}
            />
          );
        })}
        <Button onClick={handlerAddInputMethod} variant="contained">
          Next step
        </Button>
      </div>
      <MultipleSelectTags
        handlerTags={handlerTags}
        handlerDiet={handlerDiet}
        onChange={onChange}
      />
      <SelectImageToUpload
        onChange={onChange}
        onClick={onClick}
        text="textsAddRecipe"
      />
      <Button onClick={handleSubmit} variant="contained">
        Save recipe
      </Button>
    </form>
  );
};
