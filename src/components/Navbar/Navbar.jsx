import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { FaMoon, FaSun } from 'react-icons/fa';
import logo from '../../assets/7a1c0287-194d-49f0-bf94-2fab8ac65b41.png';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  // Dark mode state
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('pawmart-theme');
    return saved === 'dark';
  });

  useEffect(() => {
    const root = document.body; // Apply dark-mode class to body
    if (isDark) {
      root.classList.add('dark-mode');
      localStorage.setItem('pawmart-theme', 'dark');
    } else {
      root.classList.remove('dark-mode');
      localStorage.setItem('pawmart-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        // Optional: toast success
      })
      .catch(() => {
        // Optional: handle error
      });
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/petAndSupplies">Pet & Supplies</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/addListings">Add Listings</NavLink></li>
          <li><NavLink to="/myListings">My Listings</NavLink></li>
          <li><NavLink to="/myOrders">My Orders</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div
      className="navbar shadow-sm"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex="-1" className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
              style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
          >
            {links}
          </ul>
        </div>

        <div className="flex gap-4 items-center">
          <img className="w-[30px] h-[30px] rounded-xl" src={logo} alt="PawMart logo" />
          <p className="text-2xl font-bold">
            <span className="text-sky-400">Paw</span>
            <span className="text-amber-400">Mart</span>
          </p>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="btn btn-ghost btn-sm rounded-full p-2 hover:opacity-80 transition"
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
        </button>

        {/* Auth buttons */}
        {user ? (
          <button onClick={handleSignOut} className="btn btn-custom">
            Sign Out
          </button>
        ) : (
          <>
            <Link className="btn btn-custom" to="/login">Login</Link>
            <p className="mx-2 text-2xl font-bold">OR</p>
            <Link className="btn btn-custom" to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
