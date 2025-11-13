import React from 'react';
import furryFriend from '../../assets/furryFriend.jpg';
import adopted from '../../assets/adpotNow.jpg';
import ownerPet from '../../assets/OwnerandPet.jpg';

const Banner = () => {
  const bannerItems = [
    {
      title: 'Find Your Furry Friend Today!',
      image: furryFriend,
    },
    {
      title: '“Adopt, Don’t Shop — Give a Pet a Home.”',
      image: adopted,
    },
    {
      title: 'Because Every Pet Deserves Love and Care.',
      image: ownerPet,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Banner grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bannerItems.map((item, index) => (
          <div
            key={index}
            className="bg-[var(--bg-color)] text-[var(--text-color)] rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-105 duration-300 p-4"
          >
            <h2 className="font-bold text-xl mb-4 text-center">{item.title}</h2>
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[250px] object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
