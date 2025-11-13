import React from 'react';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import FeaturedListings from '../FeaturedListings/FeaturedListings';
import AdoptPawMart from '../AdoptPawMart/AdoptPawMart';
import MetOurHero from '../MetOurHero/MetOurHero';



const Home = () => {
    return (
        <div>
           <Banner></Banner> 
           <Categories></Categories>
          <FeaturedListings></FeaturedListings>
          <AdoptPawMart></AdoptPawMart>
          <MetOurHero></MetOurHero>
        </div>
    );
};

export default Home;