import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out", once: true });
  }, []);

  return (
    <footer
      className="bg-black text-[var(--text-color)] mt-20 py-10 border-t border-gray-700"
      data-aos="fade-up"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-bold text-[var(--btn-bg)] mb-3">
            🐾 PawMart
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            PawMart connects local pet owners and buyers for adoption and pet
            care products. Find your furry friend or the best pet supplies near
            you.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-[var(--btn-bg)]">
            Useful Links
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link
                to="/"
                className="hover:text-[var(--btn-bg)] transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[var(--btn-bg)] transition duration-200"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-[var(--btn-bg)] transition duration-200"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center md:items-end justify-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} PawMart. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Made with ❤️ by the PawMart Team
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-xs text-gray-500 border-t border-gray-700 pt-4 animate__animated animate__fadeInUp">
        Designed for pet lovers everywhere 🐶🐱
      </div>
    </footer>
  );
};

export default Footer;
