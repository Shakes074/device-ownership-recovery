import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo">Device Ownership Recovery</span>
        <p className="header__tagline">Secure pathways to reunite people with their devices</p>
      </div>
      <nav className="header__nav">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#users">Users</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
