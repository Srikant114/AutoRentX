import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import ConfirmOwnerModal from "./ConfirmOwnerModal";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const changeRole = async () => {
    try {
      const res = await axios.post("/api/owner/change-role");
      if (res.status === 200 && res.data?.success) {
        setIsOwner(true);
        toast.success(res.data.message || "Role updated successfully");
        navigate("/owner");
      } else {
        toast.error(res.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Request failed");
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    if (!user) {
      setShowLogin(true); // if not logged in → login modal
    } else {
      changeRole(); // if logged in → change role
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex items-center justify-between px-6 md:px-16 lg:px-26 xl:px-32 py-4 text-text-secondary border-b border-borderColor relative transition-all ${
          location?.pathname === "/" ? "bg-light" : "bg-white"
        }`}
      >
        {/* ---------- Logo ---------- */}
        <Link to="/">
          <motion.img whileHover={{ scale: 1.05 }} src={assets?.autoXlogo} alt="AutoRentX Logo" className="h-8" />
        </Link>

        {/* ---------- Menu Links ---------- */}
        <div
          className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${
            location?.pathname === "/" ? "bg-light" : "bg-white"
          } ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
        >
          {menuLinks?.map((menu, idx) => {
            const isActive = location.pathname === menu.path;
            return (
              <Link
                key={idx}
                to={menu?.path}
                className={`transition-all hover:text-primary ${isActive ? "text-primary font-semibold" : ""}`}
              >
                {menu?.name}
              </Link>
            );
          })}

          {/* ---------- Right Side Buttons ---------- */}
          <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
            <button
              className="cursor-pointer"
              onClick={() => {
                if (isOwner) {
                  navigate("/owner");
                } else {
                  setShowModal(true);
                }
              }}
            >
              {isOwner ? "Dashboard" : "List Cars"}
            </button>
            <button
              className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
              onClick={() => {
                user ? logout() : setShowLogin(true);
              }}
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>

        {/* ---------- Mobile Menu Button ---------- */}
        <button className="sm:hidden cursor-pointer" onClick={() => setOpen(!open)}>
          <img src={open ? assets?.close_icon : assets?.menu_icon} alt="Mobile Menu Icon" />
        </button>
      </motion.div>

      {/* Confirmation Modal */}
      <ConfirmOwnerModal open={showModal} onClose={() => setShowModal(false)} onConfirm={handleConfirm} />
    </>
  );
};

export default Navbar;
