import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const CategoryFilteredProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/products/category/${encodeURIComponent(categoryName)}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [categoryName]);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  if (products.length === 0)
    return (
      <p className="text-center mt-10">
        No products found in "{categoryName}"
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto mt-20">
      <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
        Showing Products for: {categoryName}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className=" rounded-md p-4 hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.location}</p>
            <p className="text-gray-500 text-sm mt-1">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilteredProducts;
