import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from './../../context/AppContext';

const NavbarOwner = () => {
  // Dummy user data (replace with real user data later)
  const {user} = useAppContext();

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-[var(--color-text-secondary)] border-b border-[var(--color-borderColor)] relative transition-all">
      {/* Logo - Navigates to Home */}
      <Link to="/">
         <img src={assets?.autoXlogo} alt="AutoRentX Logo" className="h-8" />
      </Link>

      {/* Welcome Text */}
      <p className="text-[var(--color-text-primary)]">
        Welcome, {user?.name || "Owner"}
      </p>
    </div>
  );
};

export default NavbarOwner;
