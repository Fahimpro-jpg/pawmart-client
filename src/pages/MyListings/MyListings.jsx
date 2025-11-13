import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://paw-mart-api-server.vercel.app/products?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setListings(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load listings.");
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://paw-mart-api-server.vercel.app/products/${id}`, {
            method: "DELETE",
          });

          if (!res.ok) throw new Error("Failed to delete");

          setListings((prev) => prev.filter((item) => item._id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "Your listing has been deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        } catch (err) {
          console.error(err);
          toast.error("Something went wrong while deleting.");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner text-[var(--btn-bg)]"></span>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-10 px-4 sm:px-6 lg:px-12 transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center">My Listings ({listings.length})</h2>

      {listings.length === 0 ? (
        <p className="text-center opacity-80 text-base">You haven’t added any listings yet.</p>
      ) : (
        <>
          {/* 🖥️ Table for medium & large devices */}
          <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg max-w-7xl mx-auto">
            <table className="table w-full text-sm">
              <thead
                style={{
                  backgroundColor: "rgba(0,0,0,0.05)",
                  color: "var(--text-color)",
                }}
              >
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {listings.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:opacity-90 transition border-b border-gray-300 dark:border-gray-700"
                  >
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-md border border-gray-300 dark:border-gray-600"
                      />
                    </td>
                    <td className="font-medium">{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price || "Free"}</td>
                    <td>{item.location}</td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td className="space-x-2">
                      <Link
                        to={`/update-listing/${item._id}`}
                        className="btn-custom inline-block"
                        style={{
                          backgroundColor: "var(--btn-bg)",
                          color: "var(--btn-text)",
                        }}
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn-custom inline-block"
                        style={{
                          backgroundColor: "#ef4444",
                          color: "#fff",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📱 Card view for mobile */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {listings.map((item, index) => (
              <div
                key={item._id}
                className="rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 bg-[var(--bg-color)]"
              >
                <td>{index+1}</td>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                <p className="text-sm opacity-80 mb-1">
                  <span className="font-medium">Category:</span> {item.category}
                </p>
                <p className="text-sm opacity-80 mb-1">
                  <span className="font-medium">Price:</span> {item.price || "Free"}
                </p>
                <p className="text-sm opacity-80 mb-1">
                  <span className="font-medium">Location:</span> {item.location}
                </p>
                <p className="text-sm opacity-80 mb-3">
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(item.date).toLocaleDateString()}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/update-listing/${item._id}`}
                    className="flex-1 text-center py-2 rounded-lg font-medium"
                    style={{
                      backgroundColor: "var(--btn-bg)",
                      color: "var(--btn-text)",
                    }}
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 text-center py-2 rounded-lg font-medium"
                    style={{
                      backgroundColor: "#ef4444",
                      color: "#fff",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyListings;
