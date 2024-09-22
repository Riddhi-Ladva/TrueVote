import React from 'react';
import './TermsConditions.css';

const TermsConditions = () => {
  return (
    <div className="terms-conditions-container">
      <header className="terms-conditions-header">
       <br/><h1>Terms & Conditions</h1>
        <p>Please read these terms and conditions carefully before using our e-voting system.</p>
      </header>

      <section className="terms-conditions-content">
        <div className="terms-section">
          <h2>Terms of Service</h2>
          <p>Welcome to our e-voting system. By using our platform, you agree to comply with and be bound by the following terms and conditions. If you do not agree with these terms, please do not use our service.</p>
          <ul>
            <li>You must be at least 18 years old to use our system.</li>
            <li>All votes must be cast in accordance with the rules and regulations of the election.</li>
            <li>We reserve the right to modify or terminate the service at any time without prior notice.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>Privacy Policy</h2>
          <p>We value your privacy. This policy outlines how we collect, use, and protect your personal information.</p>
          <ul>
            <li>We collect personal information necessary for voter verification.</li>
            <li>All data is stored securely and used solely for the purpose of conducting elections.</li>
            <li>Your personal information will not be shared with third parties without your consent.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>User Agreement</h2>
          <p>By using our platform, you agree to the following:</p>
          <ul>
            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
            <li>You agree not to misuse the system for fraudulent purposes.</li>
            <li>We are not liable for any damages arising from the use of the system.</li>
          </ul>
        </div>
      </section>
      
      <footer className="terms-conditions-footer">
        <p>&copy; 2024 E-Voting System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TermsConditions;
