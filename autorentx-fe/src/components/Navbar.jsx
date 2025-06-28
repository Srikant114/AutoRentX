import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const location = useLocation(); // current route
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // mobile menu state

  return (
    <div
      className={`flex items-center justify-between px-6 md:px-16 lg:px-26 xl:px-32 py-4 text-text-secondary border-b border-borderColor relative transition-all ${
        location?.pathname === "/" ? "bg-light" : "bg-white"
      }`}
    >
      {/* ---------- Logo ---------- */}
      <Link to="/">
        <img src={assets?.autoXlogo} alt="AutoRentX Logo" className="h-8" />
      </Link>

      {/* ---------- Menu Links & Mobile Drawer ---------- */}
      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${
          location?.pathname === "/" ? "bg-light" : "bg-white"
        } ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        {/* ---------- Navigation Links ---------- */}
        {menuLinks?.map((menu, idx) => {
          const isActive = location.pathname === menu.path;
          return (
            <Link
              key={idx}
              to={menu?.path}
              className={`transition-all hover:text-primary ${
                isActive ? "text-primary font-semibold" : ""
              }`}
            >
              {menu?.name}
            </Link>
          );
        })}

        {/* ---------- Search Bar (Visible on large screens only) ---------- */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56">
          <input
            type="text"
            className="py-1.5 w-full bg-transparent outline-none placeholder-text-secondary"
            placeholder="Search Products"
          />
          <img src={assets?.search_icon} alt="Search Icon" />
        </div>

        {/* ---------- Right Side Buttons (Dashboard & Login) ---------- */}
        <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
          <button
            className="cursor-pointer"
            onClick={() => {
              navigate("/owner");
            }}
          >
            Dashboard
          </button>
          <button
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
            onClick={() => {
              setShowLogin(true);
            }}
          >
            Login
          </button>
        </div>
      </div>

      {/* ---------- Mobile Menu Toggle Button ---------- */}
      <button
        className="sm:hidden cursor-pointer"
        aria-label="Toggle Mobile Menu"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets?.close_icon : assets?.menu_icon}
          alt="Mobile Menu Icon"
        />
      </button>
    </div>
  );
};

export default Navbar;
