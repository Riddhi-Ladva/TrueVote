import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <br/><h1>Admin Dashboard</h1>
        <p>Manage the e-voting system, oversee users, and generate reports.</p>
      </header>

      <div className="admin-dashboard-content">
        <section className="admin-tools">
          <h2>Admin Tools</h2>
          <div className="admin-tools-grid">
            <div className="admin-tool">
              <h3>Election Management</h3>
              <p>Set up and manage upcoming elections, including candidate registration and voting periods.</p>
              <button className="admin-button">Manage Elections</button>
            </div>
            <div className="admin-tool">
              <h3>Results Overview</h3>
              <p>View and analyze the results of past elections.</p>
              <button className="admin-button">View Results</button>
            </div>
            <div className="admin-tool">
              <h3>User Issues</h3>
              <p>Address user queries and issues related to the e-voting system.</p>
              <button className="admin-button">Handle Issues</button>
            </div>
            <div className="admin-tool">
              <h3>Report Generation</h3>
              <p>Generate detailed reports for analysis and record-keeping.</p>
              <button className="admin-button">Generate Reports</button>
            </div>
          </div>
        </section>

        <section className="user-management">
          <h2>User Management</h2>
          <p>Oversee registered voters and manage user roles and permissions.</p>
          <button className="admin-button">Manage Users</button>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
