import React, { useEffect, useState } from "react";
import { assets, dummyCarData } from "../../assets/assets";
import Title from "../../components/owner/Title";

const ManageCars = () => {
  // Currency symbol (from env)
  const currency = import.meta.env.VITE_CURRENCY;

  // Local state for owner's cars
  const [cars, setCars] = useState([]);

  // Load cars (dummy data for now)
  const fetchOwnerCars = async () => {
    setCars(dummyCarData);
  };

  useEffect(() => {
    fetchOwnerCars();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      {/* Page Title */}
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform."
      />

      {/* Cars Table */}
      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-[var(--color-borderColor)]">
        <table className="w-full border-collapse text-left text-sm text-[var(--color-text-secondary)]">
          <thead className="text-[var(--color-text-secondary)]">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars?.map((car, index) => (
              <tr key={index} className="border-t border-[var(--color-borderColor)]">
                {/* Car image + basic info */}
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="w-12 h-12 aspect-square rounded-md object-cover"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium text-[var(--color-text-primary)]">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {car.seating_capacity} • {car.transmission}
                    </p>
                  </div>
                </td>

                {/* Category (hidden on small screens) */}
                <td className="p-3 max-md:hidden">{car.category}</td>

                {/* Price per day */}
                <td className="p-3">
                  {currency}
                  {car.pricePerDay}/day
                </td>

                {/* Availability Status (hidden on small screens) */}
                <td className="p-3 max-md:hidden">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      car.isAvailable
                        ? "bg-[var(--color-success)]/15 text-[var(--color-success)]"
                        : "bg-[var(--color-error)]/15 text-[var(--color-error)]"
                    }`}
                  >
                    {car.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>

                {/* Actions (icons only, no extra behavior) */}
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon}
                      alt="Toggle Visibility"
                      className="cursor-pointer"
                    />
                    <img
                      src={assets.delete_icon}
                      alt="Delete"
                      className="cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;
