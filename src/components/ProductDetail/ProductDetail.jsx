// src/pages/ProductDetail/ProductDetail.jsx
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
        const res = await fetch(`http://localhost:3000/products/${id}`);
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
      const res = await fetch("http://localhost:3000/orders", {
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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <Toaster position="top-center" />

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[360px] object-cover rounded-xl"
      />

      {/* Product Info */}
      <h2 className="text-3xl font-semibold mt-4">{product.name}</h2>
      <p className="text-gray-600 mt-2 text-lg">{product.category}</p>
      <p className="mt-3 text-gray-700">{product.description}</p>
      <p className="mt-2 text-sm text-gray-500">Price: {product.price ?? "Free"}</p>
      <p className="mt-2 text-sm text-gray-500">
        Location: {product.location || "Not specified"}
      </p>
      <p className="mt-2 text-sm text-gray-500">Posted by: {product.email || "Unknown"}</p>

      <div className="mt-6 flex gap-3">
        <Link
          to="/petAndSupplies"
          className="bg-gray-400 text-white px-5 py-2 rounded-md hover:bg-gray-500 transition"
        >
          ← Back to Products
        </Link>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Adopt / Order Now
        </button>
      </div>

      {/* ORDER MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category} • {product.location || "Unknown"}</p>
                </div>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-2xl text-gray-600 hover:text-black"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            {/* Body: side-by-side order form (grid) */}
            <div className="p-6">
              <form onSubmit={handleOrderSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Buyer Name (readonly) */}
                <div className="flex flex-col">
                  <label className="text-sm mb-1">Buyer Name</label>
                  <input
                    type="text"
                    value={user?.displayName || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>

                {/* Email (readonly) */}
                <div className="flex flex-col">
                  <label className="text-sm mb-1">Email</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>

                {/* Product ID (readonly) */}
                <div className="flex flex-col">
                  <label className="text-sm mb-1">Product / Listing ID</label>
                  <input
                    type="text"
                    value={product._id}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>

                {/* Product Name (readonly) */}
                <div className="flex flex-col">
                  <label className="text-sm mb-1">Product / Listing Name</label>
                  <input
                    type="text"
                    value={product.name}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>

                {/* Quantity */}
                <div className="flex flex-col">
                  <label className="text-sm mb-1">Quantity</label>
                  {isPet ? (
                    <input
                      type="number"
                      value={1}
                      readOnly
                      className="input input-bordered w-full bg-gray-100"
                    />
                  ) : (
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      defaultValue={1}
                      className="input input-bordered w-full"
                      required
                    />
                  )}
                </div>

                {/* Price */}
                <div className="flex flex-col">
                  <label className="text-sm mb-1">Price</label>
                  <input
                    type="text"
                    value={product.price ?? "Free"}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>

                {/* Address (span both columns) */}
                <div className="flex flex-col md:col-span-2">
                  <label className="text-sm mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Pickup / Delivery address"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Date */}
                <div className="flex flex-col">
                  <label className="text-sm mb-1">Date (Pick up)</label>
                  <input type="date" name="date" className="input input-bordered w-full" required />
                </div>

                {/* Phone */}
                <div className="flex flex-col">
                  <label className="text-sm mb-1">Phone</label>
                  <input type="text" name="phone" placeholder="Phone number" className="input input-bordered w-full" required />
                </div>

                {/* Notes (span both) */}
                <div className="flex flex-col md:col-span-2">
                  <label className="text-sm mb-1">Additional Notes</label>
                  <textarea name="notes" className="textarea textarea-bordered w-full" rows="3" placeholder="Any special instructions (optional)"></textarea>
                </div>

                {/* Confirm button (span both) */}
                <div className="md:col-span-2">
                  <button type="submit" className="btn w-full bg-blue-600 text-white hover:bg-blue-700">
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
