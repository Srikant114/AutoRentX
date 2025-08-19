import React from "react";
import NavbarOwner from "../../components/owner/NavbarOwner";
import Sidebar from "../../components/owner/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-light)]">
      {/* Top Navigation Bar */}
      <NavbarOwner />

      {/* Main Content Area with Sidebar + Dynamic Page */}
      <div className="flex flex-1">
        {/* Sidebar (left) */}
        <Sidebar />

        {/* Outlet renders the nested route component */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
