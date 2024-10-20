import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageElections.css';

const ManageElections = () => {
  const [elections, setElections] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/elections');
        if (!response.ok) {
          throw new Error('Failed to fetch elections');
        }
        const data = await response.json();
        setElections(data.elections);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchElections();
  }, []);

  const upcomingElections = elections.filter(election => election.status === 'scheduled');
  const ongoingElections = elections.filter(election => election.status === 'ongoing');
  const completedElections = elections.filter(election => election.status === 'completed');

  const handleDelete = async (electionId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/elections/${electionId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete election');
      }
      setElections(elections.filter(election => election._id !== electionId));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="manage-elections-container">
      <header className="manage-elections-header">
        <h1>Manage Elections</h1>
        <p>Add, update, or delete election events.</p>
      </header>

      {/* Section for Adding New Election */}
      <div className="manage-elections-buttons">
        <button className="manage-button" onClick={() => navigate('/add-election')}>
          Add New Election
        </button>
      </div>

      {/* Display Upcoming Elections (can be modified or deleted) */}
      <section>
        <h2>Upcoming Elections</h2>
        {upcomingElections.length === 0 && <p>No upcoming elections available.</p>}
        {upcomingElections.map(election => (
          <div key={election._id} className="election-item">
            <h3>{election.name}</h3>
            <p>{election.description}</p>
            <button className="manage-button" onClick={() => handleDelete(election._id)}>Delete</button>
            <button className="manage-button">Edit</button>
          </div>
        ))}
      </section>

      {/* Display Ongoing Elections (can view) */}
      <section>
        <h2>Ongoing Elections</h2>
        {ongoingElections.length === 0 && <p>No ongoing elections available.</p>}
        {ongoingElections.map(election => (
          <div key={election._id} className="election-item">
            <h3>{election.name}</h3>
            <p>{election.description}</p>
            <button className="manage-button" onClick={() => navigate(`/ongoingelectionview/${election._id}`)}>View</button>
          </div>
        ))}
      </section>

      {/* Display Completed Elections (can view) */}
      <section>
        <h2>Completed Elections</h2>
        {completedElections.length === 0 && <p>No completed elections available.</p>}
        {completedElections.map(election => (
          <div key={election._id} className="election-item">
            <h3>{election.name}</h3>
            <p>{election.description}</p>
            <button className="manage-button" onClick={() => navigate(`/completedelectionview/${election._id}`)}>View</button>
          </div>
        ))}
      </section>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default ManageElections;
