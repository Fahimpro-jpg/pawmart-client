import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`https://paw-mart-api-server.vercel.app/products/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch product (status ${res.status})`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;

    const form = e.target;
    const isPet = product.category?.toLowerCase() === "pets" || product.category?.toLowerCase() === "pet";

    const orderInfo = {
      buyerName: user?.displayName || "Unknown Buyer",
      buyerEmail: user?.email || "",
      productId: product._id,
      productName: product.name,
      quantity: isPet ? 1 : parseInt(form.quantity.value, 10),
      price: product.price,
      address: form.address.value,
      date: form.date.value,
      phone: form.phone.value,
      notes: form.notes.value || "",
    };

    try {
      const res = await fetch("https://paw-mart-api-server.vercel.app/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderInfo),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to place order (status ${res.status}) ${text}`);
      }

      toast.success("Order placed successfully! 🎉");
      setShowModal(false);
      form.reset();
    } catch (err) {
      console.error("Order submit error:", err);
      toast.error("Failed to submit order. Try again.");
    }
  };

  if (loading) return <p className="text-center text-lg mt-20">Loading...</p>;
  if (!product) return <p className="text-center text-red-500 mt-20">Product not found</p>;

  const isPet = product.category?.toLowerCase() === "pets" || product.category?.toLowerCase() === "pet";

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 rounded-lg shadow-lg bg-[var(--bg-color)] text-[var(--text-color)] transition-all duration-300">
      <Toaster position="top-center" />

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[360px] object-cover rounded-xl shadow-md"
      />

      {/* Product Info */}
      <h2 className="text-3xl font-semibold mt-4">{product.name}</h2>
      <p className="opacity-80 mt-1 text-lg">{product.category}</p>
      <p className="mt-3 opacity-90">{product.description}</p>
      <p className="mt-2 text-sm opacity-70">Price: {product.price ?? "Free"}</p>
      <p className="mt-2 text-sm opacity-70">Location: {product.location || "Not specified"}</p>
      <p className="mt-2 text-sm opacity-70">Posted by: {product.email || "Unknown"}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/petAndSupplies"
          className="btn-custom bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-md transition"
        >
          ← Back to Products
        </Link>

        <button
          onClick={() => setShowModal(true)}
          className="btn-custom bg-[var(--btn-bg)] text-[var(--btn-text)] hover:opacity-90 hover:scale-[1.02]"
        >
          Adopt / Order Now
        </button>
      </div>

      {/* ORDER MODAL */}
      {/* ORDER MODAL */}
{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
    <div className="w-full max-w-3xl rounded-lg overflow-hidden shadow-2xl bg-[var(--bg-color)] text-[var(--text-color)] transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
          <div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm opacity-75">
              {product.category} • {product.location || "Unknown"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(false)}
          className="text-3xl hover:text-[var(--btn-bg)] transition"
          aria-label="Close modal"
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div className="p-6">
        <form onSubmit={handleOrderSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Buyer Name */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 opacity-80">Buyer Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 opacity-80">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          {/* Product ID */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 opacity-80">Product ID</label>
            <input
              type="text"
              value={product._id}
              readOnly
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          {/* Product Name */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 opacity-80">Product Name</label>
            <input
              type="text"
              value={product.name}
              readOnly
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          {/* Quantity */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 opacity-80">Quantity</label>
            {isPet ? (
              <input
                type="number"
                value={1}
                readOnly
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-black dark:text-white"
              />
            ) : (
              <input
                type="number"
                name="quantity"
                min="1"
                defaultValue={1}
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-black dark:text-white"
                required
              />
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 opacity-80">Price</label>
            <input
              type="text"
              value={product.price ?? "Free"}
              readOnly
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm mb-1 opacity-80">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Pickup / Delivery address"
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-black dark:text-white"
              required
            />
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 opacity-80">Date (Pick up)</label>
            <input
              type="date"
              name="date"
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-black dark:text-white"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 opacity-80">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-black dark:text-white"
              required
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm mb-1 opacity-80">Additional Notes</label>
            <textarea
              name="notes"
              className="textarea textarea-bordered w-full bg-white dark:bg-gray-800 text-black dark:text-white"
              rows="3"
              placeholder="Any special instructions (optional)"
            ></textarea>
          </div>

          {/* Confirm Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="btn-custom w-full bg-[var(--btn-bg)] text-[var(--btn-text)] hover:opacity-90 hover:scale-[1.02]"
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ProductDetail;
