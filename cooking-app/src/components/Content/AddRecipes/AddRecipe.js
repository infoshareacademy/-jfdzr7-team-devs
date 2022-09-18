import { addDoc, Timestamp, collection } from "firebase/firestore";
import { db } from "../../../api/firebase";
import { RecipeForm } from "./RecipeForm copy 2";
import { useEffect, useState } from "react";
import { storage } from "../../../api/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import {
  urlStorage,
  urlStorageCD,
  folderStorage, // images
  recipesCollection,
} from "../../../api/firebaseIndex";
import { textsRecipe } from "./RecipeHelper";
import {
  firestoreErrorsCodes,
  storageErrorsCodes,
} from "../../../api/firebaseIndex";

const defaultRecipe = {
  title: "",
  time: "",
  portion: "",
  ingredients: "",
  describe: "",
  url: [],
  categories: [],
  recipeTimestamp: Timestamp.fromDate(new Date()).toDate(),
  author: "",
  posts: [],
};

export const AddRecipe = () => {
  const [imageRef, setImageRef] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [formValues, setFormValues] = useState(defaultRecipe);

  // useEffect(() => {
  //   setImageRef(ref(storage, `${folderStorage}/${imageUpload?.name + v4()}`));
  //   console.log(imageRef);
  // }, [imageRef]);

  const uploadImage = (e) => {
    e.preventDefault();
    if (imageUpload === null) return;
    const imageRef = ref(
      storage,
      `${folderStorage}/${imageUpload.name + v4()}`
    );
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

  useEffect(() => {
    console.log(formValues);
  });

  const handleAddingRecipe = (e) => {
    e.preventDefault();
    addDoc(recipesCollection, formValues).catch((e) => {
      console.log(e);
      alert(firestoreErrorsCodes[e.code]);
    });
    alert("Przepis zapisano");
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
    </>
  );
};
