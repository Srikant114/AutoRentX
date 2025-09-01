import React from "react";
import Title from "../components/Title";
import { motion } from "framer-motion";

const Cookies = () => {
  return (
    <div className="py-12 px-6 md:px-12 lg:px-20 bg-[var(--color-light)] min-h-screen">
      {/* Page Title */}
      <Title
        title="Cookies Policy"
        subtitle="How we use cookies on AutoRentX"
      />

      {/* Content Sections */}
      <div className="space-y-8 max-w-4xl mx-auto mt-10">
        {/* Section 1 */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md border border-[var(--color-borderColor)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            What Are Cookies?
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            Cookies are small text files stored on your device when you visit our platform. 
            They help us recognize you, improve your browsing experience, and make our services 
            more efficient.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md border border-[var(--color-borderColor)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Why We Use Cookies
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            We use cookies to:
          </p>
          <ul className="list-disc pl-6 mt-2 text-[var(--color-text-secondary)] space-y-1">
            <li>Remember your preferences and login sessions.</li>
            <li>Analyze platform performance and improve features.</li>
            <li>Provide personalized car rental suggestions.</li>
            <li>Enhance security and prevent fraudulent activity.</li>
          </ul>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md border border-[var(--color-borderColor)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-text-primary)]">
            Managing Cookies
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            You can manage or disable cookies through your browser settings. However, please 
            note that some features of AutoRentX may not function properly if cookies are disabled.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Cookies;
