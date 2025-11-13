import React from 'react';
import expert1 from "../../assets/kadyn-pierce-4ugDavjID30-unsplash.jpg";
import expert2 from "../../assets/susanna-marsiglia-2Sk59DvnWCo-unsplash.jpg";
import expert3 from "../../assets/oo-verthing-vMsELAIN4gs-unsplash.jpg";

const MetOurHero = () => {
  return (
    <section className="mt-20 py-16 bg-gradient-to-b from-white to-gray-100 dark:from-slate-800 dark:to-slate-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-slate-800 dark:text-slate-100">
          Meet Our <span className="text-amber-500">Pet Heroes</span>
        </h2>

        {/* Hero cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden transform hover:-translate-y-2">
            <img
              src={expert1}
              alt="Pet Hero 1"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                Sarah Johnson
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                Sarah has rescued over 15 dogs and helped them find loving homes.
                Her compassion inspires our community every day.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden transform hover:-translate-y-2">
            <img
              src={expert2}
              alt="Pet Hero 2"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                Susana Margisila
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                A lifelong cat lover who fosters injured kittens until they’re ready
                to be adopted. His care makes a world of difference.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden transform hover:-translate-y-2">
            <img
              src={expert3}
              alt="Pet Hero 3"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                Emma Rodriguez
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                Emma runs a local animal shelter that has saved hundreds of pets.
                Her dedication reminds us why adoption matters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetOurHero;
