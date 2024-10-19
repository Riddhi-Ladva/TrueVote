import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ElectionForm.css';

const ElectionForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('scheduled');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newElection = {
      name,
      description,
      startDate,
      endDate,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const response = await fetch('http://localhost:5000/api/elections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newElection),
      });
      if (!response.ok) {
        throw new Error('Failed to add the new election');
      }
      navigate('/manage-elections'); // Redirect back to the manage elections page after successful submission
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="election-form-container">
      <h1>Add New Election</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Election Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="scheduled">Scheduled</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Add Election</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default ElectionForm;
