import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

const ProductDetail = () => {
  const { id } = useParams(); // matches /petAndSupplies/:id
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product by ID from your backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-5">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 text-blue-500 underline"
      >
        &larr; Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-96 object-cover rounded-lg"
        />

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-2">{product.category}</p>
          <p className="text-gray-500 mb-2">{product.location}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="font-semibold text-xl mb-4">Price: {product.price}</p>
          <p className="text-gray-500 mb-2">Posted by: {product.email}</p>
          <p className="text-gray-500">
            Date: {new Date(product.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
