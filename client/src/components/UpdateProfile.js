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
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const navigate = useNavigate();
  useEffect(() => {
    console.log("In useeffect");
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('No token found, please log in again.');
        setIsLoading(false);
        return; // Exit if there's no token
      }
  
      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("Devs");
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        
        const data = await response.json();

        console.log(data);
        setFormData({
          username: data.user.username || '',
          email: data.user.email || '',
          role: data.user.role || '',
          profile: {
            address: data.user.profile?.address || '',
            contactNumber: data.user.profile?.contactNumber || ''
          }
        });
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchUserProfile();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'address' || name === 'contactNumber') {
      setFormData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          [name]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/profile', {
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

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

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
