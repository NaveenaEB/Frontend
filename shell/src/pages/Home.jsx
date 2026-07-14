import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const featureCards = [
  {
    to: '/products',
    icon: '📦',
    label: 'Micro Frontend — Port 3001',
    title: 'Products',
    desc: 'Manage your product catalog. Add, edit, search, and track inventory with full status management.',
    gradient: 'linear-gradient(90deg, #3b82f6, #6366f1)',
    iconBg: 'rgba(59,130,246,.15)',
    iconBorder: 'rgba(59,130,246,.25)',
  },
  {
    to: '/users',
    icon: '👥',
    label: 'Micro Frontend — Port 3002',
    title: 'Users',
    desc: 'Manage team members and user accounts. Create, update roles, and control access permissions.',
    gradient: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
    iconBg: 'rgba(139,92,246,.15)',
    iconBorder: 'rgba(139,92,246,.25)',
  },
  {
    to: '/salary',
    icon: '💰',
    label: 'Micro Frontend — Port 3003',
    title: 'Salaries',
    desc: 'Track salary records, manage monthly payroll, and maintain comprehensive compensation history.',
    gradient: 'linear-gradient(90deg, #22c55e, #10b981)',
    iconBg: 'rgba(34,197,94,.15)',
    iconBorder: 'rgba(34,197,94,.25)',
  },
];

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-hero">
      <div className="home-hero-badge">
        ⚡ Webpack Module Federation
      </div>

      <h1 className="home-title">
        Enterprise Portal
      </h1>

      <p className="home-subtitle">
        Welcome back{user?.name ? `, ${user.name}` : ''}! Choose a module below to get started.
        Each section runs as an independent micro-frontend.
      </p>

      <div className="home-cards">
        {featureCards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="home-card"
            style={{ '--card-gradient': card.gradient, '--card-icon-bg': card.iconBg, '--card-icon-border': card.iconBorder }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div className="home-card-icon">{card.icon}</div>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-500)', fontWeight: 600, marginTop: 4 }}>→</span>
            </div>

            <div>
              <p className="home-card-label">{card.label}</p>
              <h3 className="home-card-title">{card.title}</h3>
              <p className="home-card-desc">{card.desc}</p>
            </div>

            <div className="home-card-arrow">
              <span className="arrow-btn">
                Open {card.title} <span>›</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Architecture info */}
      <div style={{
        marginTop: '3rem',
        padding: '1.25rem 1.5rem',
        background: 'rgba(59,130,246,.06)',
        border: '1px solid rgba(59,130,246,.15)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        fontSize: '0.8rem',
        color: 'var(--text-400)',
      }}>
        {[
          { label: 'Shell Host', port: '3000', color: '#3b82f6' },
          { label: 'Products Remote', port: '3001', color: '#6366f1' },
          { label: 'Users Remote', port: '3002', color: '#8b5cf6' },
          { label: 'Salary Remote', port: '3003', color: '#22c55e' },
        ].map((s) => (
          <div key={s.port} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
            <span style={{ fontWeight: 600, color: 'var(--text-200)' }}>{s.label}</span>
            <span style={{ color: s.color, fontWeight: 700 }}>:{s.port}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;