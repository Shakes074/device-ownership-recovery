import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { roleConfigs } from '../users/config.js';

const RoleLayout = ({ roleKey, children }) => {
  const role = roleConfigs[roleKey];
  const location = useLocation();

  if (!role) {
    return (
      <section className="role-page">
        <header className="role-page__header">
          <h1>Role not found</h1>
          <p>The requested user portal could not be located.</p>
        </header>
        <Link className="role-nav__link" to="/">
          Return to home
        </Link>
      </section>
    );
  }

  return (
    <div className={`role-shell role-shell--${role.accent ?? 'default'}`}>
      <header className="role-shell__header">
        <div className="role-shell__meta">
          <Link className="role-shell__back" to="/">
            ← Back to main home
          </Link>
          <h1>{role.portalName}</h1>
          <p>{role.summary}</p>
        </div>
        <nav className="role-nav" aria-label="Role navigation">
          {Object.values(roleConfigs).map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className={`role-nav__link${
                location.pathname === item.path ? ' role-nav__link--active' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="role-shell__content">
        <section className="role-page">
          <header className="role-page__header">
            <h2>Core Functions</h2>
            <p>Key workflows this role manages throughout the recovery lifecycle.</p>
          </header>
          <ul className="role-page__actions">
            {role.actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
          {children}
        </section>
      </main>
    </div>
  );
};

export default RoleLayout;
