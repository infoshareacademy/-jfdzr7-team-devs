import { SelectImageToUpload } from "./SelectImageToUpload";
import { tags } from "../../../api/firebaseIndex";
import { textsRecipe } from "./RecipeHelper";
import { inputSelectAtributes } from "./RecipeHelper";
import {
  StyledCheckbox,
  StyledCheckboxAll,
  StyledDivCheckbox,
  StyledTitleInput,
  StyledTitleDiv,
  StyledInputsDivSelect,
  StyledInputsSelectDiv2,
  StyledOption,
  StyledRecipeForm,
  StyledSelect,
  StyledTextArea,
} from "./RecipeForm.styled";

export const RecipeForm = ({ handleSubmit, onChange, formValues, onClick }) => {
  return (
    <>
      <StyledRecipeForm onSubmit={handleSubmit}>
        <StyledTitleDiv>
          <label htmlFor="title">
            {textsRecipe.recipeForm.labelsTextInput.title}
          </label>
          <StyledTitleInput
            type="text"
            id="title"
            name="title"
            value={formValues.title}
            onChange={onChange}
            required
          />
        </StyledTitleDiv>
        <StyledInputsDivSelect>
          {inputSelectAtributes.map(({ key, label, options }) => {
            return (
              <StyledInputsSelectDiv2>
                <label htmlFor={key}>{label}</label>
                <StyledSelect
                  style={{ width: "300px" }}
                  id={key}
                  name={key}
                  onChange={onChange}
                  required
                >
                  {options.map(({ value, option }) => {
                    return <StyledOption value={value}>{option}</StyledOption>;
                  })}
                </StyledSelect>
              </StyledInputsSelectDiv2>
            );
          })}
        </StyledInputsDivSelect>
        <StyledTitleDiv>
          <label htmlFor="ingredients">
            {textsRecipe.recipeForm.labelsTextInput.ingredients}{" "}
          </label>
          <StyledTextArea
            type="textarea"
            id="ingredients"
            name="ingredients"
            rows="10"
            cols="50"
            value={formValues.ingredients}
            onChange={onChange}
            required
          />
        </StyledTitleDiv>
        <StyledTitleDiv>
          <label htmlFor="describe">
            {textsRecipe.recipeForm.labelsTextInput.describe}
          </label>
          <StyledTextArea
            type="textarea"
            id="describe"
            name="describe"
            rows="10"
            cols="50"
            value={formValues.describe}
            onChange={onChange}
            required
          />
        </StyledTitleDiv>
        <StyledCheckboxAll>
          {tags.map(({ key, label, index }) => {
            return (
              <StyledDivCheckbox>
                <label key={index} htmlFor={key}>
                  {label}
                </label>
                <StyledCheckbox
                  style={{ marginRight: "20px" }}
                  type="checkbox"
                  id={key}
                  name={key}
                  value={label}
                  onChange={onChange}
                />
              </StyledDivCheckbox>
            );
          })}
        </StyledCheckboxAll>

        <div>
          <SelectImageToUpload
            onClick={onClick}
            onChange={onChange}
            text={textsRecipe.recipeForm.fileInput}
          />
          <button
            style={{
              width: "120px",
              height: "50px",
              padding: "8px",
              marginTop: "16px",
            }}
          >
            {textsRecipe.recipeForm.buttonSave}
          </button>
        </div>
      </StyledRecipeForm>
    </>
  );
};
