import React from 'react';
import Title from './Title';

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 max-md:px-4 my-10 mb-40">
      {/* ---------- Section Title ---------- */}
      <Title
        title="Get Exclusive Car Rental Deals!"
        subTitle="Subscribe now and be the first to know about discounts, premium car launches, and special offers from AutoRentX."
      />

      {/* ---------- Email Subscription Form ---------- */}
      <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12 mt-4">
        {/* Email Input Field */}
        <input
          className="border border-borderColor rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-text-secondary placeholder:text-gray-400"
          type="email"
          placeholder="Enter your email address"
          required
        />

        {/* Subscribe Button */}
        <button
          type="submit"
          className="md:px-12 px-6 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
