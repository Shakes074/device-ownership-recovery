export const mockSecurityEvents = [
  {
    id: '1',
    type: 'LOGIN',
    timestamp: '2024-01-15T08:30:00.000Z',
    ipAddress: '196.25.255.123',
    location: 'Cape Town, South Africa',
    device: 'Chrome on Windows',
    status: 'success'
  },
  {
    id: '2',
    type: 'OTP_VERIFICATION',
    timestamp: '2024-01-15T08:29:00.000Z',
    ipAddress: '196.25.255.123',
    location: 'Cape Town, South Africa',
    device: 'Chrome on Windows',
    status: 'success'
  },
  {
    id: '3',
    type: 'LOGIN_ATTEMPT',
    timestamp: '2024-01-14T16:45:00.000Z',
    ipAddress: '41.150.123.45',
    location: 'Johannesburg, South Africa',
    device: 'Safari on iPhone',
    status: 'failed',
    reason: 'Invalid password'
  },
  {
    id: '4',
    type: 'PASSWORD_CHANGE',
    timestamp: '2024-01-10T11:20:00.000Z',
    ipAddress: '196.25.255.123',
    location: 'Cape Town, South Africa',
    device: 'Chrome on Windows',
    status: 'success'
  },
  {
    id: '5',
    type: 'PROFILE_UPDATE',
    timestamp: '2024-01-10T11:15:00.000Z',
    ipAddress: '196.25.255.123',
    location: 'Cape Town, South Africa',
    device: 'Chrome on Windows',
    status: 'success'
  },
  {
    id: '6',
    type: 'SESSION_LOGOUT',
    timestamp: '2024-01-08T17:00:00.000Z',
    ipAddress: '196.25.255.123',
    location: 'Cape Town, South Africa',
    device: 'Chrome on Windows',
    status: 'success'
  },
  {
    id: '7',
    type: 'OTP_VERIFICATION',
    timestamp: '2024-01-08T14:30:00.000Z',
    ipAddress: '196.25.255.123',
    location: 'Cape Town, South Africa',
    device: 'Chrome on Windows',
    status: 'failed',
    reason: 'Invalid OTP'
  },
  {
    id: '8',
    type: 'LOGIN',
    timestamp: '2024-01-08T14:28:00.000Z',
    ipAddress: '196.25.255.123',
    location: 'Cape Town, South Africa',
    device: 'Chrome on Windows',
    status: 'success'
  }
];