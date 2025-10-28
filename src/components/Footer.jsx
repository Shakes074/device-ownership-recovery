import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Device Ownership Recovery Platform</p>
      <p className="footer__note">
        Building trust between device owners, retail partners, and public safety teams.
      </p>
    </footer>
  );
};

export default Footer;
