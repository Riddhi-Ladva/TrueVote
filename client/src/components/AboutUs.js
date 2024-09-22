import React from 'react';
import './AboutUs.css';

const teamMembers = [
  {
    name: 'Alice Johnson',
    position: 'CEO & Founder',
    bio: 'Alice is the visionary behind our e-voting system, with over 20 years of experience in technology and governance.',
    img: '/images/alice-johnson.jpg'
  },
  {
    name: 'Bob Smith',
    position: 'CTO',
    bio: 'Bob oversees the technical development of our platform, ensuring it meets the highest standards of security and performance.',
    img: '/images/bob-smith.jpg'
  },
  {
    name: 'Charlie Brown',
    position: 'Lead Developer',
    bio: 'Charlie leads the development team, bringing innovative solutions and ensuring a smooth user experience.',
    img: '/images/charlie-brown.jpg'
  }
];

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <br/><h1>About Us</h1>
        <p>Learn more about our mission, the team behind the e-voting system, and how we're making elections more accessible and secure.</p>
      </header>

      <section className="about-us-background">
        <h2>Our Mission</h2>
        <p>Our mission is to provide a secure, transparent, and accessible voting system that empowers individuals to participate in elections from anywhere in the world. We are committed to advancing democratic processes through technology and innovation.</p>
      </section>

      <section className="about-us-team">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-member" key={index}>
              <img src={member.img} alt={member.name} className="team-member-img" />
              <h3>{member.name}</h3>
              <p className="team-member-position">{member.position}</p>
              <p className="team-member-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-us-contact">
        <h2>Contact Us</h2>
        <p>If you have any questions or need support, please get in touch with us.</p>
        <p>Email: <a href="mailto:support@evoting.com">support@evoting.com</a></p>
        <p>Phone: +1 234 567 890</p>
        <p>Address: 123 Election Lane, Democracy City, DC 12345</p>
      </section>
    </div>
  );
};

export default AboutUs;
