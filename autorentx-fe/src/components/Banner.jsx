import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import ConfirmOwnerModal from "./ConfirmOwnerModal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Banner = () => {
  const { axios, setIsOwner, isOwner, user, setShowLogin } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
      <div
        id="list-your-car"
        className="flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-primary to-primary-dull max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden"
      >
        {/* ---------- Left Content ---------- */}
        <div className="text-white">
          <h2 className="text-3xl font-semibold">Do You Own A Luxury Car?</h2>
          <p className="mt-2 text-base">
            Monetize your vehicle effortlessly by listing it on <span className="font-medium">AutoRentX</span>.
          </p>
          <p className="mt-1 max-w-130 text-sm text-white/90">
            We take care of insurance, driver verification and secure payments — so you can earn passive income, stress-free.
          </p>

          <button
            className="px-6 py-2 bg-white hover:bg-light text-primary rounded-lg text-sm mt-4 transition-all cursor-pointer"
            onClick={() => {
              if (isOwner) {
                navigate("/owner");
              } else {
                setShowModal(true);
              }
            }}
          >
            List Your Car
          </button>
        </div>

        {/* ---------- Right Content ---------- */}
        <img src={assets?.banner_car_image} alt="Luxury Car Banner" className="max-h-45 mt-10 object-contain" />
      </div>

      {/* Confirmation Modal */}
      <ConfirmOwnerModal open={showModal} onClose={() => setShowModal(false)} onConfirm={handleConfirm} />
    </>
  );
};

export default Banner;
