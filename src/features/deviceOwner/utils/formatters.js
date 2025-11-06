export const formatDate = (date, format = 'medium') => {
  const d = new Date(date);
  
  const options = {
    short: { day: 'numeric', month: 'short', year: 'numeric' },
    medium: { day: 'numeric', month: 'long', year: 'numeric' },
    long: { 
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  };

  return d.toLocaleDateString('en-ZA', options[format]);
};

export const formatRelativeTime = (date) => {
  const now = new Date();
  const then = new Date(date);
  const diffSeconds = Math.floor((now - then) / 1000);

  if (diffSeconds < 60) {
    return 'just now';
  }

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  }

  return formatDate(date, 'short');
};

export const formatPhone = (phone) => {
  if (!phone) return '';
  
  // Format: +27 XX XXX XXXX
  if (phone.startsWith('+27')) {
    return phone.replace(/(\+27)(\d{2})(\d{3})(\d{4})/, '$1 $2 $3 $4');
  }
  
  // Format: 0XX XXX XXXX
  return phone.replace(/^0(\d{2})(\d{3})(\d{4})/, '0$1 $2 $3');
};

export const formatCurrency = (amount, currency = 'ZAR') => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency
  }).format(amount);
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const formatIMEI = (imei) => {
  if (!imei) return '';
  // Format: XX-XXXXXX-XXXXXX-X
  return imei.replace(/(\d{2})(\d{6})(\d{6})(\d{1})/, '$1-$2-$3-$4');
};

export const formatSerialNumber = (serial) => {
  if (!serial) return '';
  // Add spaces every 4 characters for readability
  return serial.replace(/(.{4})/g, '$1 ').trim();
};

export const formatCaseNumber = (caseNumber) => {
  if (!caseNumber) return '';
  // Format: CAS XXX/XX/XXXX
  return caseNumber.replace(/^CAS\s*(\d{3})\/?(\d{2})\/?(\d{4})$/, 'CAS $1/$2/$3');
};