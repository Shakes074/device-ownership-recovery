import React from 'react';

const Contact = () => {
  return (
    <div className="panel">
      <h2>Contact us</h2>
      <p>
        Ready to bring Device Ownership Recovery to your organization? Reach out and our onboarding
        team will schedule a walkthrough tailored to your workflows.
      </p>
      <div className="contact-details">
        <div>
          <strong>Email:</strong> <a href="mailto:hello@deviceownership.io">hello@deviceownership.io</a>
        </div>
        <div>
          <strong>Phone:</strong> <a href="tel:+18885551212">+1 (888) 555-1212</a>
        </div>
        <div>
          <strong>Office hours:</strong> Monday–Friday, 9am–6pm PT
        </div>
      </div>
      <form className="contact-form">
        <div className="contact-form__row">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" placeholder="Your full name" />
        </div>
        <div className="contact-form__row">
          <label htmlFor="organization">Organization</label>
          <input
            id="organization"
            type="text"
            name="organization"
            placeholder="Company, agency, or team"
          />
        </div>
        <div className="contact-form__row">
          <label htmlFor="role">Role</label>
          <select id="role" name="role" defaultValue="">
            <option value="" disabled>
              Select a role
            </option>
            <option value="owner">Device Owner</option>
            <option value="store">Store User</option>
            <option value="law">Law Enforcement</option>
            <option value="admin">System Admin</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="contact-form__row">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Let us know how we can help"
          />
        </div>
        <button type="submit" className="cta">
          Submit inquiry
        </button>
      </form>
    </div>
  );
};

export default Contact;
