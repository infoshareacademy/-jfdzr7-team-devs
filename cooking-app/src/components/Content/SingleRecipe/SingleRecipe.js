import { PageTitle } from "../../styles/Global.styled";
import { useParams } from "react-router-dom";
import { GetData } from "../../../utils/GetData";

export const SingleRecipe = () => {
    const recipies = GetData();
    const idCurrent = useParams()

    return (
        <>
            {recipies.map((recipie) => {
                
            if (recipie.id === idCurrent.id) {
                return (
                    <div key={recipie.id}>
                        <img src={recipie.url} alt={`${recipie.title} image`} />
                        <PageTitle>{recipie.title}</PageTitle>
                        <p>Categories: 
                            {recipie.categories.map((category, index) => 
                            <li key={index}>{category}</li>)}
                        </p>
                        <p>Time: {recipie.time}</p>
                        <p>Portions: {recipie.portion}</p>
                        <p>Ingredients: {recipie.ingredients}</p>
                        <p>How to prepare? {recipie.describe}</p>
                    </div>
                )}
            })}
        </>
    )
}
