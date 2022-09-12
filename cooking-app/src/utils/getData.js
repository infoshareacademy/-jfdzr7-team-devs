import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { recipesCollection } from "../api/firebaseIndex";

const getDataFromSnapshot = data => {
    return data.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }))
}

export const GetData = () => {
    const [ data, setData ] = useState([]);
    useEffect(() => {
        onSnapshot(recipesCollection, singleRecipe => {
            setData(getDataFromSnapshot(singleRecipe))
        })
    },[])


    return data;
}