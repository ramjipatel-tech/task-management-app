import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Landing.css';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <h1>TaskFlow</h1>
          </div>
          <div className="navbar-links">
            <a href="#features">Features</a>
            {isAuthenticated ? (
              <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
                Dashboard
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-title">Plan. Prioritize. Execute.</h2>
          <p className="hero-subtitle">
            The modern task management platform built for productivity.
            Organize your work, track progress, and achieve your goals with precision.
          </p>
          <div className="hero-cta">
            {isAuthenticated ? (
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </button>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn btn-outline btn-lg">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-card">
            <div className="card-header">📊 Task Overview</div>
            <div className="task-preview">
              <div className="task-item pending">Complete project documentation</div>
              <div className="task-item inprogress">Review design mockups</div>
              <div className="task-item completed">Deploy to production</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to stay on top of your tasks</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Smart Task Management</h3>
            <p>Create, organize, and manage tasks with custom priorities and due dates. Never lose track of what matters.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Secure Authentication</h3>
            <p>Enterprise-grade security with JWT tokens and bcrypt password hashing. Your data is always protected.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-Time Sync</h3>
            <p>Changes sync instantly across all your devices. Work seamlessly from anywhere.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Priority Levels</h3>
            <p>Set task priorities (Low, Medium, High) to focus on what's most important.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Advanced Analytics</h3>
            <p>Track your productivity with detailed statistics and insights about your tasks.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌙</div>
            <h3>Dark & Light Mode</h3>
            <p>Switch between themes for comfortable viewing at any time of day.</p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-stack">
        <div className="section-header">
          <h2>Built With Modern Technology</h2>
          <p>Production-ready full-stack architecture</p>
        </div>
        <div className="tech-grid">
          <div className="tech-item">
            <h4>Frontend</h4>
            <p>React.js, Vite, JavaScript, CSS3</p>
          </div>
          <div className="tech-item">
            <h4>Backend</h4>
            <p>Node.js, Express.js, REST APIs</p>
          </div>
          <div className="tech-item">
            <h4>Database</h4>
            <p>MySQL with optimized indexes</p>
          </div>
          <div className="tech-item">
            <h4>Security</h4>
            <p>JWT, bcrypt, CORS, Rate Limiting</p>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="developer-section">
        <div className="dev-card">
          <div className="dev-avatar">RP</div>
          <h3>Ramji Patel</h3>
          <p className="dev-title">Full-Stack Developer & Designer</p>
          <p className="dev-bio">
            Crafting premium digital products with a focus on performance, security, and user experience.
            This task management application showcases production-quality full-stack development.
          </p>
          <div className="dev-links">
            <a href="https://github.com/ramjipatel-tech" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/ramjipatel-tech" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://zyvionex.com" target="_blank" rel="noopener noreferrer">Portfolio</a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to boost your productivity?</h2>
        <p>Join now and start managing your tasks effectively</p>
        {isAuthenticated ? (
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </button>
        ) : (
          <Link to="/register" className="btn btn-primary btn-lg">
            Get Started Free
          </Link>
        )}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
