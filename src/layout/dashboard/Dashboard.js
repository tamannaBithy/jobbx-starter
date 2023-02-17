import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const { pathname } = useLocation();

  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <div className="col-span-10 ">
        <div
          className={` ${
            pathname === "/dashboard/direct-message"
              ? null
              : "mx-auto max-w-7xl"
          }   h-full `}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
