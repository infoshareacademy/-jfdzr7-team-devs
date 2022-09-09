export const RecipeForm = ({ handleSubmit, onChange, formValues }) => {
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
                    <label htmlFor="sweet" >Na słodko</label>
                    <input type="checkbox" id="sweet" name="sweet" value="Na słodko" onChange={onChange} />

                    <label htmlFor="salt" >Na słono</label>
                    <input type="checkbox" id="salt" name="salt" value="Na słono" onChange={onChange} />

                    <label htmlFor="dinner" >Kolacja</label>
                    <input type="checkbox" id="dinner" name="dinner" value="Kolacja" onChange={onChange} />

                    <label htmlFor="lunch" >Obiad</label>
                    <input type="checkbox" id="lunch" name="lunch" value="Obiad" onChange={onChange} />

                    <label htmlFor="cake" >Ciasto</label>
                    <input type="checkbox" id="cake" name="cake" value="Ciasto" onChange={onChange} />

                    <label htmlFor="kids" > Dla dzieci</label>
                    <input type="checkbox" id="kids" name="kids" value="Dla dzieci" onChange={onChange} />

                    <label htmlFor="picnic" >Na piknik</label>
                    <input type="checkbox" id="picnic" name="picnic" value="Na piknik" onChange={onChange} />

                    <label htmlFor="friuts" >Owoce</label>
                    <input type="checkbox" id="fruits" name="fruits" value="Owoce" onChange={onChange} />

                    <label htmlFor="cocoa" >Kakao</label>
                    <input type="checkbox" id="cocoa" name="cocoa" value="Kakao" onChange={onChange} />

                    <label htmlFor="cream" >Śmietanka</label>
                    <input type="checkbox" id="cream" name="cream" value="Śmietanka" onChange={onChange} />

                    <label htmlFor="honey" >Miód</label>
                    <input type="checkbox" id="honey" name="honey" value="Miód" onChange={onChange} />

                    <label htmlFor="vegetables" >Warzywa</label>
                    <input type="checkbox" id="vegetables" name="vegetables" value="Warzywa" onChange={onChange} />

                    <label htmlFor="meat" >Mięso</label>
                    <input type="checkbox" id="meat" name="meat" value="Mięso" onChange={onChange} />

                    <label htmlFor="fish" >Ryba</label>
                    <input type="checkbox" id="fish" name="fish" value="Ryba" onChange={onChange} />

                    <label htmlFor="gluten" >Bezglutenowe</label>
                    <input type="checkbox" id="gluten" name="gluten" value="Bezglutenowe" onChange={onChange} />

                    <label htmlFor="lactose" >Bez laktozy</label>
                    <input type="checkbox" id="lactose" name="lactose" value="Bez laktozy" onChange={onChange} />
                </div>
                <br></br>
                <button>Zapisz przepis</button>
            </form>
        </>

    )
}