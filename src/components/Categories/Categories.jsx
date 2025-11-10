import React from 'react';
import adoptPet from '../../assets/download.jpeg'
import petFood from "../../assets/petFood.jpeg"
import accesories from '../../assets/Acccesories.jpeg'
import petCareProducts from "../../assets/petCareProducts.jpeg"
import { useNavigate } from 'react-router';
const Categories = () => {
    const navigate = useNavigate()
    const handleCategoryClick = (category) => {
    navigate(`/category-filtered-product/${category}`);
  };
    return (
        <div className='w-[1200px] mx-auto flex justify-around mt-15 border border-e-green-500'>
            <div onClick={() => handleCategoryClick('Pets (Adoption)')} className='cursor-pointer hover:scale-105 transition-transform'>
                <h2 className='text-center text-3xl font-semibold mb-7'>Pets (Adoption)</h2>
                <img className='w-[200px] h-[200px]' src={adoptPet} alt="" />
            </div>
            <div onClick={() => handleCategoryClick('Pet Food')} className='cursor-pointer hover:scale-105 transition-transform'>
                <h2 className='text-center text-3xl font-semibold mb-7'>Pet Food</h2>
                <img className='w-[200px] h-[200px]' src={petFood} alt="" />
            </div>
            <div onClick={() => handleCategoryClick('Accessories')} className='cursor-pointer hover:scale-105 transition-transform'>
                <h2 className='text-center text-3xl font-semibold mb-7'>Accessories</h2>
                <img className='w-[200px] h-[200px]' src={accesories} alt="" />
            </div>
            <div onClick={() => handleCategoryClick('Pet Care Products')} className='cursor-pointer hover:scale-105 transition-transform'>
                <h2 className='text-center text-3xl font-semibold mb-7'>Pet Care Products</h2>
                <img className='w-[200px] h-[200px]' src={petCareProducts} alt="" />
            </div>
        </div>
    );
};

export default Categories;