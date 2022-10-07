import React from "react";
import { Avatar } from "@mui/material";

const SocialIcon = ({ link, url }) => {
  return (
    <li>
      <a href={link}>
        <Avatar alt="avatar" src={url} />
      </a>
    </li>
  );
};

export default SocialIcon;
