import React from 'react'
import { useState } from 'react'
import { storage } from '../api/firebase'
import { ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"

export const StorageUpload = ({ folder, text }) => {
    console.log(folder)
    const [imageUpload, setImageUpload] = useState(null);
    console.log(imageUpload)
    const uploadImage = () => {
        if (imageUpload === null) return;
        const imageRef = ref(storage, `${folder}/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("image uploaded")
        })

    }
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