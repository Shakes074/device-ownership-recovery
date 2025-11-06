import React from 'react';
import { userProfiles } from '../data/userProfiles.js';
import UserPagination from './UserPagination';

const Users = () => {
  return (
    <div className="panel">
      <h2>User journeys</h2>
      <p>
        The platform guides every participant through consistent, role-aware workflows. Explore how
        each group engages with the system:
      </p>
      <UserPagination profiles={userProfiles} />
    </div>
  );
};

export default Users;
