import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileCard.css'; // Import CSS for styling

const ProfileCard = () => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [votingHistory, setVotingHistory] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUserData(data.user || data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const fetchVotingHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/voting-history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch voting history');
      }

      const data = await response.json();
      setVotingHistory(data.history); // Assuming data.history is an array of election objects
      setShowModal(true); // Show modal after fetching history
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const closeModal = () => setShowModal(false); // Function to close the modal

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img src="/profile.png" alt="Profile Avatar" className="profile-avatar" />
          <h2 className="profile-name">{userData.profile?.name || 'N/A'}</h2>
          <p className="profile-id">Voter ID: {userData._id}</p>
        </div>

        <div className="profile-details">
          <div className="profile-section">
            <h3>Personal Information</h3>
            <p><strong>Email:</strong> {userData.email || 'N/A'}</p>
            <p><strong>Address:</strong> {userData.profile?.address || 'N/A'}</p>
            <p><strong>Contact Number:</strong> {userData.profile?.contactNumber || 'N/A'}</p>
          </div>

          <div className="profile-section">
            <h3>Voting Status</h3>
            <p><strong>Last Election:</strong> {userData.lastElection || 'N/A'}</p>
            <p><strong>Status:</strong> {userData.votingStatus || 'Not Voted'}</p>
          </div>

          <div className="profile-actions">
            <button className="action-btn" onClick={() => navigate('/update-profile')}>Update Profile</button>
            <button className="action-btn" onClick={fetchVotingHistory}>View Voting History</button>
          </div>
        </div>
      </div>

      {/* Modal for Voting History */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Voting History</h2>
            {votingHistory.length > 0 ? (
              <ul>
                {votingHistory.map((election, index) => (
                  <li key={index}>
                    <p><strong>Election Name:</strong> {election.electionName}</p>
                    <p><strong>Election Date:</strong> {new Date(election.date).toLocaleDateString()}</p>
                    <p><strong>Candidate Voted For:</strong> {election.candidate}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No voting history available.</p>
            )}
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
