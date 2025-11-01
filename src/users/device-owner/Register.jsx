import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal.jsx';
import RolePageRenderer from '../../components/RolePageRenderer.jsx';

const DeviceOwnerRegister = () => {
  const navigate = useNavigate();
  const provinces = [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu-Natal',
    'Limpopo',
    'Mpumalanga',
    'Northern Cape',
    'North West',
    'Western Cape'
  ];
  const [isOpen, setIsOpen] = useState(true);
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '+27 ',
    country: '',
    agree: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    navigate('/device-owner/login');
  };

  return (
    <>
      <RolePageRenderer pageKey="register" />
      <Modal isOpen={isOpen} onClose={handleClose} title={null} titleId="device-owner-register">
        <header className="modal__header modal__header--center">
          <h1 id="device-owner-register">Device Owner</h1>
          <h3>Register Your Account</h3>
        </header>
        <form className="form-card__form" onSubmit={handleSubmit}>
          <div className="form-grid form-grid--two">
            <div className="form-card__field">
              <label htmlFor="register-full-name">Full name</label>
              <input
                id="register-full-name"
                name="fullName"
                type="text"
                autoComplete="name"
                value={formState.fullName}
                onChange={handleChange}
                required
                placeholder="Ada Lovelace"
              />
            </div>
            <div className="form-card__field">
              <label htmlFor="register-email">Email address</label>
              <input
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                value={formState.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>
            <div className="form-card__field form-card__field--password">
              <label htmlFor="register-password">Password</label>
              <input
                id="register-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={formState.password}
                onChange={handleChange}
                required
                placeholder="Create a secure password"
                minLength={8}
                className="form-input form-input--toggle"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-pressed={showPassword}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="form-card__field form-card__field--password">
              <label htmlFor="register-confirm-password">Confirm password</label>
              <input
                id="register-confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={formState.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Re-enter your password"
                minLength={8}
                className="form-input form-input--toggle"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-pressed={showConfirmPassword}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="form-card__field">
              <label htmlFor="register-phone">Mobile number (optional)</label>
              <input
                id="register-phone"
                name="phone"
                type="tel"
                placeholder="+27 82 000 0000"
                value={formState.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-card__field">
              <label htmlFor="register-country">Country / region</label>
              <select
                id="register-country"
                name="country"
                value={formState.country}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select province
                </option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <label className="form-card__checkbox">
            <input
              type="checkbox"
              name="agree"
              checked={formState.agree}
              onChange={handleChange}
              required
            />
            I agree to the program terms and privacy notice.
          </label>
          <button type="submit" className="form-card__submit">
            Start protecting my devices
          </button>
        </form>
        <footer className="form-card__footer">
          <p>
            Already registered?{' '}
            <Link className="form-card__link" to="/device-owner/login">
              Login instead
            </Link>
          </p>
        </footer>
      </Modal>
    </>
  );
};

export default DeviceOwnerRegister;
