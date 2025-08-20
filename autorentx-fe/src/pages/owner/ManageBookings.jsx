import React, { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { dummyMyBookingsData } from "../../assets/assets";

/* Related data: simple status options for the pending select */
const BOOKING_STATUS_OPTIONS = ["pending", "cancelled", "confirmed"];

const ManageBookings = () => {
  // Currency symbol (from env)
  const currency = import.meta.env.VITE_CURRENCY;

  // Local state for bookings
  const [bookings, setBookings] = useState([]);

  // Load bookings (dummy data)
  const fetchOwnerBookings = async () => {
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      {/* Page Title */}
      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses"
      />

      {/* Bookings Table */}
      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-[var(--color-borderColor)]">
        <table className="w-full border-collapse text-left text-sm text-[var(--color-text-secondary)]">
          <thead className="text-[var(--color-text-secondary)]">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings?.map((booking, index) => {
              const fromDate = booking?.pickupDate?.split("T")[0] || "";
              const toDate = booking?.returnDate?.split("T")[0] || "";
              const carTitle = `${booking?.car?.brand || ""} ${booking?.car?.model || ""}`.trim();

              return (
                <tr key={index} className="border-t border-[var(--color-borderColor)]">
                  {/* Car image + basic info */}
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={booking?.car?.image}
                      alt={carTitle || "Car"}
                      className="w-12 h-12 aspect-square rounded-md object-cover"
                    />
                    <div className="max-md:hidden">
                      <p className="font-medium text-[var(--color-text-primary)]">
                        {carTitle}
                      </p>
                    </div>
                  </td>

                  {/* Date Range (hidden on small screens) */}
                  <td className="p-3 max-md:hidden">
                    {fromDate} To {toDate}
                  </td>

                  {/* Total Price */}
                  <td className="p-3">
                    {currency}
                    {booking?.price}
                  </td>

                  {/* Channel/Mode (static display; hidden on small screens) */}
                  <td className="p-3 max-md:hidden">
                    <span className="bg-[var(--color-light)] px-3 py-1 rounded-full text-xs">
                      offline
                    </span>
                  </td>

                  {/* Actions / Status control */}
                  <td className="p-3">
                    {booking?.status === "pending" ? (
                      /* Simple select (no extra behavior wired) */
                      <select
                        value={booking?.status}
                        className="px-2 py-1.5 mt-1 text-[var(--color-text-secondary)] border border-[var(--color-borderColor)] rounded-md outline-none"
                      >
                        {BOOKING_STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      /* Status pill (theme colors) */
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking?.status === "confirmed"
                            ? "bg-[var(--color-success)]/15 text-[var(--color-success)]"
                            : "bg-[var(--color-error)]/15 text-[var(--color-error)]"
                        }`}
                      >
                        {booking?.status}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
