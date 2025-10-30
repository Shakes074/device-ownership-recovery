import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { roleConfigs } from '../users/config.js';

const RoleLayout = ({ roleKey }) => {
  const role = roleConfigs[roleKey];

  if (!role) {
    return (
      <div className="role-shell role-shell--default">
        <Header />
        <main className="role-shell__content role-shell__content--center">
          <section className="role-hero">
            <div className="role-hero__copy">
              <h1>Role not found</h1>
              <p>The requested user portal could not be located.</p>
              <Link className="header__link header__link--primary" to="/">
                Return to home
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className={`role-shell role-shell--${role.accent ?? 'default'}`}
      style={
        role.theme
          ? {
              '--role-primary': role.theme.primary,
              '--role-background': role.theme.background,
              '--role-surface': role.theme.surface
            }
          : undefined
      }
    >
      <Header navLinks={role.navLinks} />
      <main className="role-shell__content">
        <section className="role-hero">
          <div className="role-hero__copy">
            <Link className="role-hero__back" to="/">
              ← Back to main home
            </Link>
            <h1>{role.portalName}</h1>
            <p>{role.overview ?? role.summary}</p>
            {role.isPrivate && role.notice && (
              <div className="role-alert" role="note">
                {role.notice}
              </div>
            )}
          </div>
          <div className="role-hero__actions">
            <h2>Core functions</h2>
            <ul>
              {role.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </div>
        </section>
        <div className="role-shell__details">
          <Outlet context={{ role }} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoleLayout;
