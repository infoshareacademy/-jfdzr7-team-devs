import React from "react";
import { useContext } from "react";
import { UserDataContext } from "../../../App";
import { DisplayUserData } from "../UserPanel/DisplayUserData";

const Account = () => {
  const userData = useContext(UserDataContext);
  return (
    <div>
      <h1>Witaj {userData?.firstName}</h1>

      <DisplayUserData />
    </div>
  );
};

export default Account;
