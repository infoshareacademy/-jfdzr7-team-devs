import React from "react";
import { useContext } from "react";
import { UserDataContext } from "../../../App";
import { GetCurrentUserData } from "../UserPanel/GetCurrentUserData";

const Account = () => {
  const userData = useContext(UserDataContext);
  return (
    <div>
      <h1>Witaj {userData?.firstName}</h1>

      <GetCurrentUserData />
    </div>
  );
};

export default Account;
