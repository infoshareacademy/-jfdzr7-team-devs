import { addDoc, collection } from "firebase/firestore";
import { db } from "../api/firebase";
import { RecipeForm } from "./RecipeForm";
import { useState } from "react";
import { storage } from "../api/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const urlStorage = "https://firebasestorage.googleapis.com/v0/b/devs-project-edf3a.appspot.com/o/images%2F"
const urlStorageCD = "?alt=media&token=04d9d94b-f79a-434c-804d-7989ede403e1"
const folder = "/images"

export const AddRecipe = () => {
    const recipesCollection = collection(db, "recipes");
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
        const imageRef = ref(storage, `${folder}/${imageUpload.name + v4()}`);
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
        addDoc(recipesCollection, formValues)
        alert("Przepis zapisano")
    }

    return (
        <>
            <h2> Dodaj przepis</h2>
            <RecipeForm
                handleSubmit={handleAddingRecipe}
                onChange={changeFormValues}
                formValues={formValues}
                onClick={uploadImage} />
        </>
    )
}