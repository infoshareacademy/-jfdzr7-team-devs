export const textsRecipe = {
    addRecipe: {
        header: "Add New Recipe"
    },
    recipeForm: {
        labelsTextInput: {
            title: "Title:",
            // time: "Preparing Time",
            // portion: "Portions",
            ingredients: "Ingredients:",
            describe: "How To Prepare:",
        },
        fileInput: {
            headerUpload: "Add Photo to Recipe:",
            buttonUpload: "Upload Photo",
        },
        buttonSave: "Save Recipe",
    }
}

export const inputSelectAtributes = [
    {
        key: "portion",
        label: "Portions:",
        options: [
            {
                option: "----select option----",
                value: "",
            },
            {
                option: "1 porcja",
                value: "1 porcja",
            },
            {
                option: "2 porcje",
                value: "2 porcje",
            },
            {
                option: "3 porcje",
                value: "3 porcje",
            },
            {
                option: "5 porcji",
                value: "5 porcji",
            },
        ]
    },
    {
        key: "time",
        label: "Preparing time:",
        options: [
            {
                option: "----select option----",
                value: "",
            },
            {
                option: "10 min",
                value: "10 min",
            },
            {
                option: "20 min",
                value: "20 min",
            },
            {
                option: "40 min",
                value: "40 min",
            },
            {
                option: "60 min",
                value: "60 min",
            },
        ]
    },

]