import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import { motion } from "framer-motion";
import Loader from "../components/Loader"; // ✅ import loader

const AboutUs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />; // ✅ show loader while page loads

  return (
    <>
      {/* Header Section */}
      <motion.div
        className="flex flex-col items-center bg-light py-20 pb-10 max-md:px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title
          title="About AutoRentX"
          subTitle="Your trusted car rental partner – delivering convenience, comfort, and reliability on every journey."
          align="center"
        />
      </motion.div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-16 lg:px-24 xl:px-32 py-12">
        {/* Left: Image */}
        <motion.div
          className="flex-shrink-0 w-full md:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <img
            className="w-full rounded-2xl shadow-md object-cover"
            src="https://images.unsplash.com/photo-1628573042918-a91e94c2c906?w=900&auto=format&fit=crop&q=60"
            alt="Luxury rental car"
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)]">
            Why Choose AutoRentX?
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-3 leading-relaxed">
            Whether it’s a business trip, a family vacation, or a weekend getaway,
            AutoRentX provides well-maintained cars, affordable rates, and
            seamless booking for a hassle-free experience.
          </p>

          {/* Features */}
          <div className="flex flex-col gap-8 mt-8">
            {[
              {
                title: "Quick & Easy Booking",
                desc: "Book your ride in just a few clicks with instant confirmation.",
                icon: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png",
              },
              {
                title: "Wide Range of Cars",
                desc: "From budget-friendly hatchbacks to luxury sedans & SUVs – we’ve got you covered.",
                icon: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png",
              },
              {
                title: "Reliable & 24/7 Support",
                desc: "Our team ensures your journey stays smooth with round-the-clock customer support.",
                icon: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png",
              },
              {
                title: "Affordable Pricing",
                desc: "Transparent rates with no hidden charges – pay only for what you book.",
                icon: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-[var(--color-primary-light)] border border-[var(--color-borderColor)] rounded-lg">
                  <img src={feature.icon} alt={feature.title} className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-[var(--color-text-primary)]">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mission Banner */}
      <motion.div
        className="bg-[var(--color-primary-light)] py-12 px-6 md:px-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-text-primary)]">
          Our Mission
        </h2>
        <p className="text-sm md:text-base text-[var(--color-text-secondary)] mt-3 max-w-3xl mx-auto leading-relaxed">
          At <span className="font-medium text-[var(--color-primary)]">AutoRentX</span>, 
          we strive to make travel simple, affordable, and stress-free.  
          Our goal is to give everyone access to reliable cars – whether it’s for 
          a short city drive or a long road trip across India.
        </p>
      </motion.div>
    </>
  );
};

export default AboutUs;
