import React, { createContext, useContext, useState, useCallback } from 'react';

const ChildrenContext = createContext();

const MAX_CHILDREN = 2;

export const useChildren = () => {
  const context = useContext(ChildrenContext);
  if (!context) {
    throw new Error('useChildren must be used within a ChildrenProvider');
  }
  return context;
};

export const ChildrenProvider = ({ children }) => {
  const [childProfiles, setChildProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addChild = useCallback(async (childData) => {
    if (childProfiles.length >= MAX_CHILDREN) {
      throw new Error(`Maximum of ${MAX_CHILDREN} children allowed`);
    }

    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      const newChild = {
        id: Date.now().toString(),
        ...childData,
        createdAt: new Date().toISOString(),
        devices: []
      };

      setChildProfiles(prev => [...prev, newChild]);
      return newChild;
    } catch (err) {
      setError('Failed to add child');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [childProfiles.length]);

  const updateChild = useCallback(async (childId, updates) => {
    try {
      setLoading(true);
      setError(null);

      setChildProfiles(prev => prev.map(child =>
        child.id === childId
          ? { ...child, ...updates, updatedAt: new Date().toISOString() }
          : child
      ));
    } catch (err) {
      setError('Failed to update child');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteChild = useCallback(async (childId) => {
    try {
      setLoading(true);
      setError(null);

      setChildProfiles(prev => prev.filter(child => child.id !== childId));
    } catch (err) {
      setError('Failed to delete child');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const assignDeviceToChild = useCallback(async (deviceId, childId) => {
    try {
      setLoading(true);
      setError(null);

      setChildProfiles(prev => prev.map(child => {
        // Remove device from any child that might have it
        const filteredDevices = child.devices.filter(id => id !== deviceId);
        
        // Add device to the target child
        if (child.id === childId) {
          return {
            ...child,
            devices: [...filteredDevices, deviceId],
            updatedAt: new Date().toISOString()
          };
        }
        
        return {
          ...child,
          devices: filteredDevices,
          updatedAt: child.devices.includes(deviceId) ? new Date().toISOString() : child.updatedAt
        };
      }));
    } catch (err) {
      setError('Failed to assign device');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAssignedDevices = useCallback((childId) => {
    const child = childProfiles.find(c => c.id === childId);
    return child ? child.devices : [];
  }, [childProfiles]);

  const canAddChild = childProfiles.length < MAX_CHILDREN;

  const value = {
    children: childProfiles,
    loading,
    error,
    addChild,
    updateChild,
    deleteChild,
    assignDeviceToChild,
    getAssignedDevices,
    canAddChild,
    MAX_CHILDREN
  };

  return <ChildrenContext.Provider value={value}>{children}</ChildrenContext.Provider>;
};