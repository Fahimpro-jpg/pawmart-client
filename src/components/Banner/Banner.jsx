import React from 'react';
import { motion } from 'framer-motion';
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

  // Framer Motion variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bannerItems.map((item, index) => (
          <motion.div
            key={index}
            className="bg-[var(--bg-color)] text-[var(--text-color)] rounded-2xl shadow-md p-4 cursor-pointer"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover="hover"
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h2 className="font-bold text-xl mb-4 text-center text-[var(--btn-bg)]">
              {item.title}
            </h2>
            <motion.img
              src={item.image}
              alt={item.title}
              className="w-full h-[250px] object-cover rounded-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
