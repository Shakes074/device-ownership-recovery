import React from 'react';
import PropTypes from 'prop-types';
import { statusConfig } from '../utils/statusConfig';

const StatusChip = ({ status, size = 'medium' }) => {
  const config = statusConfig.find(s => s.value === status) || {
    label: status,
    color: 'var(--status-unknown)'
  };

  return (
    <span
      className={`status-chip status-chip--${size}`}
      style={{ '--status-color': config.color }}
      role="status"
    >
      {config.label}
    </span>
  );
};

StatusChip.propTypes = {
  status: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default StatusChip;