import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal.jsx';
import RolePageRenderer from '../../components/RolePageRenderer.jsx';

const DeviceOwnerLogin = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleClose = useCallback(() => {
    setIsOpen(false);
    navigate('/device-owner');
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsOpen(false);
    navigate('/device-owner/dashboard');
  };

  return (
    <>
      <RolePageRenderer pageKey="login" />
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Login to your account"
        titleId="device-owner-login"
      >
        <p className="modal__intro">
          Access your registered devices, respond to incident updates, and pick up where you left off
          in the recovery process.
        </p>
        <form className="form-card__form" onSubmit={handleSubmit}>
          <div className="form-card__field">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              value={formState.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </div>
          <div className="form-card__field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formState.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="form-card__options">
            <label className="form-card__checkbox">
              <input
                type="checkbox"
                name="remember"
                checked={formState.remember}
                onChange={handleChange}
              />
              Keep me signed in
            </label>
            <a className="form-card__link" href="#forgot-password">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="form-card__submit">
            Continue to dashboard
          </button>
        </form>
        <footer className="form-card__footer">
          <p>
            Need an account?{' '}
            <Link className="form-card__link" to="/device-owner/register">
              Register now
            </Link>
          </p>
        </footer>
      </Modal>
    </>
  );
};

export default DeviceOwnerLogin;
