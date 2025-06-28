import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-14 bg-light text-center">
      {/* ----- Hero Heading ----- */}
      <h1 className="text-4xl md:text-5xl font-semibold text-text-primary">
        Luxury Cars On Rent
      </h1>

      {/* ----- Booking Form Section ----- */}
      <form
        action=""
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
      >
        {/* ----- Location and Dates Container ----- */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8">
          {/* ----- Pickup Location Dropdown ----- */}
          <div className="flex flex-col items-start gap-2 w-full">
            <label
              htmlFor="pickup-location"
              className="text-text-primary text-sm"
            >
              Pickup Location
            </label>
            <select
              id="pickup-location"
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e?.target?.value)}
              className="w-full md:w-48 px-3 py-2 text-sm text-text-secondary bg-white border border-borderColor rounded-md outline-none focus:ring-2 focus:ring-primary transition-all"
            >
              <option value="">Select a location</option>
              {cityList?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* ----- Pickup Date Input ----- */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="pickup-date" className="text-text-primary text-sm">
              Pick-up Date
            </label>
            <input
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-text-secondary border border-borderColor rounded-md px-2 py-1"
              required
            />
          </div>

          {/* ----- Return Date Input ----- */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="return-date" className="text-text-primary text-sm">
              Return Date
            </label>
            <input
              type="date"
              id="return-date"
              className="text-sm text-text-secondary border border-borderColor rounded-md px-2 py-1"
              required
            />
          </div>
        </div>

        {/* ----- Search Button ----- */}
        <button
          type="submit"
          className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer"
        >
          <img
            src={assets?.search_icon}
            alt="search"
            className="brightness-300"
          />
          Search
        </button>
      </form>

      {/* ----- Car Image ----- */}
      <img src={assets?.main_car} alt="car" className="max-h-74" />
    </div>
  );
};

export default Hero;
