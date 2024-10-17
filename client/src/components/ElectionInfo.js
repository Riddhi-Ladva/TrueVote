// src/components/ElectionInfo.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ElectionInfo.css';

const ElectionInfo = () => {
  return (
    <div className="election-info-container">
      <header className="election-info-header">
        <h1>Election Information</h1>
        <p>Stay informed about the latest elections, deadlines, and procedures.</p>
      </header>

      <section className="election-calendar">
        <h2>Election Calendar</h2>
        <div className="calendar-table">
          <div className="calendar-row header">
            <div className="calendar-cell">Election Name</div>
            <div className="calendar-cell">Date</div>
            <div className="calendar-cell">Registration Deadline</div>
            <div className="calendar-cell">Voting Period</div>
            <div className="calendar-cell">Action</div>
          </div>

          <div className="calendar-row">
            <div className="calendar-cell">General Election</div>
            <div className="calendar-cell">Nov 5, 2024</div>
            <div className="calendar-cell">Oct 1, 2024</div>
            <div className="calendar-cell">Nov 1-5, 2024</div>
            <div className="calendar-cell">
              <Link to="/vote/general-election">
                <button className="vote-button">Vote</button>
              </Link>
            </div>
          </div>

          <div className="calendar-row">
            <div className="calendar-cell">Local Elections</div>
            <div className="calendar-cell">Mar 12, 2025</div>
            <div className="calendar-cell">Feb 10, 2025</div>
            <div className="calendar-cell">Mar 8-12, 2025</div>
            <div className="calendar-cell">
              <Link to="/vote/local-election">
                <button className="vote-button">Vote</button>
              </Link>
            </div>
          </div>

          {/* Add more election rows as needed */}
        </div>
      </section>

      <section className="voting-guidelines">
        <h2>Voting Guidelines</h2>
        <p>Ensure your vote counts by following these guidelines:</p>
        <ul>
          <li>Register before the deadline.</li>
          <li>Ensure your information is accurate and up-to-date.</li>
          <li>Follow the instructions on the voting platform carefully.</li>
          <li>Contact support if you encounter any issues during voting.</li>
        </ul>
      </section>

      <footer className="election-info-footer">
        <p>&copy; 2024 E-Voting System. All rights reserved.</p>
        <p><a href="/contact">Contact Us</a> for more information.</p>
      </footer>
    </div>
  );
};

export default ElectionInfo;
