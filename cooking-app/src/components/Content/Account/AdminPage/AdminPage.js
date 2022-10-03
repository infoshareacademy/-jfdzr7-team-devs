import React from "react";
import AcceptList from "./AcceptList";
import BannerList from "./BannerList";
import DatabaseControls from "./DatabaseControls";

const AdminPage = () => {
  return (
    <div>
      <DatabaseControls />
      <BannerList />
      <AcceptList />
    </div>
  );
};

export default AdminPage;
