import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState("");

  const updateImage = async () => {
    if (!image) {
      toast.error("Please select an image first.");
      return;
    }
    if (!image.type?.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      const endpoint = "/api/owner/update-image";

      const res = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200 && res.data?.success === true) {
        toast.success(res.data?.message || "Profile image updated successfully.");
        await fetchUser();
        setImage(null);
      } else {
        toast.error(res.data?.message || "Failed to update profile image.");
      }
    } catch (err) {
      if (err?.response?.status === 400) {
        toast.error(err?.response?.data?.message || "Invalid image upload.");
      } else if (err?.response?.status === 401) {
        toast.error(err?.response?.data?.message || "Please log in to update your image.");
      } else if (err?.response?.status === 413) {
        toast.error("Image is too large.");
      } else {
        toast.error(err?.response?.data?.message || err?.message || "Request failed");
      }
    }
  };

  return (
    <motion.div
      className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-[var(--color-borderColor)] text-sm"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Profile Image Upload */}
      <motion.div
        className="group relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : user?.image || ""}
            alt="User Profile"
            className="w-9 h-9 md:h-14 md:w-14 rounded-full mx-auto"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e?.target?.files[0])}
          />
          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets?.edit_icon} alt="Edit Icon" />
          </div>
        </label>
      </motion.div>

      {image && (
        <motion.button
          onClick={updateImage}
          className="absolute top-0 right-0 flex p-2 gap-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          Save
          <img src={assets?.check_icon} alt="Save Icon" width={13} />
        </motion.button>
      )}

      <motion.p
        className="mt-2 text-base max-md:hidden text-[var(--color-text-primary)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {user?.name}
      </motion.p>

      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {ownerMenuLinks?.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              link.path === location.pathname
                ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                : "text-[var(--color-text-secondary)]"
            }`}
          >
            <img
              src={link.path === location.pathname ? link.coloredIcon : link.icon}
              alt={`${link.name} Icon`}
            />
            <span className="max-md:hidden">{link.name}</span>
            <div
              className={`${
                link.path === location.pathname && "bg-[var(--color-primary)]"
              } w-1.5 h-8 rounded-l right-0 absolute`}
            ></div>
          </NavLink>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
