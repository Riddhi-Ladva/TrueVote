// src/components/ManageUsers.js
import React, { useState, useEffect } from 'react';
import './ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/admin/users/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
          },
        
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }   
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      console.log(userId);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
      

      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Remove the user from the state after successful deletion
      setUsers(users.filter((user) => user._id !== userId));
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="manage-users-container">
      <header className="manage-users-header">
        <h1>Manage Users</h1>
       
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
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(String(user._id))}
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
