import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../../components/Loader";

const ManageCars = () => {
  const { isOwner, axios, currency } = useAppContext();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [togglingId, setTogglingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // delete confirmation modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmCar, setConfirmCar] = useState(null);

  const errMsg = (err) =>
    err?.response?.data?.message || err?.message || "Request failed";

  const fetchOwnerCars = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.get("/api/owner/cars");
      const ok = res.status === 200 && res.data?.success;
      if (!ok) {
        toast.error(res.data?.message || "Failed to fetch cars.");
        return;
      }
      setCars(res.data.cars || []);
    } catch (error) {
      toast.error(errMsg(error));
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (carId) => {
    if (togglingId) return;
    setTogglingId(carId);
    try {
      const res = await axios.post("/api/owner/toggle-availability", { carId });
      const ok = res.status === 200 && res.data?.success;
      if (!ok) {
        toast.error(res.data?.message || "Failed to update availability.");
        return;
      }
      toast.success(res.data?.message || "Availability updated.");
      fetchOwnerCars();
    } catch (error) {
      toast.error(errMsg(error));
    } finally {
      setTogglingId(null);
    }
  };

  // open confirmation popup
  const askDelete = (car) => {
    setConfirmCar(car);
    setConfirmOpen(true);
  };

  // execute delete after confirm
  const confirmDelete = async () => {
    if (!confirmCar?._id || deletingId) return;
    setDeletingId(confirmCar._id);
    try {
      const res = await axios.post("/api/owner/delete-car", {
        carId: confirmCar._id,
      });
      const ok = res.status === 200 && res.data?.success;
      if (!ok) {
        toast.error(res.data?.message || "Failed to delete car.");
        return;
      }
      toast.success(res.data?.message || "Car deleted successfully.");
      setConfirmOpen(false);
      setConfirmCar(null);
      fetchOwnerCars();
    } catch (error) {
      toast.error(errMsg(error));
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOwner]);

  return (
    <motion.div
      className="px-4 pt-10 md:px-10 w-full"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Page Title */}
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform."
      />

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loader />
        </div>
      )}

      {/* Cars Table */}
      {!loading && (
        <motion.div
          className="max-w-3xl w-full rounded-md overflow-hidden border border-[var(--color-borderColor)]"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
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
              {cars?.map((car) => (
                <motion.tr
                  key={car._id}
                  className="border-t border-[var(--color-borderColor)]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
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

                  {/* Actions */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        onClick={() => toggleAvailability(car._id)}
                        src={
                          car.isAvailable
                            ? assets.eye_close_icon
                            : assets.eye_icon
                        }
                        alt="Toggle Visibility"
                        className={`cursor-pointer ${
                          togglingId === car._id
                            ? "opacity-60 pointer-events-none"
                            : ""
                        }`}
                        title="Toggle availability"
                      />
                      <img
                        onClick={() => askDelete(car)}
                        src={assets.delete_icon}
                        alt="Delete"
                        className="cursor-pointer"
                        title="Delete car"
                      />
                    </div>
                  </td>
                </motion.tr>
              ))}

              {!cars?.length && (
                <tr>
                  <td
                    className="p-4 text-center text-[var(--color-text-secondary)]"
                    colSpan={5}
                  >
                    {loading ? "Loading cars..." : "No cars found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white border border-[var(--color-borderColor)] rounded-md p-6 w-[90%] max-w-sm text-[var(--color-text-secondary)]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-medium text-[var(--color-text-primary)]">
                Confirm Delete
              </h3>
              <p className="mt-2">
                Are you sure you want to delete{" "}
                <span className="font-medium">
                  {confirmCar?.brand} {confirmCar?.model}
                </span>
                ?
              </p>

              <div className="mt-5 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setConfirmOpen(false);
                    setConfirmCar(null);
                  }}
                  className="px-4 py-2 rounded-md border border-[var(--color-borderColor)]"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={!!deletingId}
                  className="px-4 py-2 rounded-md bg-[var(--color-error)] text-white disabled:opacity-60"
                >
                  {deletingId ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageCars;
