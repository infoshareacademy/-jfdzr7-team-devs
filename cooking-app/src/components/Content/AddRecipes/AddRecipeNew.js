import { addDoc } from "firebase/firestore";
// import { RecipeForm } from "./RecipeForm copy 2";
import { createContext, useContext, useEffect, useState } from "react";
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
import { UserDataContext } from "../../../App";

export const SelectedTagsContext = createContext([]);
export const SelectedDietContext = createContext([]);
export const IngredientsContext = createContext([]);
export const PreparingContext = createContext([]);

const defaultRecipeValue = {
  author: {},
  name: "",
  description: "",
  ingredients: [],
  instructions: [],
  // comments: [],
  tags: [],
  specialDiets: [],
  time: { total: "" },
  servings: "",
  difficulty: "",
  image: [],
  isApproved: false,
};

export const AddRecipeNew = () => {
  const userData = useContext(UserDataContext);
  const [user, setUser] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [formValues, setFormValues] = useState(defaultRecipeValue);

  useEffect(() => {
    // console.log(userData);
    setUser(userData);
    setFormValues({ ...formValues, author: { user } });
  }, [userData]);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

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
          // author: { ...user },
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
  const [selectedTags, setSelectedTags] = useState([]);
  // useEffect(() => {
  //   console.log(selectedTags);
  // }, [selectedTags]);

  const handleChangeTags = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  ///multiple select diet
  const [selectedDiet, setSelectedDiet] = useState([]);
  const handleChangeDiet = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedDiet(typeof value === "string" ? value.split(",") : value);
  };

  // ingredients array
  const [ingredients, setIngredients] = useState([""]);
  const handleChangeIngredients = (e, index) => {
    const inputList = [...ingredients];
    // console.log(inputList);
    inputList[index] = e.target.value;
    setIngredients(inputList);
  };

  // useEffect(() => {
  //   console.log(ingredients);
  // }, [ingredients]);

  const handleAddTextInput = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, ""]);
  };

  // preparing method array
  const [methods, setMethods] = useState(["1 krok"]);
  const handleChangeMethods = (e, index) => {
    const inputList = [...methods];
    // console.log("methods-----", inputList);
    inputList[index] = e.target.value;
    setMethods(inputList);
  };
  const handleMethodAddTextInput = (e) => {
    e.preventDefault();
    setMethods([...methods, ""]);
  };
  // useEffect(() => {
  //   console.log("useEffect methods ------", methods);
  // }, [methods]);

  // onChange
  const changeFormValues = (e) => {
    switch (e.target.name) {
      case "name":
      case "description":

      case "servings":
      case "difficulty":
        setFormValues({
          ...formValues,
          [e.target.name]: e.target.value,
        });
        break;
      case "time":
        setFormValues({
          ...formValues,
          time: { total: e.target.value },
        });
        break;
      case "ingredients":
        setFormValues({
          ...formValues,
          ingredients: [...ingredients],
          author: { ...user },
        });
        break;
      case "instructions":
        setFormValues({
          ...formValues,
          instructions: [...methods],
        });
        break;
      case "tags":
        setFormValues({
          ...formValues,
          tags: e.target.value,
        });
        break;
      case "specialDiets":
        setFormValues({
          ...formValues,
          specialDiets: e.target.value,
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
    addDoc(recipesCollection, formValues)
      .then((response) => console.log(response))
      .catch((e) => {
        alert(firestoreErrorsCodes[e.code]);
      });
    alert("Recipe saved");
    setFormValues(defaultRecipeValue);
    e.target.reset();
  };

  return (
    <>
      <h2>Add Recipe</h2>
      <SelectedDietContext.Provider value={selectedDiet}>
        <PreparingContext.Provider value={methods}>
          <IngredientsContext.Provider value={ingredients}>
            <SelectedTagsContext.Provider value={selectedTags}>
              <RecipeForm2
                onChange={changeFormValues}
                onClick={uploadImage}
                handleSubmit={handleAddingRecipe}
                handlerTags={handleChangeTags}
                handlerIngredients={handleChangeIngredients}
                handlerAddInputIngredient={handleAddTextInput}
                handlerMethods={handleChangeMethods}
                handlerAddInputMethod={handleMethodAddTextInput}
                handlerDiet={handleChangeDiet}
              />
            </SelectedTagsContext.Provider>
          </IngredientsContext.Provider>
        </PreparingContext.Provider>
      </SelectedDietContext.Provider>
    </>
  );
};
