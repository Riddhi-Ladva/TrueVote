
import { Link,useNavigate} from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <br /><h1>Admin Dashboard</h1>
        <p>Manage the e-voting system, oversee users, and generate reports.</p>
      </header>

      <div className="admin-dashboard-content">
        <section className="admin-tools">
          <h2>Admin Tools</h2>
          <div className="admin-tools-grid">
            <div className="admin-tool">
              <h3>Election Management</h3>
              <p>Set up and manage upcoming elections, including candidate registration and voting periods.</p>
              <Link to="/manage-elections">
                <button className="admin-button">Manage Elections</button>
              </Link>
            </div>
            <div className="admin-tool">
              <h3>Results Overview</h3>
              <p>View and analyze the results of past elections.</p>
              <button className="admin-button">View Results</button>
            </div>
            <div className="admin-tool">
              <h3>User Management</h3>
              <p>Oversee registered voters and manage user roles and permissions.</p>
              <button className="admin-button" onClick={() => navigate('/manage-users')}>
                Manage Users
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
