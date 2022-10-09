import React from "react";
import styled from "styled-components";

export const InputElement = ({ tag, handleInput, isClicked }) => {
  return (
    <StyledCheckbox
      style={{
        background: isClicked
          ? "var(--color-orange"
          : "var(--color-natural-gray)",
      }}
    >
      <StyledLabel htmlFor={tag}>{tag}</StyledLabel>
      <StyledInput
        id={tag}
        name={tag}
        type="checkbox"
        onChange={handleInput}
        checked={isClicked}
      />
    </StyledCheckbox>
  );
};

const StyledInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
`;

const StyledLabel = styled.label`
  white-space: none;
  font-size: 0.8125rem;
  cursor: pointer;
`;

const StyledCheckbox = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  height: 32px;
  padding: 8px 8px 8px 15px;
  margin: 5px 5px 5px 0;
  border: 2px solid transparent;
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  vertical-align: middle;
  box-sizing: border-box;

  &:hover {
    border: 2px solid var(--color-orange);
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  }
`;
