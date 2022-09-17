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
    folderStorage,
    recipesCollection,
} from "../../../api/firebaseIndex";
import { textsRecipe } from "./RecipeHelper"
import { firestoreErrorsCodes, storageErrorsCodes } from "../../../api/firebaseIndex"

export const AddRecipe = () => {
    const defaultRecipe = {
        title: "",
        time: "",
        portion: "",
        ingredients: "",
        describe: "",
        url: [],
        categories: [],
        recipeTimestamp: Timestamp.fromDate(new Date()).toDate(),
        author: " {name, email} z Context (jak zmergujemy)",
        posts:[],
    }

    // consol // Thu Sep 15 2022 13:34:02 GMT+0200 (czas środkowoeuropejski letni)
    // Firebase // September 15,2022 at 110:03:18 AM UTC+2

    const timestampDate = Timestamp.fromDate(new Date()).toDate()
    console.log(timestampDate)

    const transformTimeStamp = () => {
        timestampDate
    }
    console.log(transformTimeStamp())

    const [imageUpload, setImageUpload] = useState(null)
    const [formValues, setFormValues] = useState(defaultRecipe)

    const uploadImage = (e) => {
        e.preventDefault()
        if (imageUpload === null) return;
        const imageRef = ref(storage, `${folderStorage}/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload)
            .then((response) => {
                console.log("response Upload ----------", response)
                alert("Image uploaded")
                setFormValues({
                    ...formValues,
                    url: [...formValues.url, `${urlStorage}${response.metadata.name}${urlStorageCD}`]
                });
            })
            .catch(e => {
                alert(storageErrorsCodes[e.code])
            })
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
                    categories: [...formValues.categories, e.target.value]
                });
                break;
            case "file":
                setImageUpload(e.target.files[0])
            default:
                console.log("coś poszło nie tak")
        }
    }

    useEffect(() => {
        console.log(formValues)
    })

    const handleAddingRecipe = (e) => {
        e.preventDefault()
        addDoc(recipesCollection, formValues)
            .then(response => console.log(response))
            .catch(e => {
                console.log(e)
                alert(firestoreErrorsCodes[e.code])
            })
        alert("Przepis zapisano")
        setFormValues(defaultRecipe)
        e.target.reset()
    }

    return (
        <>
            <h2> {textsRecipe.addRecipe.header}</h2>
            <RecipeForm
                handleSubmit={handleAddingRecipe}
                onChange={changeFormValues}
                formValues={formValues}
                onClick={uploadImage} />
        </>
    )
}