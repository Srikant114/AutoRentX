import React from "react";
import Title from "../components/Title";
import { motion } from "framer-motion";

const HelpCenter = () => {
  return (
    <div className="py-12 px-6 md:px-12 lg:px-20 bg-[var(--color-light)] min-h-screen">
      <Title
        title="Help Center"
        subtitle="Get answers and support for your AutoRentX journey"
      />

      <div className="space-y-8 max-w-4xl mx-auto mt-10">
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md border border-[var(--color-borderColor)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Booking Support
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            Need help with booking a car? Reach out to us for step-by-step
            guidance or browse our FAQs for quick solutions.
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md border border-[var(--color-borderColor)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Payment & Refunds
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            Having trouble with payments or waiting for a refund? Our support
            team is available to help you resolve issues quickly.
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md border border-[var(--color-borderColor)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Contact Us
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            Still stuck? Email us at{" "}
            <span className="font-medium">support@autorentx.com</span> or call
            us at +91-XXXXXXXXXX.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenter;
