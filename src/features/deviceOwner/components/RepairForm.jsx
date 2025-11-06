import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { mockDeviceService } from '../services/deviceService';
import OTPModal from './OTPModal';
import { validateEmail, validatePhone } from '../utils/validation';

const RepairForm = ({ deviceId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setShowOTPModal(true);
  };

  const handleOTPVerify = async () => {
    setIsSubmitting(true);
    setShowOTPModal(false);
    
    try {
      const updatedDevice = await mockDeviceService.sendToRepair(deviceId, formData);
      onSubmit(updatedDevice);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.message
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const milestones = [
    { status: 'REPAIR_PENDING', label: 'Received' },
    { status: 'REPAIR_ACTIVE', label: 'In Progress' },
    { status: 'REPAIR_COMPLETE', label: 'Ready' }
  ];

  return (
    <div className="repair-form">
      <div className="repair-form__milestones">
        {milestones.map((milestone, index) => (
          <div 
            key={milestone.status}
            className="repair-form__milestone"
            aria-current={index === 0 ? 'step' : undefined}
          >
            <div className="repair-form__milestone-dot" />
            <span className="repair-form__milestone-label">
              {milestone.label}
            </span>
            {index < milestones.length - 1 && (
              <div className="repair-form__milestone-connector" />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="repair-form__field">
          <label 
            htmlFor="companyName"
            className="repair-form__label"
          >
            Repair Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className={`repair-form__input ${
              errors.companyName ? 'repair-form__input--error' : ''
            }`}
            aria-invalid={!!errors.companyName}
            aria-describedby={errors.companyName ? 'companyName-error' : undefined}
            disabled={isSubmitting}
            required
          />
          {errors.companyName && (
            <p 
              className="repair-form__error" 
              id="companyName-error"
              role="alert"
            >
              {errors.companyName}
            </p>
          )}
        </div>

        <div className="repair-form__field">
          <label 
            htmlFor="email"
            className="repair-form__label"
          >
            Contact Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`repair-form__input ${
              errors.email ? 'repair-form__input--error' : ''
            }`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={isSubmitting}
            required
          />
          {errors.email && (
            <p 
              className="repair-form__error" 
              id="email-error"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div className="repair-form__field">
          <label 
            htmlFor="phone"
            className="repair-form__label"
          >
            Contact Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`repair-form__input ${
              errors.phone ? 'repair-form__input--error' : ''
            }`}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            disabled={isSubmitting}
            required
          />
          {errors.phone && (
            <p 
              className="repair-form__error" 
              id="phone-error"
              role="alert"
            >
              {errors.phone}
            </p>
          )}
        </div>

        {errors.submit && (
          <p 
            className="repair-form__error repair-form__error--submit" 
            role="alert"
          >
            {errors.submit}
          </p>
        )}

        <div className="repair-form__actions">
          <button
            type="button"
            onClick={onCancel}
            className="repair-form__button repair-form__button--secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="repair-form__button repair-form__button--primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send to Repair'}
          </button>
        </div>
      </form>

      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerify={handleOTPVerify}
        phone={formData.phone}
        title="Verify Contact Number"
        description="Please verify the repair company's contact number"
      />
    </div>
  );
};

RepairForm.propTypes = {
  deviceId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default RepairForm;