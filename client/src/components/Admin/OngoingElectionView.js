import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ElectionView.css';

const OngoingElectionView = () => {
  const navigate = useNavigate();

  // Dummy data for ongoing election
  const [election, setElection] = useState({
    _id: '1',
    name: 'Ongoing Presidential Election',
    description: 'The 2024 presidential election.',
    status: 'ongoing',
    date: '2024-11-05',
  });

  const handleDelete = () => {
    // Perform delete logic here
    console.log('Delete election', election._id);
    // Redirect after delete
    navigate('/manage-elections');
  };

  const handleUpdate = () => {
    // Navigate to update page or open update modal
    navigate(`/edit-election/${election._id}`);
  };

  return (
    <div className="election-view-container">
      <h2>Ongoing Election Details</h2>
      <table className="election-details-table">
        <tbody>
          <tr>
            <td>Election Name</td>
            <td>{election.name}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{election.description}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{election.status}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>{election.date}</td>
          </tr>
        </tbody>
      </table>

      <div className="action-buttons">
        <button className="manage-button" onClick={handleUpdate}>
          Update
        </button>
        <button className="manage-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default OngoingElectionView;
