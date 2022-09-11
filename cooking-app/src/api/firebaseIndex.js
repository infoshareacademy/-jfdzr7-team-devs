import { collection } from 'firebase/firestore'
import { db } from './firebase'

export const recipesCollection = collection(db, "recipes");

export const tags = [
    {
        key: "salt",
        label: "Salt"
    },
    {
        key: "sweet",
        label: "Sweet"
    },
    {
        key: "dinner",
        label: "Dinner"
    },
    {
        key: "lunch",
        label: "Lunch"
    },
    {
        key: "dessert",
        label: "Dessert"
    },
    {
        key: "breakfast",
        label: "Breakfast"
    },
]
export const urlStorage = "https://firebasestorage.googleapis.com/v0/b/devs-project-edf3a.appspot.com/o/images%2F"
export const urlStorageCD = "?alt=media&token=04d9d94b-f79a-434c-804d-7989ede403e1"
export const folderStorage = "/images"
export const collectionRecipesName = "recipes"
