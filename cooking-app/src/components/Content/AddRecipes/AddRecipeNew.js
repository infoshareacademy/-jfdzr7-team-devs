import { addDoc } from "firebase/firestore";
// import { RecipeForm } from "./RecipeForm copy 2";
import { createContext, useEffect, useState } from "react";
import { storage } from "../../../api/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import {
  urlStorage,
  urlStorageCD,
  folderStorage,
  recipesCollection,
} from "../../../api/firebaseIndex";
// import { textsRecipe, defaultRecipe } from "./RecipeHelper";
import {
  firestoreErrorsCodes,
  storageErrorsCodes,
} from "../../../api/firebaseIndex";
import { RecipeForm2 } from "./RecipeForm";

const defaultRecipeValue = {
  author: "Context",
  name: "",
  description: "",
  ingredients: [],
  instructions: [],
  comments: [],
  tags: [],
  time: "",
  servings: "",
  image: [],
  isApproved: false,
};

export const SelectedTagsContext = createContext([]);
export const IngredientsContext = createContext([]);

export const AddRecipeNew = () => {
  const [imageRef, setImageRef] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [formValues, setFormValues] = useState(defaultRecipeValue);

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  useEffect(() => {
    setImageRef(ref(storage, `${folderStorage}/${imageUpload?.name + v4()}`));
  }, [imageUpload]);

  // onClick
  const uploadImage = (e) => {
    e.preventDefault();
    if (!imageUpload) return;
    uploadBytes(imageRef, imageUpload)
      .then((response) => {
        alert("Image uploaded");
        setFormValues({
          ...formValues,
          image: [
            ...formValues.image,
            `${urlStorage}${response.metadata.name}${urlStorageCD}`,
          ],
        });
      })
      .catch((e) => {
        alert(e);
      });
  };
  // multiselect tags
  const [selectedTags, setSelectedTags] = useState(["tag"]);

  useEffect(() => {
    console.log(selectedTags);
  }, [selectedTags]);

  const handleChangeTags = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // ingredients array
  const [ingredients, setIngredients] = useState([""]);
  const handleChangeIngredients = (e, index) => {
    // const name = e.target;
    // const value = e.target.value;
    const inputList = [...ingredients];
    console.log(inputList);
    inputList[index] = e.target.value;
    setIngredients(inputList);
  };

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);

  const handleAddTextInput = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, ""]);
  };
  // onChange
  const changeFormValues = (e) => {
    switch (e.target.name) {
      case "name":
      case "description":
      case "time":
      case "servings":
      case "instructions":
        setFormValues({
          ...formValues,
          [e.target.name]: e.target.value,
        });
        break;
      case "ingredients":
        setFormValues({
          ...formValues,
          ingredients: [...ingredients],
        });
        break;
      case "tags":
        setFormValues({
          ...formValues,
          tags: [e.target.value],
        });
        break;
      case "file":
        setImageUpload(e.target.files[0]);
      default:
        console.log("sth goes wrong");
    }
  };

  //onSubmit
  const handleAddingRecipe = (e) => {
    e.preventDefault();
    // addDoc(recipesCollection, formValues).catch((e) => {
    //   alert(firestoreErrorsCodes[e.code]);
    // });
    alert("Recipe saved");
    setFormValues(defaultRecipeValue);
    e.target.reset();
  };

  return (
    <>
      <h2>Add Recipe</h2>
      <IngredientsContext.Provider value={ingredients}>
        <SelectedTagsContext.Provider value={selectedTags}>
          <RecipeForm2
            onChange={changeFormValues}
            onClick={uploadImage}
            onSubmit={handleAddingRecipe}
            handlerTags={handleChangeTags}
            handlerIngredients={handleChangeIngredients}
            handlerAddInputIngredient={handleAddTextInput}
          />
        </SelectedTagsContext.Provider>
      </IngredientsContext.Provider>
    </>
  );
};
