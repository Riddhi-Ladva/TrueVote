import React from 'react';
import './ProfileCard.css'; // Import CSS for styling

const ProfileCard = () => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img src="/profile.png" alt="Profile Avatar" className="profile-avatar" />
          <h2 className="profile-name">John Doe</h2>
          <p className="profile-id">Voter ID: 123456789</p>
        </div>
        
        <div className="profile-details">
          <div className="profile-section">
            <h3>Personal Information</h3>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Address:</strong> 123 Main Street, Anytown, USA</p>
          </div>

          <div className="profile-section">
            <h3>Voting Status</h3>
            <p><strong>Last Election:</strong> 2024 Presidential Election</p>
            <p><strong>Status:</strong> Voted</p>
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
