import React from 'react';
import { Link } from 'react-router-dom';

const defaultNavLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Users', href: '/#users' },
  { label: 'Contact', href: '/#contact' }
];

const Header = ({ navLinks }) => {
  const links = navLinks && navLinks.length > 0 ? navLinks : defaultNavLinks;

  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo">Device Ownership Recovery</span>
        <p className="header__tagline">Secure pathways to reunite people with their devices</p>
      </div>
      <nav className="header__nav" aria-label="Primary">
        {links.map(({ label, to, href, variant = 'link', disabled = false }) => {
          const className = `header__link header__link--${variant}${disabled ? ' is-disabled' : ''}`;

          if (disabled) {
            return (
              <span key={label} className={className} aria-disabled="true">
                {label}
              </span>
            );
          }

          if (to) {
            return (
              <Link key={label} className={className} to={to}>
                {label}
              </Link>
            );
          }

          return (
            <a key={label} className={className} href={href}>
              {label}
            </a>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
