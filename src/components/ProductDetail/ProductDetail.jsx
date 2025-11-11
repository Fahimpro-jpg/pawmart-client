import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

const ProductDetail = () => {
  const { id } = useParams(); // ✅ Get product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`); // ✅ Matches backend route
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (!product) return <p className="text-center text-red-500">Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[400px] object-cover rounded-xl"
      />

      <h2 className="text-3xl font-semibold mt-4">{product.name}</h2>
      <p className="text-gray-600 mt-2">{product.category}</p>
      <p className="mt-3 text-gray-700">{product.description}</p>
      <p className="mt-2 text-sm text-gray-500">
        Location: {product.location || "Not specified"}
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Posted by: {product.email || "Unknown"}
      </p>

      <div className="mt-6">
        <Link
          to="/petAndSupplies"
          className="inline-block bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition"
        >
          ← Back to Products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
