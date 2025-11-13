import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const FeaturedListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/products/latest") // Server route already returns 6 latest products
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
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Recent Listings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              {item.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-1">{item.category}</p>
            <p className="text-gray-800 dark:text-gray-200 font-bold mb-1">
              {item.price ? `$${item.price}` : "Free for Adoption"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {item.location || "Location not specified"}
            </p>
            <Link
              to={`/petAndSupplies/${item._id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedListings;
