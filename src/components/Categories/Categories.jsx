import React from 'react';
import adoptPet from '../../assets/download.jpeg';
import petFood from "../../assets/petFood.jpeg";
import accessories from '../../assets/Acccesories.jpeg';
import petCareProducts from "../../assets/petCareProducts.jpeg";
import { useNavigate } from 'react-router';

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category-filtered-product/${category}`);
  };

  const categoryList = [
    { name: 'Pets (Adoption)', image: adoptPet },
    { name: 'Pet Food', image: petFood },
    { name: 'Accessories', image: accessories },
    { name: 'Pet Care Products', image: petCareProducts },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-center text-3xl font-bold mb-10 text-[var(--text-color)]">
        Explore by Categories 🐾
      </h2>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {categoryList.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category.name)}
            className="cursor-pointer w-full max-w-[250px] p-4 rounded-xl border border-gray-200 hover:shadow-lg hover:scale-105 transition-transform duration-300 bg-[var(--bg-color)] text-[var(--text-color)]"
          >
            <h3 className="text-center text-xl font-semibold mb-4">{category.name}</h3>
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-[180px] object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
