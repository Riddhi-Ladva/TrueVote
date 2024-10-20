import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('voter');
  const [profile, setProfile] = useState({ name: '', contactNumber: '', address: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const userData = {
      username,
      email,
      password,  // plain password (backend will hash it)
      role,
      profile: {
        name: profile.name,
        contactNumber: profile.contactNumber,
        address: profile.address
      }
    };

    try {
      
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          

        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store the token for future use (e.g., accessing protected routes)
      localStorage.setItem('token', data.token);
      console.log('User registered successfully:', data);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Register</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="voter">Voter</option>
              <option value="candidate">Candidate</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact Number:</label>
            <input
              type="text"
              value={profile.contactNumber}
              onChange={(e) => setProfile({ ...profile, contactNumber: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/form/login">Login here</Link>.
        </p>
      </div>
    </div>
  );
}

export default Register;
