import React from 'react';

const Home = () => {
  return (
    <div className="panel panel--hero">
      <div className="panel__content">
        <h1>Recover devices faster with verified ownership</h1>
        <p>
          Device Ownership Recovery connects owners, stores, law enforcement, and administrators in
          a single workflow, making it easy to validate ownership, flag suspicious activity, and
          return devices to their rightful owners.
        </p>
        <div className="cta-group">
          <a className="cta" href="#users">
            Explore user journeys
          </a>
          <a className="cta cta--outline" href="#contact">
            Talk with our team
          </a>
        </div>
      </div>
      <div className="panel__stats">
        <div>
          <span className="stat__value">96%</span>
          <span className="stat__label">Recovery accuracy</span>
        </div>
        <div>
          <span className="stat__value">2K+</span>
          <span className="stat__label">Devices reunited</span>
        </div>
        <div>
          <span className="stat__value">24/7</span>
          <span className="stat__label">Verification support</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
