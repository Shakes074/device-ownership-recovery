import React from 'react';
import PropTypes from 'prop-types';
import { formatRelativeTime, formatDate } from '../utils/formatters';

const EventIcon = ({ type }) => {
  const iconProps = {
    className: 'security-events__icon',
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  switch (type) {
    case 'LOGIN':
    case 'LOGIN_ATTEMPT':
      return (
        <svg {...iconProps}>
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg>
      );
    case 'OTP_VERIFICATION':
      return (
        <svg {...iconProps}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'PASSWORD_CHANGE':
      return (
        <svg {...iconProps}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case 'PROFILE_UPDATE':
      return (
        <svg {...iconProps}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case 'SESSION_LOGOUT':
      return (
        <svg {...iconProps}>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="8" />
        </svg>
      );
  }
};

EventIcon.propTypes = {
  type: PropTypes.string.isRequired
};

const SecurityEventsList = ({ events }) => {
  // Group events by date
  const groupedEvents = events.reduce((groups, event) => {
    const date = new Date(event.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {});

  const getEventLabel = (type) => {
    switch (type) {
      case 'LOGIN': return 'Login';
      case 'LOGIN_ATTEMPT': return 'Login attempt';
      case 'OTP_VERIFICATION': return 'OTP verification';
      case 'PASSWORD_CHANGE': return 'Password changed';
      case 'PROFILE_UPDATE': return 'Profile updated';
      case 'SESSION_LOGOUT': return 'Logged out';
      default: return type.replace(/_/g, ' ').toLowerCase();
    }
  };

  return (
    <div 
      className="security-events"
      role="region"
      aria-label="Security Events"
    >
      {Object.entries(groupedEvents).map(([date, dateEvents]) => (
        <div key={date} className="security-events__group">
          <h3 className="security-events__date">
            {formatDate(dateEvents[0].timestamp, 'long')}
          </h3>
          
          <ul className="security-events__list">
            {dateEvents.map(event => (
              <li 
                key={event.id}
                className={`security-events__item ${
                  event.status === 'failed' 
                    ? 'security-events__item--failed' 
                    : ''
                }`}
              >
                <div className="security-events__icon-wrapper">
                  <EventIcon type={event.type} />
                </div>

                <div className="security-events__content">
                  <div className="security-events__header">
                    <span className="security-events__type">
                      {getEventLabel(event.type)}
                    </span>
                    <time 
                      className="security-events__time"
                      dateTime={event.timestamp}
                      title={formatDate(event.timestamp, 'full')}
                    >
                      {formatRelativeTime(event.timestamp)}
                    </time>
                  </div>

                  <div className="security-events__details">
                    <span className="security-events__device">
                      {event.device}
                    </span>
                    <span className="security-events__location">
                      {event.location}
                    </span>
                  </div>

                  {event.status === 'failed' && event.reason && (
                    <p 
                      className="security-events__error"
                      role="alert"
                    >
                      {event.reason}
                    </p>
                  )}

                  <div className="security-events__meta">
                    <span className="security-events__ip">
                      IP: {event.ipAddress}
                    </span>
                    <span 
                      className={`security-events__status ${
                        event.status === 'failed' 
                          ? 'security-events__status--failed' 
                          : 'security-events__status--success'
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {events.length === 0 && (
        <p className="security-events__empty">
          No security events to display
        </p>
      )}
    </div>
  );
};

SecurityEventsList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        'LOGIN',
        'LOGIN_ATTEMPT',
        'OTP_VERIFICATION',
        'PASSWORD_CHANGE',
        'PROFILE_UPDATE',
        'SESSION_LOGOUT'
      ]).isRequired,
      timestamp: PropTypes.string.isRequired,
      ipAddress: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      device: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['success', 'failed']).isRequired,
      reason: PropTypes.string
    })
  ).isRequired
};

export default SecurityEventsList;