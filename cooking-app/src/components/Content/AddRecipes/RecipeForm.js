import { SelectImageToUpload } from "./SelectImageToUpload"
import { tags } from "../../../api/firebaseIndex"
import { InputAutocomplete } from "./InputAutocomplet"

const inputAtributes = [
    {
        key: "portion",
        label: "Portions",
        options: ["1 porcja", "2 porcje", "3 porcje", "5 porcji"]
    },
    {
        key: "time",
        label: "Preparing time",
        options: ["10 min", "20 min", "30 min ", "60min"]
    },

]
export const RecipeForm = ({ handleSubmit, onChange, formValues, onClick }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" name="title" value={formValues.title} onChange={onChange} required />
                </div>
                {inputAtributes.map((item) => {
                    return (
                        <div>
                            <InputAutocomplete id={item.key} name={item.key} options={item.options} label={item.label} onChange={onChange} value={formValues.option} />
                        </div>
                    )
                })}


                {/* <div>
                    <label htmlFor="time">Preparing Time: </label>
                    <input type="text" id="time" name="time" value={formValues.time} onChange={onChange} />
                </div>

                <div>
                    <label htmlFor="portion">Portions:</label>
                    <input type="text" id="portion" name="portion" value={formValues.portion} onChange={onChange} />
                </div> */}

        <div>
          <label htmlFor="ingredients">Ingredients </label>
          <textarea
            type="textarea"
            id="ingredients"
            name="ingredients"
            rows="10"
            cols="50"
            value={formValues.ingredients}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="describe">How To Preapare: </label>
          <textarea
            type="textarea"
            id="describe"
            name="describe"
            rows="10"
            cols="50"
            value={formValues.describe}
            onChange={onChange}
          />
        </div>

        <div>
          {tags.map((tag, index) => {
            return (
              <>
                <label key={index} htmlFor={tag.key}>
                  {tag.label}
                </label>
                <input
                  type="checkbox"
                  id={tag.key}
                  name={tag.key}
                  value={tag.label}
                  onChange={onChange}
                />
              </>
            );
          })}
        </div>
        <br></br>
        <br></br>
        <SelectImageToUpload
          onClick={onClick}
          onChange={onChange}
          text={"Add Photo to Your Recipe: "}
        />
        <br></br>
        <br></br>
        <button>Save Recipe</button>
      </form>
    </>
  );
};
