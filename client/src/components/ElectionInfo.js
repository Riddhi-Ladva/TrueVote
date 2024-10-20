// src/components/ElectionInfo.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ElectionInfo.css';

const ElectionInfo = () => {
  const [elections, setElections] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/elections'); // Update with your endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch elections');
        }

        const data = await response.json();
        setElections(data.elections); // Store all elections
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchElections();
  }, []);

  // Filter ongoing and upcoming elections
  const ongoingElections = elections.filter(election => election.status === 'ongoing');
  const upcomingElections = elections.filter(election => new Date(election.startDate) > new Date());

  return (
    <div className="election-info-container">
      <header className="election-info-header">
        <h1>Election Information</h1>
        <p>Stay informed about the latest elections, deadlines, and procedures.</p>
      </header>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <section className="election-calendar">
        <h2>Ongoing Elections</h2>
        <div className="calendar-table">
          <div className="calendar-row header">
            <div className="calendar-cell">Election Name</div>
            <div className="calendar-cell">Voting Period</div>
            <div className="calendar-cell">Action</div>
          </div>

          {ongoingElections.length === 0 ? (
            <div className="calendar-row">
              <div className="calendar-cell" colSpan="3">No ongoing elections</div>
            </div>
          ) : (
            ongoingElections.map((election) => (
              <div className="calendar-row" key={election._id}>
                <div className="calendar-cell">{election.name}</div>
                <div className="calendar-cell">{new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}</div>
                <div className="calendar-cell">
                  <Link to={`/vote/${election._id}`}>
                    <button className="vote-button">Vote</button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="election-calendar">
        <h2>Upcoming Elections</h2>
        <div className="calendar-table">
          <div className="calendar-row header">
            <div className="calendar-cell">Election Name</div>
            <div className="calendar-cell">Voting Period</div>
         
          </div>

          {upcomingElections.length === 0 ? (
            <div className="calendar-row">
              <div className="calendar-cell" colSpan="3">No upcoming elections</div>
            </div>
          ) : (
            upcomingElections.map((election) => (
              <div className="calendar-row" key={election._id}>
                <div className="calendar-cell">{election.name}</div>
                <div className="calendar-cell">{new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}</div>
               
              </div>
            ))
          )}
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
