// src/components/MetOurHero/MetOurHero.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import expert1 from "../../assets/kadyn-pierce-4ugDavjID30-unsplash.jpg";
import expert2 from "../../assets/susanna-marsiglia-2Sk59DvnWCo-unsplash.jpg";
import expert3 from "../../assets/oo-verthing-vMsELAIN4gs-unsplash.jpg";

const MetOurHero = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out", once: true });
  }, []);

  const heroCards = [
    {
      name: "Sarah Johnson",
      description:
        "Sarah has rescued over 15 dogs and helped them find loving homes. Her compassion inspires our community every day.",
      image: expert1,
      aos: "fade-right",
    },
    {
      name: "Susana Margisila",
      description:
        "A lifelong cat lover who fosters injured kittens until they’re ready to be adopted. Her care makes a world of difference.",
      image: expert2,
      aos: "fade-up",
    },
    {
      name: "Emma Rodriguez",
      description:
        "Emma runs a local animal shelter that has saved hundreds of pets. Her dedication reminds us why adoption matters.",
      image: expert3,
      aos: "fade-left",
    },
  ];

  const cardVariants = {
    hover: { scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" },
  };

  return (
    <section className="mt-20 py-16 bg-gradient-to-b from-white to-gray-100 dark:from-slate-800 dark:to-slate-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-slate-800 dark:text-slate-100">
          Meet Our <span className="text-[var(--btn-bg)]">Pet Heroes</span>
        </h2>

        {/* Hero cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {heroCards.map((hero, index) => (
            <motion.div
              key={index}
              data-aos={hero.aos}
              whileHover="hover"
              variants={cardVariants}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-[var(--bg-color)] dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 overflow-hidden"
            >
              <motion.img
                src={hero.image}
                alt={hero.name}
                className="w-full h-64 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[var(--text-color)] mb-2">
                  {hero.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {hero.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetOurHero;
