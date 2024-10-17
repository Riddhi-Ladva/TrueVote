// src/components/VotePage.js
import React, { useState } from 'react';
import './VotePage.css';

const VotePage = ({ electionName }) => {
  const [selectedCandidate, setSelectedCandidate] = useState('');

  const handleVote = () => {
    if (selectedCandidate) {
      alert(`You voted for ${selectedCandidate} in the ${electionName}`);
    } else {
      alert('Please select a candidate before voting.');
    }
  };

  return (
    <div className="vote-page-container">
      <header className="vote-page-header">
        <h1>Vote for {electionName}</h1>
      </header>

      <section className="candidate-selection">
        <h2>Select a Candidate</h2>
        <label>
          <input
            type="radio"
            name="candidate"
            value="Candidate A"
            onChange={() => setSelectedCandidate('Candidate A')}
          />
          Candidate A
        </label>
        <label>
          <input
            type="radio"
            name="candidate"
            value="Candidate B"
            onChange={() => setSelectedCandidate('Candidate B')}
          />
          Candidate B
        </label>
        <label>
          <input
            type="radio"
            name="candidate"
            value="Candidate C"
            onChange={() => setSelectedCandidate('Candidate C')}
          />
          Candidate C
        </label>
      </section>

      <button className="vote-button" onClick={handleVote}>
        Cast Vote
      </button>
    </div>
  );
};

export default VotePage;
