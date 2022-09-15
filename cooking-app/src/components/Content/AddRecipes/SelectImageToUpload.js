import { StyledInputFile } from "./SelectImageUpload.styled"


export const SelectImageToUpload = ({ onChange, onClick, text }) => {
    return (
        <>
            <h3> {text.headerUpload}</h3>
            <label htmlFor="file" style={{ background: "grey", padding: "5px 10px" }} >Select file...</label>
            <StyledInputFile
                id="file"
                name="file"
                type="file"
                onChange={onChange}
            // style={{ visibility: "hidden" }}
            />
            <button onClick={onClick}>{text.buttonUpload}</button>
        </>
    )
}
