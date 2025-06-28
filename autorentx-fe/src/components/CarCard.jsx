import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate()

  return (
    <div className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer"
    onClick={()=>{
        navigate(`/car-details/${car?._id}`)
        scrollTo(0,0)
    }}
    >
      {/* ----- Car Image Section ----- */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={car?.image}
          alt="car-image"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* ----- Availability Badge ----- */}
        {car?.isAvailable && (
          <p className="absolute top-4 left-4 bg-primary/90 text-white text-xs px-2.5 py-1 rounded-full">
            Available Now
          </p>
        )}

        {/* ----- Price Tag ----- */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
          <span className="font-semibold">
            {currency}
            {car?.pricePerDay}
          </span>
          <span className="text-sm text-white/80"> / day</span>
        </div>
      </div>

      {/* ----- Car Info Section ----- */}
      <div className="p-4 sm:p-5">
        {/* ----- Title: Brand + Model + Year ----- */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-medium text-text-primary">
              {car?.brand} {car?.model}
            </h3>
            <p className="text-sm text-text-secondary">
              {car?.category} ● {car?.year}
            </p>
          </div>
        </div>

        {/* ----- Car Specifications ----- */}
        <div className="mt-4 grid grid-cols-2 gap-y-2 text-text-secondary">
          {/* Seating Capacity */}
          <div className="flex items-center text-sm">
            <img src={assets?.users_icon} alt="user" className="h-4 mr-2" />
            <span>{car?.seating_capacity} Seats</span>
          </div>

          {/* Fuel Type */}
          <div className="flex items-center text-sm">
            <img src={assets?.fuel_icon} alt="fuel" className="h-4 mr-2" />
            <span>{car?.fuel_type}</span>
          </div>

          {/* Transmission */}
          <div className="flex items-center text-sm">
            <img src={assets?.car_icon} alt="transmission" className="h-4 mr-2" />
            <span>{car?.transmission}</span>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm">
            <img src={assets?.location_icon} alt="location" className="h-4 mr-2" />
            <span>{car?.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
