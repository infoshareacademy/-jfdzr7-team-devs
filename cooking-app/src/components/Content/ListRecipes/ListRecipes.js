import { getData } from "../../../utils/getData"

export const ListRecipes = () => {
    const dataImport = getData();

    return (
        <div>
            {dataImport.map(({id,title}) => (
                <li key={id}>{title}</li>
            ))}
        </div>
    )
}