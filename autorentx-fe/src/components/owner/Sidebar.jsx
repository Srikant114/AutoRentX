import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const {user, axios, fetchUser} = useAppContext(); // Dummy user data (replace with API later)
  const location = useLocation(); // Get current route for active link
  const [image, setImage] = useState(""); // State for uploaded profile image

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

    const endpoint = "/api/owner/update-image"; // <-- change if your route is under /api/owner

    // Call API (Authorization header is set globally in AppContext)
    const res = await axios.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });


    if (res.status === 200 && res.data?.success === true) {
      toast.success(res.data?.message || "Profile image updated successfully.");
      await fetchUser();      // refresh user profile
      setImage(null);         // clear local file
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
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-[var(--color-borderColor)] text-sm">
      {/* Profile Image Upload */}
      <div className="group relative">
        <label htmlFor="image">
          {/* Profile Image Preview */}
          <img
            src={image ? URL.createObjectURL(image) : user?.image || ""}
            alt="User Profile"
            className="w-9 h-9 md:h-14 md:w-14 rounded-full mx-auto"
          />

          {/* Hidden File Input */}
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e?.target?.files[0])}
          />

          {/* Hover Overlay with Edit Icon */}
          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets?.edit_icon} alt="Edit Icon" />
          </div>
        </label>
      </div>

      {/* Save Button (only when image is selected) */}
      {image && (
        <button
        onClick={updateImage}
          className="absolute top-0 right-0 flex p-2 gap-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] cursor-pointer"
        >
          Save
          <img
            src={assets?.check_icon}
            alt="Save Icon"
            width={13}
            
          />
        </button>
      )}

      {/* User Name */}
      <p className="mt-2 text-base max-md:hidden text-[var(--color-text-primary)]">
        {user?.name}
      </p>

      {/* Sidebar Navigation Links */}
      <div className="w-full">
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
            {/* Icon (colored if active) */}
            <img
              src={link.path === location.pathname ? link.coloredIcon : link.icon}
              alt={`${link.name} Icon`}
            />
            {/* Link Text */}
            <span className="max-md:hidden">{link.name}</span>
            {/* Active Link Indicator */}
            <div
              className={`${
                link.path === location.pathname && "bg-[var(--color-primary)]"
              } w-1.5 h-8 rounded-l right-0 absolute`}
            ></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
