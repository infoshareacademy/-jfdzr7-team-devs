export const SelectImageToUpload = ({ onChange, onClick, text }) => {
    // console.log(onChange)
    // console.log(onClick)
    return (
        <>
            <h3> {text}</h3>
            <input
                name="file"
                type="file"
                onChange={onChange}
            />

            <button onClick={onClick}>Dodaj zdjęcie</button>
        </>
    )
}
