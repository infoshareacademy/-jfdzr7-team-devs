import React from "react";
import { useContext } from "react";
import { UserDataContext } from "../../../App";
// import { AddRecipe } from "../AddRecipes/AddRecipe";
import { AddRecipeNew } from "../AddRecipes/AddRecipeNew";

const Account = () => {
  const userData = useContext(UserDataContext);
  return (
    <div>
      <h1>Witaj {userData?.firstName}</h1>
      <AddRecipeNew />;
    </div>
  );
};

export default Account;
