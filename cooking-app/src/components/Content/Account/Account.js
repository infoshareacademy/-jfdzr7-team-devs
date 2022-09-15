import React from "react";
import { useContext } from "react";
import { UserDataContext } from "../../../App";
import { AddRecipe } from "../AddRecipes/AddRecipe";

const Account = () => {
  const userData = useContext(UserDataContext);
  return (
    <div>
      <h1>Witaj {userData.firstName}</h1>
      <AddRecipe />;
    </div>
  );
};

export default Account;
