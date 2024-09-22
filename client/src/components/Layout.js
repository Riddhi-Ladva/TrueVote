// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Header component
import './Layout.css'; // Make sure to include styling

const Layout = () => {
  return (
    <div className="layout">
      <Navbar /> {/* Include the Header component */}
      <main className="main-content">
        <Outlet /> {/* Renders the matched child route */}
      </main>
      <footer className="footer">
        <p>&copy; 2024 My Application</p>
      </footer>
    </div>
  );
};

export default Layout;
