import React from 'react';
import furryFreind from '../../assets/furryFriend.jpg'
import adpoted from '../../assets/adpotNow.jpg'
import ownerPet from '../../assets/OwnerandPet.jpg'
const Banner = () => {
    return (
        <div className=' w-[1200px] mx-auto mt-22 '>
           <div className='flex gap-16'>
            
            <div className='ml-3 mt-2 mb-5'>
                <h2 className='ml-3 font-bold text-2xl mb-5' >Find Your Furry Friend Today!</h2>
                <img className='w-[350px] h-[300px] rounded-2xl'  src={furryFreind} alt="" />
            </div>
             <div className='mt-2 mb-5'>
            <h2 className='font-bold text-2xl mb-5 ml-7'>“Adopt, Don’t Shop <br /> Give a Pet a Home.”</h2>
            <img className='w-[350px] h-[300px] rounded-2xl' src={adpoted} alt="" />
           </div>
           <div className='mt-2 mb-5'>
            <h2 className='font-bold text-2xl mb-5'>Because Every Pet Deserves <br /> Love and Care.</h2>
            <img className='w-[350px] h-[300px] rounded-2xl' src={ownerPet} alt="" />

           </div>
           </div>
          
        </div>
    );
};

export default Banner;