import React from 'react';
import './Navbar.css';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>TaskFlow</h1>
        </div>
        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle theme"
            aria-label="Toggle dark mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <div className="user-menu">
            <button
              className="user-button"
              onClick={() => setShowMenu(!showMenu)}
              title={user?.name}
            >
              <span className="user-avatar">{user?.name?.charAt(0)?.toUpperCase()}</span>
            </button>
            {showMenu && (
              <div className="menu-dropdown">
                <div className="menu-header">
                  <p>{user?.name}</p>
                  <small>{user?.email}</small>
                </div>
                <hr />
                <button onClick={() => navigate('/dashboard/profile')} className="menu-item">
                  Profile
                </button>
                <button onClick={handleLogout} className="menu-item danger">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
