import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <span className="auth-logo-icon">🚀</span>
          <h1>Enterprise Portal</h1>
        </div>

        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Sign in to your account to continue</p>

        <form onSubmit={handleSubmit} className="auth-form" id="login-form">
          <div className="input-group">
            <label className="input-label" htmlFor="login-email">Email address</label>
            <div className="input-icon-wrap">
              <span className="icon">✉️</span>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="login-password">Password</label>
            <div className="input-icon-wrap">
              <span className="icon">🔒</span>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button
            id="login-submit"
            className="btn"
            type="submit"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginTop: '0.25rem' }}
          >
            {loading ? '⏳ Signing in…' : '→ Sign In'}
          </button>
        </form>

        <div className="auth-link-row">
          Don't have an account?{' '}
          <Link to="/register" style={{ fontWeight: 600 }}>Create one</Link>
        </div>
      </div>
    </div>
  );
}