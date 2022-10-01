import React from "react";
import AcceptList from "./AcceptList";
import DatabaseControls from "./DatabaseControls";

const AdminPage = () => {
  return (
    <div>
      <DatabaseControls />
      <AcceptList />
    </div>
  );
};

export default AdminPage;
