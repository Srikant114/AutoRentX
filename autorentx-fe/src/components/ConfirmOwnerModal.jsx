import React from "react";
import { motion } from "framer-motion";

const ConfirmOwnerModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white max-w-md w-full rounded-2xl shadow-lg p-6 text-center"
      >
        <h2 className="text-xl font-semibold text-text-primary">
          Become a Car Owner?
        </h2>
        <p className="text-text-secondary mt-2 text-sm">
          By becoming a car owner, you’ll be able to <br />
          • List your luxury car on AutoRentX <br />
          • Manage bookings and availability <br />
          • Access your personalized dashboard
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-borderColor text-text-secondary hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary-dull transition-all"
          >
            Yes, Continue
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmOwnerModal;
