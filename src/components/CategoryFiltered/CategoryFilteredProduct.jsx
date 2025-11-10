import React from "react";
import { useParams } from "react-router";

const CategoryFilteredProducts = () => {
  const { categoryName } = useParams();

  return (
    <div className="max-w-5xl mx-auto text-center mt-20">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Showing Products for: {categoryName}
      </h1>

      <div >
        <p className="text-gray-600">Here will appear all {categoryName} products.</p>
      </div>
    </div>
  );
};

export default CategoryFilteredProducts;
