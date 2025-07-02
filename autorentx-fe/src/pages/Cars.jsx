import React, { useState } from "react";
import Title from "../components/Title";
import CarCard from "../components/CarCard";
import { assets, dummyCarData } from "../assets/assets";

const Cars = () => {
  const [input, setInput] = useState("");

  return (
    <div>
      {/* ---------- Header Section with Title & Search ---------- */}
      <div className="flex flex-col items-center bg-light py-20 max-md:px-4">
        <Title
          title="Available Cars"
          subTitle="Browse from our premium collection of rental cars across top Indian cities"
        />

        {/* ---------- Search Bar ---------- */}
        <div className="flex items-center bg-white px-4 mt-6 max-w-3xl w-full h-12 rounded-full shadow border border-borderColor">
          {/* Search Icon */}
          <img
            src={assets?.search_icon}
            alt="search"
            className="w-4.5 h-4.5 mr-2"
          />

          {/* Input Field */}
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model or features"
            className="w-full h-full outline-none text-text-secondary placeholder:text-gray-400"
          />

          {/* Filter Icon (optional future feature) */}
          <img
            src={assets?.filter_icon}
            alt="filter"
            className="w-4.5 h-4.5 ml-2"
          />
        </div>
      </div>

      {/* ---------- Car Listings Section ---------- */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        {/* Result Count */}
        <p className="text-text-secondary xl:px-20 max-w-7xl mx-auto">
          Showing {dummyCarData?.length} Cars
        </p>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {dummyCarData?.map((car, index) => (
            <div key={car?._id || index}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
