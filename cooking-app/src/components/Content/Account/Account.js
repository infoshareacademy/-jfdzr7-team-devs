import React from "react";
import { useContext } from "react";
import { UserDataContext } from "../../../App";

const Account = () => {
  const userData = useContext(UserDataContext);
  return (
    <div>
      <h1>Witaj {userData?.firstName}</h1>
    </div>
  );
};

export default Account;
