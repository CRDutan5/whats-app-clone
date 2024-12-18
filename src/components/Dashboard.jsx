import React from "react";
import Sidebar from "./Sidebar";

export const Dashboard = ({ id }) => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar id={id} />
    </div>
  );
};
