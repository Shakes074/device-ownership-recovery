// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock device storage
const mockDevices = new Map();

export const mockDeviceService = {
  async getDevices() {
    await delay();
    return Array.from(mockDevices.values());
  },

  async getDeviceById(id) {
    await delay();
    const device = mockDevices.get(id);
    if (!device) {
      throw new Error('Device not found');
    }
    return device;
  },

  async updateDevice(id, updates) {
    await delay();
    const device = mockDevices.get(id);
    if (!device) {
      throw new Error('Device not found');
    }

    const updatedDevice = {
      ...device,
      ...updates,
      statusHistory: [
        {
          status: updates.status || device.status,
          timestamp: new Date().toISOString(),
          notes: updates.notes || ''
        },
        ...device.statusHistory
      ]
    };

    mockDevices.set(id, updatedDevice);
    return updatedDevice;
  },

  async reportLost(deviceId, affidavit) {
    await delay();
    const device = mockDevices.get(deviceId);
    if (!device) {
      throw new Error('Device not found');
    }

    const updatedDevice = {
      ...device,
      status: 'LOST',
      affidavit,
      statusHistory: [
        {
          status: 'LOST',
          timestamp: new Date().toISOString(),
          notes: 'Device reported as lost'
        },
        ...device.statusHistory
      ]
    };

    mockDevices.set(deviceId, updatedDevice);
    return updatedDevice;
  },

  async reportStolen(deviceId, policeReport) {
    await delay();
    const device = mockDevices.get(deviceId);
    if (!device) {
      throw new Error('Device not found');
    }

    const updatedDevice = {
      ...device,
      status: 'STOLEN',
      policeReport,
      statusHistory: [
        {
          status: 'STOLEN',
          timestamp: new Date().toISOString(),
          notes: `Police case number: ${policeReport.caseNumber}`
        },
        ...device.statusHistory
      ]
    };

    mockDevices.set(deviceId, updatedDevice);
    return updatedDevice;
  },

  async sendToRepair(deviceId, repairInfo) {
    await delay();
    const device = mockDevices.get(deviceId);
    if (!device) {
      throw new Error('Device not found');
    }

    const updatedDevice = {
      ...device,
      status: 'REPAIR_PENDING',
      repairInfo,
      statusHistory: [
        {
          status: 'REPAIR_PENDING',
          timestamp: new Date().toISOString(),
          notes: `Sent to repair at ${repairInfo.companyName}`
        },
        ...device.statusHistory
      ]
    };

    mockDevices.set(deviceId, updatedDevice);
    return updatedDevice;
  },

  async transferOwnership(deviceId, recipientInfo) {
    await delay();
    const device = mockDevices.get(deviceId);
    if (!device) {
      throw new Error('Device not found');
    }

    // In a real app, this would create a transfer request
    // For demo purposes, just remove the device from current owner
    mockDevices.delete(deviceId);
    return { success: true };
  },

  async archiveDevice(deviceId, reason) {
    await delay();
    const device = mockDevices.get(deviceId);
    if (!device) {
      throw new Error('Device not found');
    }

    const updatedDevice = {
      ...device,
      status: 'ARCHIVED',
      archiveReason: reason,
      statusHistory: [
        {
          status: 'ARCHIVED',
          timestamp: new Date().toISOString(),
          notes: `Archived: ${reason}`
        },
        ...device.statusHistory
      ]
    };

    mockDevices.set(deviceId, updatedDevice);
    return updatedDevice;
  },

  async restoreDevice(deviceId) {
    await delay();
    const device = mockDevices.get(deviceId);
    if (!device) {
      throw new Error('Device not found');
    }

    if (!['ARCHIVED', 'DAMAGED'].includes(device.status)) {
      throw new Error('Device cannot be restored from current status');
    }

    const updatedDevice = {
      ...device,
      status: 'ACTIVE',
      statusHistory: [
        {
          status: 'ACTIVE',
          timestamp: new Date().toISOString(),
          notes: 'Device restored'
        },
        ...device.statusHistory
      ]
    };

    mockDevices.set(deviceId, updatedDevice);
    return updatedDevice;
  }
};