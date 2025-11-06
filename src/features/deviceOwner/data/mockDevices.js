import { DEVICE_TYPES } from '../constants/deviceTypes';
import { DEVICE_STATUS } from '../constants/statusTypes';

export const mockDevices = [
  {
    id: '1',
    type: DEVICE_TYPES.PHONE,
    brand: 'Samsung',
    model: 'Galaxy S21',
    serialNumber: 'SN1234567890',
    imei: '123456789012345',
    imei2: '987654321098765', // Dual SIM phone
    purchaseDate: '2023-12-15T08:00:00.000Z',
    purchaseStore: 'TechHub Mall',
    status: DEVICE_STATUS.ACTIVE,
    assignedTo: null,
    qrVisible: true,
    statusHistory: [
      {
        status: DEVICE_STATUS.ACTIVE,
        timestamp: '2023-12-15T08:00:00.000Z',
        notes: 'Device registered',
        updatedBy: 'Store Admin'
      }
    ]
  },
  {
    id: '2',
    type: DEVICE_TYPES.LAPTOP,
    brand: 'Dell',
    model: 'XPS 15',
    serialNumber: 'DL98765432',
    purchaseDate: '2023-11-01T10:30:00.000Z',
    purchaseStore: 'Computer World',
    status: DEVICE_STATUS.LOST,
    assignedTo: 'child1',
    qrVisible: false,
    statusHistory: [
      {
        status: DEVICE_STATUS.LOST,
        timestamp: '2024-01-05T14:20:00.000Z',
        notes: 'Device reported lost',
        updatedBy: 'Owner'
      },
      {
        status: DEVICE_STATUS.ACTIVE,
        timestamp: '2023-11-01T10:30:00.000Z',
        notes: 'Device registered',
        updatedBy: 'Store Admin'
      }
    ],
    affidavit: {
      fileUrl: 'mock-affidavit.pdf',
      uploadDate: '2024-01-05T14:20:00.000Z'
    }
  },
  {
    id: '3',
    type: DEVICE_TYPES.TABLET,
    brand: 'Apple',
    model: 'iPad Pro 12.9"',
    serialNumber: 'IPAD987654',
    imei: '555666777888999',
    purchaseDate: '2023-10-20T09:15:00.000Z',
    purchaseStore: 'iStore Mall',
    status: DEVICE_STATUS.REPAIR_ACTIVE,
    assignedTo: 'child2',
    qrVisible: true,
    statusHistory: [
      {
        status: DEVICE_STATUS.REPAIR_ACTIVE,
        timestamp: '2024-01-10T11:00:00.000Z',
        notes: 'Repair in progress',
        updatedBy: 'Repair Center'
      },
      {
        status: DEVICE_STATUS.REPAIR_PENDING,
        timestamp: '2024-01-08T15:45:00.000Z',
        notes: 'Device sent for repair',
        updatedBy: 'Owner'
      },
      {
        status: DEVICE_STATUS.ACTIVE,
        timestamp: '2023-10-20T09:15:00.000Z',
        notes: 'Device registered',
        updatedBy: 'Store Admin'
      }
    ],
    repairInfo: {
      companyName: 'TechFix Solutions',
      reference: 'REP123456',
      startDate: '2024-01-08T15:45:00.000Z',
      estimatedCompletion: '2024-01-15T00:00:00.000Z'
    }
  },
  {
    id: '4',
    type: DEVICE_TYPES.TV,
    brand: 'LG',
    model: '65" OLED C1',
    serialNumber: 'TV123456789',
    purchaseDate: '2023-09-01T13:00:00.000Z',
    purchaseStore: 'Electronics Emporium',
    status: DEVICE_STATUS.STOLEN,
    assignedTo: null,
    qrVisible: false,
    statusHistory: [
      {
        status: DEVICE_STATUS.STOLEN,
        timestamp: '2024-01-02T07:30:00.000Z',
        notes: 'Device reported stolen',
        updatedBy: 'Owner'
      },
      {
        status: DEVICE_STATUS.ACTIVE,
        timestamp: '2023-09-01T13:00:00.000Z',
        notes: 'Device registered',
        updatedBy: 'Store Admin'
      }
    ],
    policeReport: {
      station: 'Central Police Station',
      caseNumber: 'CAS 123/01/2024',
      reportDate: '2024-01-02T07:30:00.000Z'
    }
  },
  {
    id: '5',
    type: DEVICE_TYPES.GAMING_CONSOLE,
    brand: 'Sony',
    model: 'PlayStation 5',
    serialNumber: 'PS5123456',
    purchaseDate: '2023-08-15T11:20:00.000Z',
    purchaseStore: 'Game Store',
    status: DEVICE_STATUS.ARCHIVED,
    assignedTo: null,
    qrVisible: false,
    statusHistory: [
      {
        status: DEVICE_STATUS.ARCHIVED,
        timestamp: '2024-01-15T16:00:00.000Z',
        notes: 'Device sold',
        updatedBy: 'Owner'
      },
      {
        status: DEVICE_STATUS.ACTIVE,
        timestamp: '2023-08-15T11:20:00.000Z',
        notes: 'Device registered',
        updatedBy: 'Store Admin'
      }
    ],
    archiveReason: 'Device sold to new owner'
  }
];