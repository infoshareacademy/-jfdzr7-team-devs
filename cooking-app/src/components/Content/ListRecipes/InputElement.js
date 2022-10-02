import React from 'react'
import {Checkbox} from "@mui/material"

export const InputElement = ({tag, handleInput, isClicked}) => {
  return (
    <>
    <label htmlFor={tag}>{tag}</label>
      <Checkbox
        name={tag}
        type="checkbox"
        onChange={handleInput}
        checked={isClicked}
      />
      </>
  )
}