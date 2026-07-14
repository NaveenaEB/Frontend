import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: '🏠', end: true },
  { to: '/products', label: 'Products', icon: '📦' },
  { to: '/users', label: 'Users', icon: '👥' },
  { to: '/salary', label: 'Salaries', icon: '💰' },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <p className="sidebar-label">Navigation</p>
      <ul>
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 'auto', padding: '0.75rem', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-500)', textAlign: 'center' }}>
          <div style={{ marginBottom: '0.2rem', fontWeight: '600', color: 'var(--brand-400)' }}>
            Micro Frontend
          </div>
          <div>Webpack Module Federation</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;