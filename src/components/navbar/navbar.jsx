import React, { useContext, useState, useEffect } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/storeContext'
import HideNavbar from '../hideNavbar/hideNavbar'

const Navbar = ({ setShowLogin, isLoggedIn, setIsLoggedIn }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalcartAmount } = useContext(StoreContext);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    alert("Logged out successfully!");
  };

  return (
    <div className='navbar d-flex justify-content-between align-items-center'>
      <Link to={'/'}><img src={assets.logo} style={{ height: "70px" }} /></Link>

      <ul className="navbar-menu d-none d-lg-flex gap-4 ">
        <Link to={'/'} onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact us</a>
      </ul>

      <div className='navbar-right d-flex align-items-center gap-2 gap-lg-4'>
        <div className="navbar-search-section">
          <Link to={'/cart'}><img src={assets.basket_icon} /></Link>
          <div className={getTotalcartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}

        <div className="hide-navbar d-block d-lg-none mt-3 ">
          <HideNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
