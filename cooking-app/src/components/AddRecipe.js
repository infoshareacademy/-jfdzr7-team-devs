import { addDoc, collection } from "firebase/firestore";
import { db } from "../api/firebase";
import { RecipeForm } from "./RecipeForm";
import { useState } from "react";
import { StorageUpload } from "../storage/StorageUpload";


export const AddRecipe = () => {

    const recipesCollection = collection(db, "recipes");
    const defaultFormValues = {
        title: "",
        time: "",
        portion: "",
        ingredients: "",
        describe: "",
    }

    const [formValues, setFormValues] = useState({})
    const changeFormValues = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }
    console.log(formValues)
    const handleAddingRecipe = (e) => {
        e.preventDefault()
        addDoc(recipesCollection, formValues)
        setFormValues(defaultFormValues)
        alert("Przepis zapisano")
    }


    return (
        <>
            <h2> Dodaj przepis</h2>
            <RecipeForm handleSubmit={handleAddingRecipe} onChange={changeFormValues} formValues={formValues} />

            <StorageUpload folder={"images"} text={"Dodaj zdjęcie do Twojego przepisu"} />
        </>
    )


}