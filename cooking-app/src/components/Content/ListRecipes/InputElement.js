import React from 'react'

export const InputElement = ({tag, handleInput}) => {
  return (
    <>
    <label htmlFor={tag}>{tag}</label>
      <input
        name={tag}
        type="checkbox"
        onChange={handleInput}
      />
      </>
  )
}