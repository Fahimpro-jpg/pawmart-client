import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const AllProducts = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch all products or by category
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:3000/products';
      if (selectedCategory) {
        url = `http://localhost:3000/products/category/${encodeURIComponent(selectedCategory)}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setAllProducts(data);
  

      // Extract unique categories dynamically
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

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h2 className="font-bold text-5xl text-center mt-10">Pets & Supplies</h2>

      {/* Search & Filter */}
      <div className="flex justify-center gap-5 mt-5 mb-10">
        <input
          className="outline rounded-lg p-2"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <select
          className="outline rounded-lg p-2"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div key={product._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
            <h3 className="font-bold text-xl mt-2">{product.name}</h3>
            <p className="text-gray-500">{product.category}</p>
            <p className="text-gray-500">{product.location}</p>
            <p className="font-semibold mt-1">{product.price}</p>
            <button
              onClick={() => navigate(`/petAndSupplies/${product._id}`)}
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
