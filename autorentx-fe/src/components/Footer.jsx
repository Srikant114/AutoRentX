import React from 'react';
import { assets } from '../assets/assets';
import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.div
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-text-secondary"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {/* ---------- Top Section: Logo, Links, Socials ---------- */}
      <div className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b">
        {/* Brand Logo + Description + Social Icons */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.img
            src={assets?.autoXlogo}
            alt="AutoRentX Logo"
            className="h-8 md:h-9"
            whileHover={{ scale: 1.05 }}
          />
          <p className="max-w-80 mt-3">
            AutoRentX offers premium car rentals across India with verified drivers, seamless bookings, and flexible plans.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 mt-6">
            {[assets.facebook_logo, assets.instagram_logo, assets.twitter_logo, assets.gmail_logo].map((icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <img src={icon} alt="social" className="w-5 h-5 hover:opacity-80" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-base font-medium text-text-primary uppercase">Quick Links</h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            {["Home", "Browse Cars", "List Your Car", "About Us"].map((link, i) => (
              <motion.li key={i} whileHover={{ x: 5, color: "#F97316" }}>
                <a href="#" className="hover:text-primary transition-all">{link}</a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-base font-medium text-text-primary uppercase">Resources</h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            {["Help Center", "Terms of Service", "Privacy Policy", "Insurance"].map((link, i) => (
              <motion.li key={i} whileHover={{ x: 5, color: "#F97316" }}>
                <a href="#" className="hover:text-primary transition-all">{link}</a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-base font-medium text-text-primary uppercase">Contact</h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>AutoRentX HQ</li>
            <li>Bhubaneswar, Odisha, India</li>
            <li>+91-70086 52356</li>
            <li>support@autorentx.in</li>
          </ul>
        </motion.div>
      </div>

      {/* ---------- Bottom Section: Legal Links ---------- */}
      <motion.div
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p>© {new Date().getFullYear()} AutoRentX. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          {["Privacy", "Terms", "Cookies"].map((link, i) => (
            <motion.li key={i} whileHover={{ scale: 1.1, color: "#F97316" }}>
              <a href="#" className="hover:text-primary transition-all">{link}</a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
