import React from "react";
import Title from "../components/Title";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div className="py-12 px-6 md:px-12 lg:px-20 bg-[var(--color-light)] min-h-screen">
      <Title
        title="Terms of Service"
        subtitle="The rules and guidelines for using AutoRentX"
      />

      <div className="space-y-8 max-w-4xl mx-auto mt-10">
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md border border-[var(--color-borderColor)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Acceptance of Terms
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            By using AutoRentX, you agree to follow all policies, rules, and
            conditions outlined in these Terms of Service.
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md border border-[var(--color-borderColor)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Rental Agreements
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            When booking a vehicle, you enter into a rental contract that
            includes our policies on usage, fuel, and return conditions.
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md border border-[var(--color-borderColor)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Limitations of Liability
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            AutoRentX is not responsible for damages caused by misuse of
            vehicles, negligence, or accidents not covered under insurance.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
