import React from 'react';
import { Link } from 'react-router-dom';
import { userProfiles } from '../data/userProfiles.js';

const Users = () => {
  return (
    <div className="panel">
      <h2>User journeys</h2>
      <p>
        The platform guides every participant through consistent, role-aware workflows. Explore how
        each group engages with the system:
      </p>
      <div className="user-grid">
        {userProfiles.map((profile) => (
          <article key={profile.key} className={`user-card user-card--${profile.accent}`}>
            <h3>{profile.role}</h3>
            <p>{profile.summary}</p>
            <ul>
              {profile.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
            {profile.marketingCta?.disabled ? (
              <span className="user-card__cta user-card__cta--disabled">
                {profile.marketingCta.label}
              </span>
            ) : (
              <Link className="user-card__cta" to={profile.marketingCta?.href ?? profile.path}>
                {profile.marketingCta?.label ?? 'Learn more'} →
              </Link>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

export default Users;
