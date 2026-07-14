import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Navbar() {
  const { logout, user } = useAuth();

  // Derive user initials for the avatar
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-badge">🚀</span>
        <h1>Enterprise Portal</h1>
      </div>

      <nav className="top-actions">
        <NavLink to="/" end className="btn btn-light">🏠 Home</NavLink>
        <NavLink to="/products" className="btn btn-light">📦 Products</NavLink>
        <NavLink to="/salary" className="btn btn-light">💰 Salaries</NavLink>
        <NavLink to="/users" className="btn btn-light">👥 Users</NavLink>

        {user && (
          <div className="user-info">
            <div className="user-avatar">{initials}</div>
            <span>{user.name || user.email || 'User'}</span>
          </div>
        )}

        <button className="btn btn-delete" onClick={logout} style={{ marginLeft: '0.25rem' }}>
          ⏻ Logout
        </button>
      </nav>
    </header>
  );
}