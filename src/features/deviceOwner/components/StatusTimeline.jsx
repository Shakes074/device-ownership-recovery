import React from 'react';
import PropTypes from 'prop-types';
import StatusChip from './StatusChip';
import { formatDate, formatRelativeTime } from '../utils/formatters';

const StatusTimeline = ({ statusHistory }) => {
  return (
    <div className="status-timeline">
      {statusHistory.map((entry, index) => (
        <div
          key={`${entry.status}-${entry.timestamp}`}
          className={`status-timeline__entry ${
            index === 0 ? 'status-timeline__entry--current' : ''
          }`}
        >
          <div className="status-timeline__marker" />
          <div className="status-timeline__content">
            <div className="status-timeline__header">
              <StatusChip status={entry.status} size="small" />
              <time
                className="status-timeline__time"
                dateTime={entry.timestamp}
                title={formatDate(entry.timestamp, 'long')}
              >
                {formatRelativeTime(entry.timestamp)}
              </time>
            </div>
            {entry.notes && (
              <p className="status-timeline__notes">{entry.notes}</p>
            )}
            {entry.updatedBy && (
              <p className="status-timeline__updated-by">
                Updated by: {entry.updatedBy}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

StatusTimeline.propTypes = {
  statusHistory: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      notes: PropTypes.string,
      updatedBy: PropTypes.string
    })
  ).isRequired
};

export default StatusTimeline;