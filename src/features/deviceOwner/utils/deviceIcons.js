import { DEVICE_TYPES, deviceTypeConfig } from '../constants/deviceTypes';

export const getDeviceIcon = (type) => {
  const config = deviceTypeConfig.find(c => c.value === type);
  return config ? config.icon : '📱';
};

export const getDeviceLabel = (type) => {
  const config = deviceTypeConfig.find(c => c.value === type);
  return config ? config.label : 'Unknown Device';
};