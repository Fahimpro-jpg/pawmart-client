import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";

const UpdateListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://paw-mart-api-server.vercel.app/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load listing");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedListing = {
      name: form.name.value,
      category: form.category.value,
      price: form.price.value,
      location: form.location.value,
      image: form.image.value,
    };

    try {
      const res = await fetch(`https://paw-mart-api-server.vercel.app/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedListing),
      });

      if (!res.ok) throw new Error("Failed to update");

      toast.success("Listing updated successfully ✅");
      navigate("/myListings");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while updating.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner text-[var(--btn-bg)]"></span>
      </div>
    );

  return (
    <div
      className="max-w-xl mx-auto p-8 rounded-lg mt-10 shadow-lg transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-[var(--text-color)]">
        Update Listing
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          defaultValue={listing.name}
          placeholder="Name"
          className="input input-bordered w-full bg-[var(--bg-color)] text-[var(--text-color)] border-gray-300 dark:border-gray-600"
          required
        />

        <input
          name="category"
          type="text"
          defaultValue={listing.category}
          placeholder="Category"
          className="input input-bordered w-full bg-[var(--bg-color)] text-[var(--text-color)] border-gray-300 dark:border-gray-600"
          required
        />

        <input
          name="price"
          type="number"
          defaultValue={listing.price}
          placeholder="Price"
          className="input input-bordered w-full bg-[var(--bg-color)] text-[var(--text-color)] border-gray-300 dark:border-gray-600"
        />

        <input
          name="location"
          type="text"
          defaultValue={listing.location}
          placeholder="Location"
          className="input input-bordered w-full bg-[var(--bg-color)] text-[var(--text-color)] border-gray-300 dark:border-gray-600"
        />

        <input
          name="image"
          type="text"
          defaultValue={listing.image}
          placeholder="Image URL"
          className="input input-bordered w-full bg-[var(--bg-color)] text-[var(--text-color)] border-gray-300 dark:border-gray-600"
        />

        <button
          type="submit"
          className="btn-custom w-full bg-[var(--btn-bg)] text-[var(--btn-text)] hover:opacity-90 hover:scale-[1.02] mt-3"
        >
          Update Listing
        </button>
      </form>
    </div>
  );
};

export default UpdateListing;
