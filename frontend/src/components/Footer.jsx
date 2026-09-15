import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>TaskFlow</h3>
            <p>Premium task management application designed and built by Ramji Patel.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/#features">Features</a></li>
              <li><a href="/">Home</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://github.com/ramjipatel-tech" target="_blank" rel="noopener noreferrer" title="GitHub">GitHub</a>
              <a href="https://linkedin.com/in/ramjipatel-tech" target="_blank" rel="noopener noreferrer" title="LinkedIn">LinkedIn</a>
              <a href="https://instagram.com/ramjipatel.tech" target="_blank" rel="noopener noreferrer" title="Instagram">Instagram</a>
              <a href="https://zyvionex.com" target="_blank" rel="noopener noreferrer" title="Website">Website</a>
            </div>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p>&copy; 2026 Ramji Patel. All Rights Reserved.</p>
          <p>Powered by Ramji Patel</p>
          <p className="tech-stack">Built with React • Node.js • Express.js • MySQL</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
