import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets, dummyMyBookingsData } from "../assets/assets";

const MyBookings = () => {
  // State to store user bookings
  const [bookings, setBookings] = useState([]);

  // Currency symbol from environment variable
  const currency = import.meta.env.VITE_CURRENCY;

  // Fetch bookings (dummy data for now)
  const fetchMyBookings = async () => {
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl">
      {/* Page Title */}
      <Title
        title="My Bookings"
        subTitle="View and Manage all your car bookings"
        align="left"
      />

      {/* Booking List */}
      <div>
        {bookings?.map((booking, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border border-[var(--color-borderColor)] rounded-lg mt-5 first:mt-12"
          >
            {/* Car Image & Info */}
            <div className="md:col-span-1">
              <div className="rounded-md overflow-hidden mb-3">
                <img
                  src={booking?.car?.image}
                  alt={`${booking?.car?.brand} ${booking?.car?.model}`}
                  className="w-full h-auto aspect-video object-cover"
                />
              </div>
              <p className="text-lg font-medium mt-2">
                {booking?.car?.brand} {booking?.car?.model}
              </p>
              <p className="text-[var(--color-text-secondary)]">
                {booking?.car?.year} • {booking?.car?.category} •{" "}
                {booking?.car?.location}
              </p>
            </div>

            {/* Booking Info */}
            <div className="md:col-span-2">
              {/* Booking ID & Status */}
              <div className="flex items-center gap-2">
                <p className="px-3 py-1.5 bg-[var(--color-light)] rounded">
                  Booking #{index + 1}
                </p>
                <p
                  className={`px-3 py-1 text-xs rounded-full ${
                    booking?.status === "confirmed"
                      ? "bg-[var(--color-success)]/15 text-[var(--color-success)]"
                      : "bg-[var(--color-error)]/15 text-[var(--color-error)]"
                  }`}
                >
                  {booking?.status}
                </p>
              </div>

              {/* Rental Period */}
              <div className="flex items-start gap-2 mt-3">
                <img
                  src={assets?.calendar_icon_colored}
                  alt="calendar"
                  className="w-4 h-4 mt-1"
                />
                <div>
                  <p className="text-[var(--color-text-secondary)]">
                    Rental Period
                  </p>
                  <p>
                    {booking?.pickupDate?.split("T")[0]} To{" "}
                    {booking?.returnDate?.split("T")[0]}
                  </p>
                </div>
              </div>

              {/* Pickup Location */}
              <div className="flex items-start gap-2 mt-3">
                <img
                  src={assets?.location_icon_colored}
                  alt="location"
                  className="w-4 h-4 mt-1"
                />
                <div>
                  <p className="text-[var(--color-text-secondary)]">
                    Pick-up Location
                  </p>
                  <p>{booking?.car?.location}</p>
                </div>
              </div>
            </div>

            {/* Price & Date */}
            <div className="md:col-span-1 flex flex-col justify-between gap-6">
              <div className="text-sm text-right">
                <p>Total Price</p>
                <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
                  {currency}
                  {booking?.price}
                </h1>
                <p>
                  Booked on {booking?.createdAt?.split("T")[0]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
