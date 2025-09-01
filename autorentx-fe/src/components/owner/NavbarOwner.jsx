import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "./../../context/AppContext";
import { motion } from "motion/react";

const NavbarOwner = () => {
  const { user } = useAppContext();

  return (
    <motion.div
      className="flex items-center justify-between px-6 md:px-10 py-4 text-[var(--color-text-secondary)] border-b border-[var(--color-borderColor)] relative transition-all"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Logo - Navigates to Home */}
      <Link to="/">
        <motion.img
          src={assets?.autoXlogo}
          alt="AutoRentX Logo"
          className="h-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{scale: 1.05}}
        />
      </Link>

      {/* Welcome Text */}
      <motion.p
        className="text-[var(--color-text-primary)]"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Welcome, {user?.name || "Owner"}
      </motion.p>
    </motion.div>
  );
};

export default NavbarOwner;
