import React, { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', is_active: true });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/users', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.message || 'Registration failed');
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

        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">Join Enterprise Portal to manage your business</p>

        <form onSubmit={handleSubmit} className="auth-form" id="register-form">
          <div className="input-group">
            <label className="input-label" htmlFor="reg-name">Full Name</label>
            <div className="input-icon-wrap">
              <span className="icon">👤</span>
              <input
                id="reg-name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="reg-email">Email address</label>
            <div className="input-icon-wrap">
              <span className="icon">✉️</span>
              <input
                id="reg-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="reg-password">Password</label>
            <div className="input-icon-wrap">
              <span className="icon">🔒</span>
              <input
                id="reg-password"
                name="password"
                type="password"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                minLength={6}
              />
            </div>
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button
            id="register-submit"
            className="btn"
            type="submit"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginTop: '0.25rem' }}
          >
            {loading ? '⏳ Creating account…' : '→ Create Account'}
          </button>
        </form>

        <div className="auth-link-row">
          Already have an account?{' '}
          <Link to="/login" style={{ fontWeight: 600 }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}