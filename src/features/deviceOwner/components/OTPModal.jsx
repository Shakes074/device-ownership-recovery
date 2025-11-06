import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../components/Modal';
import { mockOtpService } from '../services/otpService';
import '../styles/otp-modal.css';

const OTPModal = ({
  isOpen,
  onClose,
  onVerify,
  phone,
  title = 'Verify Phone Number',
  description = 'Enter the 6-digit code sent to your phone'
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  const handleChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple digits
    if (!/^\d*$/.test(value)) return; // Only allow digits

    setOtp((prev) => {
      const newOtp = [...prev];
      newOtp[index] = value;
      return newOtp;
    });

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await mockOtpService.verifyOTP(phone, otpString);
      onVerify();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError(null);

    try {
      await mockOtpService.resendOTP(phone);
      setCountdown(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="otp-modal">
        <h2 className="otp-modal__title">{title}</h2>
        <p className="otp-modal__description">{description}</p>
        <p className="otp-modal__phone">
          Code sent to: {phone}
        </p>
        
        <div className="otp-input-group">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              id={`otp-${index}`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              className="otp-input"
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>

        {error && (
          <p className="otp-modal__error" role="alert">
            {error}
          </p>
        )}

        <div className="otp-modal__actions">
          <button
            onClick={handleVerify}
            className="otp-modal__verify"
            disabled={loading || otp.join('').length !== 6}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>

          {canResend ? (
            <button
              onClick={handleResend}
              className="otp-modal__resend"
              disabled={loading}
            >
              Resend Code
            </button>
          ) : (
            <p className="otp-modal__countdown">
              Resend code in {countdown}s
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

OTPModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onVerify: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string
};

export default OTPModal;
