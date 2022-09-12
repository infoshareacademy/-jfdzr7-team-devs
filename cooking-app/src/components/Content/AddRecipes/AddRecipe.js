import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../api/firebase";
import { RecipeForm } from "./RecipeForm";
import { useState } from "react";
import { storage } from "../../../api/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { urlStorage, urlStorageCD, folderStorage, collectionRecipesName, tags } from "../../../api/firebaseIndex";


export const AddRecipe = () => {
    const recipesCollection = collection(db, collectionRecipesName);
    const defaultRecipe = {
        title: "",
        time: "",
        portion: "",
        ingredients: "",
        describe: "",
        url: [],
        categories: []
    }
    const [imageUpload, setImageUpload] = useState(null)
    const [formValues, setFormValues] = useState(defaultRecipe)

    const uploadImage = (e) => {
        e.preventDefault()
        if (imageUpload === null) return;
        const imageRef = ref(storage, `${folderStorage}/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((response) => {
            alert("image uploaded")
            setFormValues({
                ...formValues,
                url: [...formValues.url, `${urlStorage}${response.metadata.name}${urlStorageCD}`]
            });
        })
    }

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
                    categories: [...formValues.categories, e.target.value]
                });
                break;
            case "file":
                setImageUpload(e.target.files[0])
            default:
                console.log("coś poszło nie tak")
        }
    }

    const handleAddingRecipe = (e) => {
        e.preventDefault()
        addDoc(recipesCollection, formValues).then(response => console.log(response))
        alert("Przepis zapisano")
        setFormValues(defaultRecipe)
    }

    return (
        <>
            <h2> Add Your Recipe</h2>
            <RecipeForm
                handleSubmit={handleAddingRecipe}
                onChange={changeFormValues}
                formValues={formValues}
                onClick={uploadImage} />
        </>
    )
}