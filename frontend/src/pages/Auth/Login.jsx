import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';
import Footer from '../../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (email && !email.includes('@')) newErrors.email = 'Invalid email';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrors({ submit: result.message });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-section">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your TaskFlow account</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error || errors.submit ? (
              <div className="error-message">
                <span>⚠️</span> {error || errors.submit}
              </div>
            ) : null}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="your@email.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                placeholder="Enter your password"
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register">Create one</Link>
            </p>
          </div>
        </div>

        <div className="auth-visual">
          <div className="visual-content">
            <div className="visual-icon">🚀</div>
            <h2>Organize Your Work</h2>
            <p>Manage tasks efficiently and boost your productivity with TaskFlow</p>
            <div className="visual-features">
              <div className="feature">✓ Easy Task Management</div>
              <div className="feature">✓ Priority Tracking</div>
              <div className="feature">✓ Secure & Encrypted</div>
              <div className="feature">✓ Real-time Updates</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
