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
    hover: {
      scale: 1.05,
      boxShadow: "0 12px 40px rgba(56, 189, 248, 0.25)", // sky-400 glow
    },
  };

  return (
    <section className="mt-20 py-16 transition-colors duration-500"
      style={{
        background: "linear-gradient(to bottom, var(--bg-color), #f1f5f9)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-12"
          style={{ color: "var(--text-color)" }}
        >
          Meet Our{" "}
          <span className="text-[var(--btn-bg)] drop-shadow-md">Pet Heroes</span>
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
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              style={{
                backgroundColor: "var(--bg-color)",
                color: "var(--text-color)",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <motion.img
                src={hero.image}
                alt={hero.name}
                className="w-full h-64 object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{hero.name}</h3>
                <p className="text-sm opacity-80 leading-relaxed">
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
