import { getData } from "../../../utils/getData"

import { AddPostToRecipe } from "./AddPostToRecipeMagda";

export const ListRecipes = () => {
    const dataImport = getData();
    return (
        <div>
            {dataImport.map(({id,title}) => (
                <li key={id}>{title}</li>
            ))}

            <AddPostToRecipe />
        </div>
    )
};
