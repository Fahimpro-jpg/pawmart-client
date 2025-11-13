// src/pages/AllProducts/AllProducts.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';

const AllProducts = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: true });
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = 'https://paw-mart-api-server.vercel.app/products';
      if (selectedCategory) {
        url = `https://paw-mart-api-server.vercel.app/products/category/${encodeURIComponent(selectedCategory)}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setAllProducts(data);

      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  // Filter products by search term
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center mt-10 text-lg animate__animated animate__flash">Loading products...</p>;

  // Array of different animations
  const animations = [
    'animate__fadeInUp',
    'animate__fadeInLeft',
    'animate__fadeInRight',
    'animate__zoomIn'
  ];

  return (
    <div className="max-w-7xl mx-auto p-5 bg-gray-200">
      <h2 className="font-bold text-5xl text-center mt-10 mb-5 text-[var(--btn-bg)] animate__animated animate__bounceIn">
        Pets & Supplies
      </h2>

      {/* Search & Filter */}
      <div className="flex justify-center gap-5 mt-5 mb-10 flex-wrap ">
        <input
          className="outline-none rounded-lg p-2 w-64 shadow-sm focus:ring-2 focus:ring-[var(--btn-bg)] transition"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <select
          className="outline-none rounded-lg p-2 w-64 shadow-sm focus:ring-2 focus:ring-[var(--btn-bg)] transition"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-200">
        {filteredProducts.map((product, index) => (
          <div
            key={product._id}
            data-aos={['fade-up', 'fade-left', 'fade-right', 'zoom-in'][index % 4]} // 4 types of AOS animations
            className={`relative  rounded-lg p-4 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 bg-[var(--bg-color)] text-[var(--text-color)] animate__animated ${animations[index % 4]}`}
          >
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded mb-4" />
            <h3 className="font-bold text-xl mt-2">{product.name}</h3>
            <p className="text-gray-500">{product.category}</p>
            <p className="text-gray-500">{product.location || 'Location not specified'}</p>
            <p className="font-semibold mt-1">{product.price ? `$${product.price}` : 'Free for Adoption'}</p>
            <button
              onClick={() => navigate(`/petAndSupplies/${product._id}`)}
              className="mt-3 bg-[var(--btn-bg)] text-[var(--btn-text)] px-4 py-2 rounded hover:opacity-90 transition"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
