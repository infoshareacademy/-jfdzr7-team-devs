import { addDoc } from "firebase/firestore";
import { RecipeForm } from "./RecipeForm copy 2";
import { useEffect, useState } from "react";
import { storage } from "../../../api/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import {
  urlStorage,
  urlStorageCD,
  folderStorage,
  recipesCollection,
} from "../../../api/firebaseIndex";
import { textsRecipe, defaultRecipe } from "./RecipeHelper";
import {
  firestoreErrorsCodes,
  storageErrorsCodes,
} from "../../../api/firebaseIndex";
import { RecipeForm2 } from "./RecipeForm";

export const AddRecipe = () => {
  const [imageRef, setImageRef] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [formValues, setFormValues] = useState(defaultRecipe);

  useEffect(() => {
    setImageRef(ref(storage, `${folderStorage}/${imageUpload?.name + v4()}`));
  }, [imageUpload]);

  const uploadImage = (e) => {
    e.preventDefault();
    if (!imageUpload) return;
    uploadBytes(imageRef, imageUpload)
      .then((response) => {
        alert("Image uploaded");
        setFormValues({
          ...formValues,
          url: [
            ...formValues.url,
            `${urlStorage}${response.metadata.name}${urlStorageCD}`,
          ],
        });
      })
      .catch((e) => {
        alert(storageErrorsCodes[e.code]);
      });
  };

  const changeFormValues = (e) => {
    switch (e.target.name) {
      case "title":
      case "time":
      case "portion":
      case "ingredients":
      case "describe":
        setFormValues({
          ...formValues,
          [e.target.name]: e.target.value,
        });
        break;
      case "salt":
      case "sweet":
      case "dinner":
      case "lunch":
      case "dessert":
      case "breakfast":
        setFormValues({
          ...formValues,
          categories: [...formValues.categories, e.target.value],
        });
        break;
      case "file":
        setImageUpload(e.target.files[0]);
      default:
        console.log("sth goes wrong");
    }
  };

  const handleAddingRecipe = (e) => {
    e.preventDefault();
    addDoc(recipesCollection, formValues).catch((e) => {
      alert(firestoreErrorsCodes[e.code]);
    });
    alert("Recipe saved");
    setFormValues(defaultRecipe);
    e.target.reset();
  };

  return (
    <>
      <h2> {textsRecipe.addRecipe.header}</h2>
      <RecipeForm
        handleSubmit={handleAddingRecipe}
        onChange={changeFormValues}
        formValues={formValues}
        onClick={uploadImage}
      />
      <hr></hr>
      <RecipeForm2 />
    </>
  );
};
