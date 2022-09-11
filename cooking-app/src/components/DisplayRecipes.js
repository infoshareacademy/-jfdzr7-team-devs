import { useState, useEffect } from "react";
import { storage } from "../api/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";


const folder = "images/";

export const DisplayRecipes = () => {

    const [imageList, setImageList] = useState([])

    const imageListRef = ref(storage, "images/")
    // console.log(imageList)

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            // console.log(response)
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    // console.log(url)
                    setImageList((prev) => [...prev, url]);
                })
            })
        })
    }, [])


    return (
        <>
            <h3>Zdjęcia przepisów pobrane z Storage  "images/"</h3>
            {imageList && imageList.map((url) => {
                // console.log(imageList[0])
                return (
                    <div>
                        <img src={url} style={{ width: "300px", height: "200px" }}  ></img>
                    </div>
                )
            })
            }

        </>

    )
}
