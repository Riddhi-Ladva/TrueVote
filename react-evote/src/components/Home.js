import React from 'react';
import Navbar from './Navbar'; // Import Navbar component
import './Home.css'; // Import the CSS for Home

const Home = () => {
  return (
    <div className="home-container">
      <Navbar /> {/* Fixed Navbar at the top */}
      <div className="home-content">
        <section className="intro-section">
          <h2>Welcome to the E-Voting System</h2>
          <p>Your secure and transparent platform for online voting.</p>
          <a href="#get-started" className="hero-btn">Get Started</a>
        </section>

        <section className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature">
              <img src="/safevote.png" alt="Secure Voting" className="feature-image" />
              <h3>Secure Voting</h3>
              <p>Our system uses state-of-the-art encryption to protect your vote.</p>
            </div>
            <div className="feature">
              <img src="/tranparent_result.png" alt="Transparent Results" className="feature-image" />
              <h3>Transparent Results</h3>
              <p>Results are available in real-time and are fully verifiable.</p>
            </div>
            <div className="feature">
              <img src="/easyvote.png" alt="Easy Access" className="feature-image" />
              <h3>Easy Access</h3>
              <p>Vote from anywhere, at any time, with our user-friendly platform.</p>
            </div>
          </div>
        </section>

        <footer className="home-footer">
          <p>&copy; 2024 E-Voting System. All rights reserved.</p>
          <p><a href="#terms">Terms & Conditions</a> | <a href="#privacy">Privacy Policy</a></p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
