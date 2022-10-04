import {Avatar} from "@mui/material";
import {useContext} from "react";
import {UserDataContext} from "../../App";

export const CustomAvatar = () => {
  const userData = useContext(UserDataContext);

  return (
      <Avatar alt={userData?.firstName} src={userData?.avatarUrl}>
        {`${userData?.firstName.at(0)}${userData?.lastName.at(0)}`}
      </Avatar>
  )
}

