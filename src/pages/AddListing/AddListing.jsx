import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const AddListing = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    location: "",
    description: "",
    image: "",
    date: "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.image) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const productData = {
      ...formData,
      price: formData.category === "Pets" ? 0 : Number(formData.price),
      email: user?.email,
      date: new Date(formData.date),
    };

    try {
      const res = await fetch(
        "https://paw-mart-api-server.vercel.app/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        }
      );

      if (!res.ok) throw new Error("Failed to add product");

      toast.success("Listing added successfully 🎉");
      setFormData({
        name: "",
        category: "",
        price: "",
        location: "",
        description: "",
        image: "",
        date: "",
        email: user?.email || "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div
      className="min-h-screen py-10 px-5 transition-colors duration-500"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      {/* Title */}
      <h2 className="text-4xl font-bold text-center mb-10 text-[var(--btn-bg)] drop-shadow-md">
        Add New Listing <span className="text-[var(--text-color)]">(Adoption or Product)</span>
      </h2>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto p-8 rounded-2xl shadow-lg grid md:grid-cols-2 gap-8 border border-gray-200 dark:border-gray-700 transition-all duration-500"
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
        }}
      >
        {/* LEFT SIDE */}
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Product / Pet Name</label>
            <input
              type="text"
              name="name"
              className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-[var(--btn-bg)] outline-none transition"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
  <label className="block font-semibold mb-1">Category</label>
  <select
    name="category"
    className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-600 
               bg-[var(--bg-color)] dark:bg-[var(--bg-color)] text-[var(--text-color)] 
               focus:ring-2 focus:ring-[var(--btn-bg)] outline-none transition"
    value={formData.category}
    onChange={handleChange}
    required
  >
    <option value="">Select Category</option>
    <option value="Pets">Pets</option>
    <option value="Food">Food</option>
    <option value="Accessories">Accessories</option>
    <option value="Care Products">Care Products</option>
  </select>
</div>

          {formData.category !== "Pets" && (
            <div>
              <label className="block font-semibold mb-1">Price</label>
              <input
                type="number"
                name="price"
                className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-[var(--btn-bg)] outline-none transition"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-[var(--btn-bg)] outline-none transition"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Pick Up Date</label>
            <input
              type="date"
              name="date"
              className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-[var(--btn-bg)] outline-none transition"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              className="w-full h-32 rounded-lg p-2 border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-[var(--btn-bg)] outline-none transition"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-[var(--btn-bg)] outline-none transition"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full rounded-lg p-2 border border-gray-300 dark:border-gray-600 bg-transparent text-gray-500 cursor-not-allowed"
              value={user?.email || ""}
              readOnly
            />
          </div>

          <button
            type="submit"
            className="btn-custom w-full mt-5 shadow-md hover:shadow-lg"
          >
            Add Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
