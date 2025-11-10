import React from 'react';
import { useNavigate } from 'react-router';

const categories = [
  {
    name: "Pets (Adoption)",
    value: "Pets",
    icon: "🐶",
  },
  {
    name: "Pet Food",
    value: "Food",
    icon: "🍖",
  },
  {
    name: "Accessories",
    value: "Accessories",
    icon: "🎒",
  },
  {
    name: "Pet Care Products",
    value: "Care",
    icon: "🧴",
  },
];

const Categories = () => {
    const navigate = useNavigate();
    const handleCategoryClick = (category)=>{
        navigate(`/categoryProducts/${category}`)
    }
    return (
         <div className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        🐾 Browse by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.value}
            onClick={() => handleCategoryClick(cat.value)}
            className="cursor-pointer bg-white shadow-md rounded-2xl flex flex-col items-center justify-center p-6 hover:bg-blue-50 hover:scale-105 transition-transform"
          >
            <div className="text-5xl mb-3">{cat.icon}</div>
            <h3 className="text-lg font-semibold text-gray-700">
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
    );
};

export default Categories;