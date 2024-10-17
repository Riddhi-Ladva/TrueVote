// src/components/ManageElections.js
import React from 'react';
import './ManageElections.css';

const ManageElections = () => {
  return (
    <div className="manage-elections-container">
      <header className="manage-elections-header">
        <h1>Manage Elections</h1>
        <p>Add, update, or delete election events.</p>
      </header>

      <div className="manage-elections-buttons">
        <button className="manage-button">Add New Election</button>
        <button className="manage-button">Update Election</button>
        <button className="manage-button">Delete Election</button>
      </div>
    </div>
  );
};

export default ManageElections;
