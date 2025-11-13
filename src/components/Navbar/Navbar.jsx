import React, { useEffect, useState, useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';
import logo from '../../assets/7a1c0287-194d-49f0-bf94-2fab8ac65b41.png';
import { AuthContext } from '../../contexts/AuthContext';
import userIcon from "../../assets/user.png";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  // Dark mode state
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('pawmart-theme');
    return saved === 'dark';
  });

  useEffect(() => {
    const root = document.body;
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
      .then(() => console.log("Signed out"))
      .catch(err => console.error(err));
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-semibold text-[var(--btn-bg)]" : "font-semibold"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/petAndSupplies"
          className={({ isActive }) =>
            isActive ? "font-semibold text-[var(--btn-bg)]" : "font-semibold"
          }
        >
          Pet & Supplies
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/addListings"
              className={({ isActive }) =>
                isActive ? "font-semibold text-[var(--btn-bg)]" : "font-semibold"
              }
            >
              Add Listings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myListings"
              className={({ isActive }) =>
                isActive ? "font-semibold text-[var(--btn-bg)]" : "font-semibold"
              }
            >
              My Listings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myOrders"
              className={({ isActive }) =>
                isActive ? "font-semibold text-[var(--btn-bg)]" : "font-semibold"
              }
            >
              My Orders
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div
      className="navbar bg-[var(--bg-color)] text-[var(--text-color)] shadow-md px-4 sticky top-0 z-50 transition-colors duration-300"
    >
      {/* Left Section - Logo */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden border-none">
            <FaBars size={20} />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-3 shadow rounded-box w-52 z-50 bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex gap-2 items-center">
          <img className="w-10 h-10 rounded-lg" src={logo} alt="PawMart logo" />
          <span className="text-2xl font-bold">
            <span className="text-sky-400">Paw</span>
            <span className="text-amber-400">Mart</span>
          </span>
        </Link>
      </div>

      {/* Middle Section - Menu (hidden on small screens) */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 flex items-center gap-3">
          {links}
        </ul>
      </div>

      {/* Right Section - Theme & User */}
      <div className="navbar-end flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-sm rounded-full hover:opacity-80 transition"
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? (
            <FaSun className="text-yellow-400" size={18} />
          ) : (
            <FaMoon className="text-sky-400" size={18} />
          )}
        </button>

        {/* Auth Section */}
        {user ? (
          <div className="flex items-center gap-2">
            <img
              src={user.photoURL || userIcon}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-sky-400"
            />
            <button
              onClick={handleSignOut}
              className="btn-custom bg-red-400 hover:bg-red-500"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link className="btn-custom bg-[var(--btn-bg)] hover:opacity-90" to="/login">
              Login
            </Link>
            <span className="font-semibold hidden sm:inline">OR</span>
            <Link className="btn-custom bg-amber-400 hover:opacity-90" to="/register">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
