import React from 'react';

const About = () => {
  return (
    <div className="panel">
      <h2>About the platform</h2>
      <p>
        The Device Ownership Recovery application streamlines how organizations validate and recover
        missing devices. We combine secure identity verification, auditable workflows, and
        collaborative tools so every stakeholder can take action with confidence.
      </p>
      <ul className="feature-list">
        <li>Centralized device registry with tamper-resistant audit trails</li>
        <li>Multi-factor checks that confirm device ownership status in seconds</li>
        <li>Escalation protocols for law enforcement and store personnel</li>
        <li>Analytics that highlight recovery trends and hotspots</li>
      </ul>
    </div>
  );
};

export default About;
