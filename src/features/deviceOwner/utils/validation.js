// Common validation patterns
const patterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^(?:\+27|0)[1-9][0-9]{8}$/, // South African phone numbers
  imei: /^\d{15}$/, // IMEI is 15 digits
  serialNumber: /^[A-Za-z0-9-]{4,}$/, // At least 4 alphanumeric chars or hyphens
  caseNumber: /^CAS \d{3}\/\d{2}\/\d{4}$/ // Format: CAS 123/01/2024
};

export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  if (!patterns.email.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  return { isValid: true, error: null };
};

export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }
  if (!patterns.phone.test(phone)) {
    return { isValid: false, error: 'Invalid South African phone number. Use format: +27XXXXXXXXX or 0XXXXXXXXX' };
  }
  return { isValid: true, error: null };
};

export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }
  return { isValid: true, error: null };
};

export const validateIMEI = (imei) => {
  if (!imei) {
    return { isValid: false, error: 'IMEI is required' };
  }
  if (!patterns.imei.test(imei)) {
    return { isValid: false, error: 'IMEI must be exactly 15 digits' };
  }
  return { isValid: true, error: null };
};

export const validateSerialNumber = (serial) => {
  if (!serial) {
    return { isValid: false, error: 'Serial number is required' };
  }
  if (!patterns.serialNumber.test(serial)) {
    return { isValid: false, error: 'Invalid serial number format' };
  }
  return { isValid: true, error: null };
};

export const validateFileSize = (file, maxSizeMB) => {
  if (!file) {
    return { isValid: false, error: 'File is required' };
  }
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return { isValid: false, error: `File size must be less than ${maxSizeMB}MB` };
  }
  return { isValid: true, error: null };
};

export const validateFileType = (file, allowedTypes) => {
  if (!file) {
    return { isValid: false, error: 'File is required' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: `File type must be one of: ${allowedTypes.join(', ')}` };
  }
  return { isValid: true, error: null };
};

export const validateCaseNumber = (caseNumber) => {
  if (!caseNumber) {
    return { isValid: false, error: 'Case number is required' };
  }
  if (!patterns.caseNumber.test(caseNumber)) {
    return { isValid: false, error: 'Invalid case number format. Use format: CAS 123/01/2024' };
  }
  return { isValid: true, error: null };
};