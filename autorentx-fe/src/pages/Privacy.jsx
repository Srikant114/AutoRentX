import React from "react";
import Title from "../components/Title";
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <div className="py-12 px-6 md:px-12 lg:px-20 bg-[var(--color-light)] min-h-screen">
      <Title
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
      />

      <div className="space-y-8 max-w-4xl mx-auto mt-10">
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md border border-[var(--color-borderColor)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Information We Collect
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            We may collect details like your name, email, phone number, and
            payment information for booking purposes.
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md border border-[var(--color-borderColor)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            How We Use Your Data
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            Your data is used to provide seamless booking, manage rentals,
            improve services, and ensure platform security.
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md border border-[var(--color-borderColor)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Data Security
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            We use encryption, firewalls, and secure servers to protect your
            information from unauthorized access.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
