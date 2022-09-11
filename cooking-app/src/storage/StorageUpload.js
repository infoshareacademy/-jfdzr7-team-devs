import React, { useEffect } from 'react'   // komponent nie używany ( jest w gitignore)
import { useState, createContext } from 'react'
import { storage } from '../api/firebase'
import { ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"

const urlStorage = "https://firebasestorage.googleapis.com/v0/b/devs-project-edf3a.appspot.com/o/images%2F"
const urlStorageCD = "?alt=media&token=04d9d94b-f79a-434c-804d-7989ede403e1"




export const StorageUpload = ({ folder, text }) => {
    // console.log(folder)
    const [imageUpload, setImageUpload] = useState(null);
    // console.log(imageUpload)

    const [url, setUrl] = useState([])


    const uploadImage = () => {
        if (imageUpload === null) return;
        const imageRef = ref(storage, `${folder}/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((response) => {
            console.log(response)
            alert("image uploaded")
            setUrl(`${urlStorage}${response.metadata.name}${urlStorageCD}`)
        })
    }

    // //consola
    // https://firebasestorage.googleapis.com/v0/b/devs-project-edf3a.appspot.com/o/images%2Fzurek-w-chlebie-13-263x153.jpgaa9fab21-9bbc-4a53-a077-c0238c51d8fc

    // // link firebase
    // https://firebasestorage.googleapis.com/v0/b/devs-project-edf3a.appspot.com/o/images%2Fzurek-w-chlebie-13-263x153.jpgaa9fab21-9bbc-4a53-a077-c0238c51d8fc?alt=media&token=04d9d94b-f79a-434c-804d-7989ede403e1
    // https://firebasestorage.googleapis.com/v0/b/devs-project-edf3a.appspot.com/o/images%2Fomlet-na-slono-3-263x153.png1fe17d3e-5405-423e-ab5c-563a02b17b2a?alt=media&token=a9e6072c-efa9-4a2a-86fc-65438e524100


    useEffect(() => {
        console.log(url)
    }, [url]);

    return (
        <>
            <h3>{text}</h3>
            <input
                type="file"
                onChange={(e) => setImageUpload(e.target.files[0])} />
            <button onClick={uploadImage}>Do Upload</button>
        </>
    )
}