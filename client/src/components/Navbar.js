import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS for Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/evote_logo.png" alt="E-Vote" className="logo" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/form/login">Login</Link></li>
        <li><Link to="/Result">Results</Link></li>
        <li><Link to="/TermsConditions">Terms & Conditions</Link></li>
        <li><Link to="/ElectionInfo">Elections</Link></li>
        <li><Link to="/MediaPage">Media</Link></li>




        <li><a href="/AboutUs">About Us</a></li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
