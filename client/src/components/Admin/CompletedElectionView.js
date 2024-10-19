import React, { useState } from 'react';
import './ElectionView.css';

const CompletedElectionView = () => {
  // Dummy data for completed election
  const [election] = useState({
    _id: '2',
    name: 'Completed General Election',
    description: 'The 2022 general election results.',
    status: 'completed',
    date: '2022-11-08',
  });

  return (
    <div className="election-view-container">
      <h2>Completed Election Details</h2>
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
    </div>
  );
};

export default CompletedElectionView;
