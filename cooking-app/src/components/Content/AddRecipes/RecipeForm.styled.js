import styled from "styled-components"

export const StyledRecipeForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
/* background-color: var(--color-light-gray); */
text-transform: capitalize;
/* color: var(--color-orange);
color:var(--color-little-light-gray); */
max-width: 900px;
width: 100%;
margin: 0 auto;
border: 1.5px solid var(--color-light-gray);
box-shadow: 0 12px 20px 0 rgba(0, 0, 0, .5);
/* box-shadow: 0 12px 80px 0 rgba(0, 0, 0, .5);
box-shadow: 0 12px 50px 0 rgba(0, 0, 0, .5);
box-shadow: 0 12px 30px 0 rgba(0, 0, 0, .5); */
`
export const StyledTitleDiv = styled.div`
display:flex;
flex-direction: column;
justify-content: start;
margin:32px 4px 4px;
width: 100%;
max-width: 630px;
`
export const StyledTitleInput = styled.input`
width: 100%;
max-width: 630px;
height: 32px;
padding: 4px 16px;
margin: 8px;
border-radius: 4px;
border-style: none;
border: 1.5px solid var(--color-light-gray);
&:hover{
    border: 2px solid var(--color-orange);
    opacity:0.8;
}
`

export const StyledInputsDivSelect = styled(StyledTitleDiv)`
flex-flow: row wrap;
justify-content: space-between;
/* background: pink; */
`
export const StyledInputsSelectDiv2 = styled.div`
display: flex;
flex-direction: column;
max-width: 300px;
width:100%;
`


export const StyledSelect = styled.select`
width:100%;
max-width: 284px;
height: 32px;
padding: 4px;
margin: 8px;
border-radius: 4px;
border-style: none;
border: 1.5px solid var(--color-light-gray);
&:hover{
    border: 2px solid var(--color-orange);
    opacity:0.8;
}
/* background: peru; */
`
export const StyledOption = styled.option`
color: var(--color-gray);
`

export const StyledTextArea = styled.textarea`
max-width: 620px;
width:100%;
margin:8px;
font-family: var(--font-family);
border-radius: 4px;
border-style: none;
border: 1.5px solid var(--color-light-gray);
&:hover{
    border: 2px solid var(--color-orange);
    opacity:0.8;
}
`
export const StyledCheckboxAll = styled.div`
display:flex;
flex-flow: row wrap;
flex-direction: row;
justify-content: space-between;
margin-top: 16px;
`

export const StyledDivCheckbox = styled.div`
display: flex;
justify-content: space-around;
/* position: relative; */
`
export const StyledCheckbox = styled.input`
-webkit-appearance: none;
width: 18px;
height:18px;
border: 2px solid var(--color-light-gray); //gainsboro;
border-radius: 2px;
margin-right: 20px;
/* position: absolute;
bottom:-2px; */
&:hover{
    border: 2px solid var(--color-orange);
    opacity:0.8;
}
&:checked{
    text-decoration: none;
    background-color: var(--color-orange);
    
    color: var(--color-gray);
}
`