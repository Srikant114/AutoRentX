import React, { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "./../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import Loader from "../../components/Loader";

/* Simple status options for pending select */
const BOOKING_STATUS_OPTIONS = ["pending", "cancelled", "confirmed"];

const ManageBookings = () => {
  const { axios, currency } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState(null);

  const errMsg = (err) =>
    err?.response?.data?.message || err?.message || "Request failed";

  // Fetch owner bookings
  const fetchOwnerBookings = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.get("/api/bookings/owner");
      const ok = res.status === 200 && res.data?.success;
      if (!ok) {
        toast.error(res.data?.message || "Failed to fetch bookings.");
        return;
      }
      setBookings(res.data.bookings || []);
    } catch (error) {
      toast.error(errMsg(error));
    } finally {
      setLoading(false);
    }
  };

  // Change booking status
  const changeBookingStatus = async (bookingId, status) => {
    if (savingId) return;
    setSavingId(bookingId);
    try {
      const res = await axios.post("/api/bookings/change-status", {
        bookingId,
        status,
      });
      const ok = res.status === 200 && res.data?.success;
      if (!ok) {
        toast.error(res.data?.message || "Failed to update status.");
        return;
      }
      toast.success(res.data?.message || "Status updated.");

      // Optimistic update (avoid full refetch)
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status } : b
        )
      );
    } catch (error) {
      toast.error(errMsg(error));
    } finally {
      setSavingId(null);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="px-4 pt-10 md:px-10 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Page Title */}
      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses"
      />

      {/* Loader */}
      {loading && (
        <div className="flex items-center justify-center my-10">
          <Loader />
        </div>
      )}

      {/* Bookings Table */}
      {!loading && (
        <motion.div
          className="max-w-3xl w-full rounded-md overflow-hidden border border-[var(--color-borderColor)]"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
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
              {bookings?.map((booking) => {
                const fromDate =
                  (booking?.pickupDate &&
                    String(booking.pickupDate).split("T")[0]) ||
                  "";
                const toDate =
                  (booking?.returnDate &&
                    String(booking.returnDate).split("T")[0]) ||
                  "";
                const carTitle = `${booking?.car?.brand || ""} ${
                  booking?.car?.model || ""
                }`.trim();

                return (
                  <motion.tr
                    key={booking._id}
                    className="border-t border-[var(--color-borderColor)]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Car image + basic info */}
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={booking?.car?.image}
                        alt={carTitle || "Car"}
                        className="w-12 h-12 aspect-square rounded-md object-cover"
                      />
                      <div className="max-md:hidden">
                        <p className="font-medium text-[var(--color-text-primary)]">
                          {carTitle || "Car"}
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

                    {/* Static channel badge (hidden on small screens) */}
                    <td className="p-3 max-md:hidden">
                      <span className="bg-[var(--color-light)] px-3 py-1 rounded-full text-xs">
                        offline
                      </span>
                    </td>

                    {/* Actions / Status control */}
                    <td className="p-3">
                      {booking?.status === "pending" ? (
                        <select
                          onChange={(e) =>
                            changeBookingStatus(booking._id, e.target.value)
                          }
                          value={booking?.status}
                          disabled={savingId === booking._id}
                          className="px-2 py-1.5 mt-1 text-[var(--color-text-secondary)] border border-[var(--color-borderColor)] rounded-md outline-none"
                        >
                          {BOOKING_STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      ) : (
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
                  </motion.tr>
                );
              })}

              {!bookings?.length && (
                <tr>
                  <td className="p-4 text-center" colSpan={5}>
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ManageBookings;
