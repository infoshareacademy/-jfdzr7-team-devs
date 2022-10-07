import { Button } from "@mui/material";
import { useContext } from "react";
import { IngredientsContext, PreparingContext } from "./AddRecipeNew";
import { MultipleSelectTags } from "./MultipleSelectionTags";
import { RecipeFormTextField } from "./RecipeFormTextField";
import { SelectImageToUpload } from "./SelectImageToUpload";
import { SelectsBox } from "./SelectsBox";
import { TextFieldIngredients } from "./TextFieldIngredients";
import { TextFieldMethods } from "./TextFieldMethods";
import { StyledFormWrapper, StyledForm } from "./StyledAddRecipe.styled";

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
  isRecipeSent,
  handlerDeleteInputMethod,
}) => {
  const ingredients = useContext(IngredientsContext);
  const methods = useContext(PreparingContext);
  return (
    <StyledFormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <RecipeFormTextField label="Title" name="name" onChange={onChange} />
        <RecipeFormTextField
          label="Short description"
          name="description"
          placeholder="enter up to 500 characters..."
          onChange={onChange}
        />
        <SelectsBox onChange={onChange} />
        <div>
          <h3>Ingredients</h3>
          <p>Add one by one:</p>
          {ingredients.map((ingred, i) => {
            return (
              <TextFieldIngredients
                key={i}
                label="Enter one ingredient:"
                name="ingredients"
                onChange={onChange}
                handlerIngredients={(e) => handlerIngredients(e, i)}
              />
            );
          })}
          <Button onClick={handlerAddInputIngredient} variant="contained">
            Next ingredient{" "}
          </Button>
          <Button
            onClick={(e) => handlerDeleteInputMethod(e)}
            variant="contained"
          >
            Delete line
          </Button>
        </div>
        <div>
          <h3>How to prepare</h3>
          <p>Enter step by step:</p>
          {methods.map((method, i) => {
            return (
              <>
                <TextFieldMethods
                  key={i}
                  label="Enter one step:"
                  name="instructions"
                  onChange={onChange}
                  handlerMethods={(e) => handlerMethods(e, i)}
                />
              </>
            );
          })}
          <Button onClick={handlerAddInputMethod} variant="contained">
            Next step
          </Button>
          <Button
            onClick={(e) => handlerDeleteInputMethod(e)}
            variant="contained"
          >
            Delete line
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
        <Button
          type="submit"
          disabled={isRecipeSent}
          variant="contained"
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          Save recipe
        </Button>
      </StyledForm>
    </StyledFormWrapper>
  );
};
