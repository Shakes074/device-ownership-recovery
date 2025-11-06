import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StatusChip from './StatusChip';
import { getDeviceIcon } from '../utils/deviceIcons';
import { formatDate } from '../utils/formatters';

const DeviceCard = ({ device, onSelect }) => {
  const {
    id,
    type,
    brand,
    model,
    status,
    purchaseDate,
    assignedTo,
    qrVisible
  } = device;

  return (
    <article className="device-card">
      <div className="device-card__icon">
        {getDeviceIcon(type)}
      </div>
      <div className="device-card__content">
        <div className="device-card__header">
          <h3 className="device-card__title">
            {brand} {model}
          </h3>
          <StatusChip status={status} size="small" />
        </div>
        <div className="device-card__info">
          <span>Purchased: {formatDate(purchaseDate, 'short')}</span>
          {assignedTo && (
            <span className="device-card__assigned">
              Assigned to: {assignedTo}
            </span>
          )}
        </div>
        <div className="device-card__footer">
          <Link
            to={`/device-owner/devices/${id}`}
            className="device-card__action"
            onClick={(e) => {
              e.preventDefault();
              onSelect(device);
            }}
          >
            View details →
          </Link>
          {qrVisible && (
            <button
              className="device-card__qr-toggle"
              aria-label="Toggle QR Code"
            >
              🔍
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

DeviceCard.propTypes = {
  device: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    purchaseDate: PropTypes.string.isRequired,
    assignedTo: PropTypes.string,
    qrVisible: PropTypes.bool
  }).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default DeviceCard;