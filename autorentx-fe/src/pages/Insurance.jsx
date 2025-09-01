import React from "react";
import Title from "../components/Title";
import { motion } from "framer-motion";

const Insurance = () => {
  return (
    <div className="py-12 px-6 md:px-12 lg:px-20 bg-[var(--color-light)] min-h-screen">
      <Title
        title="Insurance Policy"
        subtitle="Coverage and protection for your rentals"
      />

      <div className="space-y-8 max-w-4xl mx-auto mt-10">
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md border border-[var(--color-borderColor)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Basic Coverage
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            All rentals come with basic insurance coverage against accidents and
            third-party liabilities as per Indian motor laws.
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md border border-[var(--color-borderColor)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Optional Add-Ons
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            Customers can opt for additional protection such as zero-depreciation
            cover, roadside assistance, and theft protection.
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md border border-[var(--color-borderColor)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Exclusions
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            Insurance does not cover damages due to reckless driving, drunk
            driving, or traffic violations.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Insurance;
