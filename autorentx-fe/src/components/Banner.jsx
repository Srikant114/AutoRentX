import React from 'react';
import { assets } from '../assets/assets';

const Banner = () => {
  return (
    <div
      className="flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-primary to-primary-dull max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden"
    >
      {/* ---------- Left Content: Text ---------- */}
      <div className="text-white">
        <h2 className="text-3xl font-semibold">Do You Own A Luxury Car?</h2>
        <p className="mt-2 text-base">
          Monetize your vehicle effortlessly by listing it on <span className="font-medium">AutoRentX</span>.
        </p>
        <p className="mt-1 max-w-130 text-sm text-white/90">
          We take care of insurance, driver verification and secure payments — so you can earn passive income, stress-free.
        </p>

        {/* ---------- CTA Button ---------- */}
        <button className="px-6 py-2 bg-white hover:bg-light text-primary rounded-lg text-sm mt-4 transition-all cursor-pointer">
          List Your Car
        </button>
      </div>

      {/* ---------- Right Content: Banner Car Image ---------- */}
      <img
        src={assets?.banner_car_image}
        alt="Luxury Car Banner"
        className="max-h-45 mt-10 object-contain"
      />
    </div>
  );
};

export default Banner;
