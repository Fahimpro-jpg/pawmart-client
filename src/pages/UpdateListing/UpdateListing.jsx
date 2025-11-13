import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";

const UpdateListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🧭 Fetch listing data
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

  // 📝 Handle update form submission
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
        <span className="loading loading-spinner text-success"></span>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto bg-base-200 p-8 rounded-lg mt-10 shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Update Listing</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          defaultValue={listing.name}
          placeholder="Name"
          className="input input-bordered w-full"
          required
        />

        <input
          name="category"
          type="text"
          defaultValue={listing.category}
          placeholder="Category"
          className="input input-bordered w-full"
          required
        />

        <input
          name="price"
          type="number"
          defaultValue={listing.price}
          placeholder="Price"
          className="input input-bordered w-full"
        />

        <input
          name="location"
          type="text"
          defaultValue={listing.location}
          placeholder="Location"
          className="input input-bordered w-full"
        />

        <input
          name="image"
          type="text"
          defaultValue={listing.image}
          placeholder="Image URL"
          className="input input-bordered w-full"
        />

        <button
          type="submit"
          className="btn w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          Update Listing
        </button>
      </form>
    </div>
  );
};

export default UpdateListing;
