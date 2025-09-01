import React, { useEffect, useState } from "react";
import NavbarOwner from "../../components/owner/NavbarOwner";
import Sidebar from "../../components/owner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Loader from "../../components/Loader"; // adjust path if needed
import { motion } from "motion/react";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Layout = () => {
  const { isOwner, navigate } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
    // simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [isOwner]);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-light)]">
      {/* Top Navigation Bar */}
      <NavbarOwner />

      {/* Main Content Area with Sidebar + Dynamic Page */}
      <div className="flex flex-1">
        {/* Sidebar (left) */}
        <Sidebar />

        {/* Outlet with animation */}
        <motion.div
          className="flex-1 p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default Layout;
