import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateProfile.css'; // Create a CSS file for form styling

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    profile: {
      address: '',
      contactNumber: ''
    }
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current user data to populate the form
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
        setFormData({
          username: data.username,
          email: data.email,
          role: data.role,
          profile: {
            address: data.profile?.address || '',
            contactNumber: data.profile?.contactNumber || ''
          }
        });
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'address' || name === 'contactNumber') {
      setFormData({
        ...formData,
        profile: {
          ...formData.profile,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      navigate('/profile'); // Redirect to profile page after successful update
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="update-profile-container">
      <h1>Update Profile</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Role:
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </label>

        <h3>Profile Information</h3>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.profile.address}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Contact Number:
          <input
            type="text"
            name="contactNumber"
            value={formData.profile.contactNumber}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
