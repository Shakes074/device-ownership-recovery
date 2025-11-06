import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserPagination = ({ profiles }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const profile = profiles[currentPage];

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % profiles.length);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + profiles.length) % profiles.length);
  };

  return (
    <div className="user-pagination">
      <button 
        onClick={goToPrevPage} 
        className="user-pagination__button user-pagination__button--left"
        aria-label="Previous user role"
      >
        ←
      </button>
      <div className="user-pagination__content">
        <span className="user-pagination__counter">
          {currentPage + 1} of {profiles.length}
        </span>
        <article key={profile.key} className={`user-card user-card--${profile.accent} user-card--full`}>
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
      </div>
      <button 
        onClick={goToNextPage} 
        className="user-pagination__button user-pagination__button--right"
        aria-label="Next user role"
      >
        →
      </button>
    </div>
  );
};

export default UserPagination;