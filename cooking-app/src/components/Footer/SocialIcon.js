import React from "react";

const SocialIcon = ({ link, element }) => {
  return (
    <li>
      <a href={link}>{element}</a>
    </li>
  );
};

export default SocialIcon;
