import React, { useEffect, useState } from 'react';
import './ProfileCard.css'; // Import CSS for styling

const ProfileCard = () => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Function to fetch user profile
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage
        const response = await fetch('http://localhost:5000/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Attach the token for authorization
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUserData(data.user || data); // Assuming data.user is the profile object
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchUserProfile(); // Fetch user profile when the component mounts
  }, []);

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>; // Show error message if there's an error
  }

  if (!userData) {
    return <div>Loading...</div>; // Show a loading state while the data is being fetched
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
            <button className="action-btn">Edit Profile</button>
            <button className="action-btn">View Voting History</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
