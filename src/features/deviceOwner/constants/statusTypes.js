export const DEVICE_STATUS = {
  ACTIVE: 'ACTIVE',
  LOST: 'LOST',
  STOLEN: 'STOLEN',
  RECOVERED: 'RECOVERED',
  REPAIR_PENDING: 'REPAIR_PENDING',
  REPAIR_ACTIVE: 'REPAIR_ACTIVE',
  DAMAGED: 'DAMAGED',
  ARCHIVED: 'ARCHIVED'
};

export const statusConfig = [
  {
    value: DEVICE_STATUS.ACTIVE,
    label: 'Active',
    description: 'Device is in normal working condition',
    color: 'var(--status-active)',
    allowedActions: ['report-lost', 'report-stolen', 'send-to-repair', 'transfer', 'archive']
  },
  {
    value: DEVICE_STATUS.LOST,
    label: 'Lost',
    description: 'Device has been reported as lost',
    color: 'var(--status-lost)',
    allowedActions: ['recover', 'update-affidavit']
  },
  {
    value: DEVICE_STATUS.STOLEN,
    label: 'Stolen',
    description: 'Device has been reported as stolen',
    color: 'var(--status-stolen)',
    allowedActions: ['recover', 'update-police-report']
  },
  {
    value: DEVICE_STATUS.RECOVERED,
    label: 'Recovered',
    description: 'Device has been recovered',
    color: 'var(--status-recovered)',
    allowedActions: ['report-lost', 'report-stolen', 'send-to-repair', 'transfer', 'archive']
  },
  {
    value: DEVICE_STATUS.REPAIR_PENDING,
    label: 'Repair Pending',
    description: 'Device is waiting to be received by repair center',
    color: 'var(--status-repair)',
    allowedActions: ['update-repair-status', 'cancel-repair']
  },
  {
    value: DEVICE_STATUS.REPAIR_ACTIVE,
    label: 'Under Repair',
    description: 'Device is being repaired',
    color: 'var(--status-repair)',
    allowedActions: ['update-repair-status']
  },
  {
    value: DEVICE_STATUS.DAMAGED,
    label: 'Damaged',
    description: 'Device is damaged but not under repair',
    color: 'var(--status-damaged)',
    allowedActions: ['send-to-repair', 'archive']
  },
  {
    value: DEVICE_STATUS.ARCHIVED,
    label: 'Archived',
    description: 'Device is no longer in use',
    color: 'var(--status-archived)',
    allowedActions: ['restore']
  }
];