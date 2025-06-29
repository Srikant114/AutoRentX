import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-text-secondary">
      {/* ---------- Top Section: Logo, Links, Socials ---------- */}
      <div className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b">
        {/* Brand Logo + Description + Social Icons */}
        <div>
          <img
            src={assets?.autoXlogo}
            alt="AutoRentX Logo"
            className="h-8 md:h-9"
          />
          <p className="max-w-80 mt-3">
            AutoRentX offers premium car rentals across India with verified drivers, seamless bookings, and flexible plans.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 mt-6">
            <a href="#"><img src={assets.facebook_logo} alt="facebook" className="w-5 h-5 hover:opacity-80" /></a>
            <a href="#"><img src={assets.instagram_logo} alt="instagram" className="w-5 h-5 hover:opacity-80" /></a>
            <a href="#"><img src={assets.twitter_logo} alt="twitter" className="w-5 h-5 hover:opacity-80" /></a>
            <a href="#"><img src={assets.gmail_logo} alt="gmail" className="w-5 h-5 hover:opacity-80" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-base font-medium text-text-primary uppercase">Quick Links</h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li><a href="#" className="hover:text-primary transition-all">Home</a></li>
            <li><a href="#" className="hover:text-primary transition-all">Browse Cars</a></li>
            <li><a href="#" className="hover:text-primary transition-all">List Your Car</a></li>
            <li><a href="#" className="hover:text-primary transition-all">About Us</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-base font-medium text-text-primary uppercase">Resources</h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li><a href="#" className="hover:text-primary transition-all">Help Center</a></li>
            <li><a href="#" className="hover:text-primary transition-all">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary transition-all">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-all">Insurance</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-base font-medium text-text-primary uppercase">Contact</h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>AutoRentX HQ</li>
            <li>Bhubaneswar, Odisha, India</li>
            <li>+91-70086 52356</li>
            <li>support@autorentx.in</li>
          </ul>
        </div>
      </div>

      {/* ---------- Bottom Section: Legal Links ---------- */}
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>© {new Date().getFullYear()} AutoRentX. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li><a href="#" className="hover:text-primary transition-all">Privacy</a></li>
          <li>|</li>
          <li><a href="#" className="hover:text-primary transition-all">Terms</a></li>
          <li>|</li>
          <li><a href="#" className="hover:text-primary transition-all">Cookies</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
