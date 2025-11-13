// src/pages/FeaturedListings/FeaturedListings.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const FeaturedListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out", once: true });

    fetch("https://paw-mart-api-server.vercel.app/products/latest")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading listings...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-[var(--btn-bg)]">
        Recent Listings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((item) => (
          <div
            key={item._id}
            data-aos="fade-up"
            className="relative bg-[var(--bg-color)] dark:bg-slate-800 rounded-xl p-4 shadow-md hover:shadow-2xl transition-transform transform hover:-translate-y-1 cursor-pointer"
          >
            {/* Badge */}
            <span
              className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full ${
                item.price ? "bg-[var(--btn-bg)] text-[var(--btn-text)]" : "bg-green-500 text-white"
              }`}
              data-tooltip-id={`tooltip-${item._id}`}
              data-tooltip-content={item.price ? `$${item.price}` : "Free for Adoption"}
            >
              {item.price ? "For Sale" : "Adoption"}
            </span>

            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
            />

            {/* Name */}
            <h3
              className="text-xl font-semibold mb-2 text-[var(--text-color)]"
              data-tooltip-id={`tooltip-name-${item._id}`}
              data-tooltip-content={`Category: ${item.category || "Not specified"}`}
            >
              {item.name}
            </h3>

            {/* Category */}
            <p className="text-gray-500 dark:text-gray-300 mb-1">
              {item.category || "Category not specified"}
            </p>

            {/* Price */}
            <p className="text-gray-800 dark:text-gray-200 font-bold mb-2">
              {item.price ? `$${item.price}` : "Free for Adoption"}
            </p>

            {/* Location */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {item.location || "Location not specified"}
            </p>

            {/* Details Button */}
            <Link
              to={`/petAndSupplies/${item._id}`}
              className="inline-block bg-[var(--btn-bg)] text-[var(--btn-text)] px-4 py-2 rounded-md hover:opacity-90 transition"
            >
              See Details
            </Link>

            {/* Tooltips */}
            <ReactTooltip id={`tooltip-${item._id}`} place="top" effect="solid" />
            <ReactTooltip id={`tooltip-name-${item._id}`} place="top" effect="solid" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedListings;
