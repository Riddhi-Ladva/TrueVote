import React, { useState } from 'react';
import './ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'Voter' },
    { _id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
    { _id: '3', name: 'Alice Johnson', email: 'alice@example.com', role: 'Voter' },
    { _id: '4', name: 'Bob Brown', email: 'bob@example.com', role: 'Candidate' },
  ]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = (userId) => {
    try {
      // Simulate deletion for the dummy data
      setUsers(users.filter((user) => user._id !== userId));
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to delete user.');
    }
  };

  return (
    <div className="manage-users-container">
      <header className="manage-users-header">
        <h1>Manage Users</h1>
        <p>View and manage registered users in the e-voting system.</p>
      </header>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4">No users available.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
