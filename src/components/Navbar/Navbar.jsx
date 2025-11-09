import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/7a1c0287-194d-49f0-bf94-2fab8ac65b41.png'
const Navbar = () => {
   const links = <>
    <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/petAndSupplies">Pet & Supplies</NavLink></li>
      <li><NavLink to="/addListings">Add Listings</NavLink></li>
      <li><NavLink to="/myListings">My Listings</NavLink></li>
      <li><NavLink to="/myOrders">My Orders</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <div className='flex gap-4'>
        <img className='w-[30px] h-[30px] rounded-xl ' src={logo} alt="" />
        <p className="text-2xl font-bold"><span className='text-sky-400'>Paw</span><span className='text-amber-400'>Mart</span></p>
    </div>
    
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
      <Link className='btn border-sky-200 bg-sky-400' to='/login'>Login</Link>
      <p className='ml-2 mr-2 text-2xl text-blue-900 font-bold'>OR</p>
      <Link className='btn' to='/register'>Register</Link>
  </div>
</div>
    );
};

export default Navbar;