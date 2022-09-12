import { GetData } from "../../../utils/GetData"
import { PageTitle } from "../../styles/Global.styled"

export const ListRecipes = () => {
    const dataImport = GetData();

    return (
        <>
            <PageTitle>Recipes</PageTitle>
            {dataImport.map(({id,title}) => (
                <li key={id}>{title}</li>
            ))}
        </>
    )
}