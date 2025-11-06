import { statusConfig } from '../constants/statusTypes';

export const getStatusConfig = (status) => {
  return statusConfig.find(config => config.value === status);
};

export const getStatusColor = (status) => {
  const config = getStatusConfig(status);
  return config ? config.color : 'var(--status-unknown)';
};

export const getStatusLabel = (status) => {
  const config = getStatusConfig(status);
  return config ? config.label : 'Unknown';
};

export const getStatusDescription = (status) => {
  const config = getStatusConfig(status);
  return config ? config.description : 'Unknown status';
};

export const getAllowedActions = (status) => {
  const config = getStatusConfig(status);
  return config ? config.allowedActions : [];
};

export const canPerformAction = (status, action) => {
  const allowedActions = getAllowedActions(status);
  return allowedActions.includes(action);
};