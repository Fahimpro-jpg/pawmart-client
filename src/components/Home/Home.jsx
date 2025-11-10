import React from 'react';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import FeaturedListings from '../FeaturedListings/FeaturedListings';



const Home = () => {
    return (
        <div>
           <Banner></Banner> 
           <Categories></Categories>
          <FeaturedListings></FeaturedListings>
        </div>
    );
};

export default Home;