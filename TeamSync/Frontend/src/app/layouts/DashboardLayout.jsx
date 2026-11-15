import React from "react";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <>
      <div>dashboardLayout</div>
      <Outlet />
    </>
  );
};

export default DashboardLayout