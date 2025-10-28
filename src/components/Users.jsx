import React from 'react';
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
          <article key={profile.role} className={`user-card user-card--${profile.accent}`}>
            <h3>{profile.role}</h3>
            <p>{profile.summary}</p>
            <ul>
              {profile.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Users;
