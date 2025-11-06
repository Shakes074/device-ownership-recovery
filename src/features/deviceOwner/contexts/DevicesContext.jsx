import React, { createContext, useContext, useState, useCallback } from 'react';
import { mockDeviceService } from '../services/deviceService';
import { DEVICE_STATUS } from '../constants/statusTypes';

const DevicesContext = createContext();

export const useDevices = () => {
  const context = useContext(DevicesContext);
  if (!context) {
    throw new Error('useDevices must be used within a DevicesProvider');
  }
  return context;
};

export const DevicesProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDevices = useCallback(async () => {
    try {
      setLoading(true);
      const deviceList = await mockDeviceService.getDevices();
      setDevices(deviceList);
    } catch (err) {
      setError('Failed to fetch devices');
    } finally {
      setLoading(false);
    }
  }, []);

  const getDeviceById = useCallback((id) => {
    return devices.find(device => device.id === id);
  }, [devices]);

  const updateDeviceStatus = useCallback(async (deviceId, status, details = {}) => {
    try {
      setLoading(true);
      const updatedDevice = await mockDeviceService.updateDevice(deviceId, {
        status,
        ...details
      });
      setDevices(prev => prev.map(device => 
        device.id === deviceId ? updatedDevice : device
      ));
      return updatedDevice;
    } catch (err) {
      setError('Failed to update device status');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reportLost = useCallback(async (deviceId, affidavit) => {
    try {
      setLoading(true);
      const updatedDevice = await mockDeviceService.reportLost(deviceId, affidavit);
      setDevices(prev => prev.map(device =>
        device.id === deviceId ? updatedDevice : device
      ));
      return updatedDevice;
    } catch (err) {
      setError('Failed to report device as lost');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reportStolen = useCallback(async (deviceId, policeReport) => {
    try {
      setLoading(true);
      const updatedDevice = await mockDeviceService.reportStolen(deviceId, policeReport);
      setDevices(prev => prev.map(device =>
        device.id === deviceId ? updatedDevice : device
      ));
      return updatedDevice;
    } catch (err) {
      setError('Failed to report device as stolen');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const sendToRepair = useCallback(async (deviceId, repairInfo) => {
    try {
      setLoading(true);
      const updatedDevice = await mockDeviceService.sendToRepair(deviceId, repairInfo);
      setDevices(prev => prev.map(device =>
        device.id === deviceId ? updatedDevice : device
      ));
      return updatedDevice;
    } catch (err) {
      setError('Failed to send device to repair');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const transferOwnership = useCallback(async (deviceId, recipientInfo) => {
    try {
      setLoading(true);
      await mockDeviceService.transferOwnership(deviceId, recipientInfo);
      setDevices(prev => prev.filter(device => device.id !== deviceId));
    } catch (err) {
      setError('Failed to transfer ownership');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const archiveDevice = useCallback(async (deviceId, reason) => {
    try {
      setLoading(true);
      const updatedDevice = await mockDeviceService.archiveDevice(deviceId, reason);
      setDevices(prev => prev.map(device =>
        device.id === deviceId ? updatedDevice : device
      ));
      return updatedDevice;
    } catch (err) {
      setError('Failed to archive device');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const restoreDevice = useCallback(async (deviceId) => {
    try {
      setLoading(true);
      const updatedDevice = await mockDeviceService.restoreDevice(deviceId);
      setDevices(prev => prev.map(device =>
        device.id === deviceId ? updatedDevice : device
      ));
      return updatedDevice;
    } catch (err) {
      setError('Failed to restore device');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleQRVisibility = useCallback(async (deviceId) => {
    try {
      setLoading(true);
      const device = getDeviceById(deviceId);
      const updatedDevice = await mockDeviceService.updateDevice(deviceId, {
        qrVisible: !device.qrVisible
      });
      setDevices(prev => prev.map(device =>
        device.id === deviceId ? updatedDevice : device
      ));
      return updatedDevice;
    } catch (err) {
      setError('Failed to toggle QR visibility');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getDeviceById]);

  const value = {
    devices,
    loading,
    error,
    fetchDevices,
    getDeviceById,
    updateDeviceStatus,
    reportLost,
    reportStolen,
    sendToRepair,
    transferOwnership,
    archiveDevice,
    restoreDevice,
    toggleQRVisibility
  };

  return <DevicesContext.Provider value={value}>{children}</DevicesContext.Provider>;
};
