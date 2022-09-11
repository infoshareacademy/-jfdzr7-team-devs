import { SelectImageToUpload } from "./SelectImageToUpload"

const tags = [
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


export const RecipeForm = ({ handleSubmit, onChange, formValues, onClick }) => {


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Tytuł: </label>
                    <input type="text" id="title" name="title" value={formValues.title} onChange={onChange} />
                </div>

                <div>
                    <label htmlFor="time">Czas przygotowania: </label>
                    <input type="text" id="time" name="time" value={formValues.time} onChange={onChange} />
                </div>

                <div>
                    <label htmlFor="portion">Liczba porcji: </label>
                    <input type="text" id="portion" name="portion" value={formValues.portion} onChange={onChange} />
                </div>

                <div>
                    <label htmlFor="ingredients">Składniki: </label>
                    <textarea type="textarea" id="ingredients" name="ingredients" rows="10" cols="50" value={formValues.ingredients} onChange={onChange} />
                </div>

                <div>
                    <label htmlFor="describe">Sposób przygotowania: </label>
                    <textarea type="textarea" id="describe" name="describe" rows="10" cols="50" value={formValues.describe} onChange={onChange} />
                </div>

                <div>
                    {tags.map((tag, index) => {
                        return (
                            <>
                                <label key={index} htmlFor={tag.key} >{tag.label}</label>
                                <input type="checkbox" id={tag.key} name={tag.key} value={tag.label} onChange={onChange} />
                            </>
                        )
                    })}
                </div>
                <br></br>
                <br></br>
                <SelectImageToUpload onClick={onClick} onChange={onChange} text={"Dodaj zdjęcie do Twojego przepisu"} />
                <br></br>
                <br></br>
                <button>Zapisz przepis</button>
            </form>
        </>

    )
}