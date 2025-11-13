import React from "react";
import bgImage from "../../assets/mladen-milicevic-HElUzlV3erE-unsplash.jpg";

const AdoptPawMart = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat mt-20"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0  bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 text-center text-gray-100">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Why Adopt from <span className="text-amber-400">PawMart?</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto text-gray-200">
          Every adoption changes two lives — the pet’s and yours. By choosing to
          adopt, you’re giving a loving home to a rescued animal and helping to
          stop the cycle of pet overpopulation. At PawMart, we believe every pet
          deserves a second chance, a warm hug, and a family to call their own.
        </p>

        <button className="bg-amber-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-amber-300 transition duration-300 shadow-lg">
          Adopt Now 🐾
        </button>
      </div>
    </section>
  );
};

export default AdoptPawMart;
