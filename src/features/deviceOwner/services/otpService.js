// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock OTP storage and attempt tracking
const otpAttempts = new Map();
const MAX_ATTEMPTS = 3;
const BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

const isBlocked = (phone) => {
  const attempts = otpAttempts.get(phone);
  if (!attempts) return false;

  if (attempts.count >= MAX_ATTEMPTS && 
      Date.now() - attempts.lastAttempt < BLOCK_DURATION) {
    return true;
  }

  // Reset if block duration has passed
  if (Date.now() - attempts.lastAttempt >= BLOCK_DURATION) {
    otpAttempts.delete(phone);
    return false;
  }

  return false;
};

const recordAttempt = (phone) => {
  const attempts = otpAttempts.get(phone) || { count: 0, lastAttempt: 0 };
  attempts.count += 1;
  attempts.lastAttempt = Date.now();
  otpAttempts.set(phone, attempts);
};

export const mockOtpService = {
  async generateOTP(phone) {
    await delay();

    if (isBlocked(phone)) {
      const attempts = otpAttempts.get(phone);
      const remainingTime = Math.ceil(
        (BLOCK_DURATION - (Date.now() - attempts.lastAttempt)) / 1000 / 60
      );
      throw new Error(
        `Too many attempts. Please try again in ${remainingTime} minutes.`
      );
    }

    // In a real app, this would generate and send a real OTP
    // For demo purposes, we'll always use '123456'
    return {
      success: true,
      message: 'OTP sent successfully',
      remainingAttempts: MAX_ATTEMPTS - (otpAttempts.get(phone)?.count || 0)
    };
  },

  async verifyOTP(phone, code) {
    await delay();

    if (isBlocked(phone)) {
      const attempts = otpAttempts.get(phone);
      const remainingTime = Math.ceil(
        (BLOCK_DURATION - (Date.now() - attempts.lastAttempt)) / 1000 / 60
      );
      throw new Error(
        `Too many attempts. Please try again in ${remainingTime} minutes.`
      );
    }

    // For demo purposes, accept '123456' as valid OTP
    if (code !== '123456') {
      recordAttempt(phone);
      const remainingAttempts = MAX_ATTEMPTS - otpAttempts.get(phone).count;

      if (remainingAttempts <= 0) {
        throw new Error(
          `Too many attempts. Please try again in 15 minutes.`
        );
      }

      throw new Error(
        `Invalid OTP. ${remainingAttempts} attempts remaining.`
      );
    }

    // Reset attempts on successful verification
    otpAttempts.delete(phone);

    return { success: true };
  },

  async resendOTP(phone) {
    await delay();

    if (isBlocked(phone)) {
      const attempts = otpAttempts.get(phone);
      const remainingTime = Math.ceil(
        (BLOCK_DURATION - (Date.now() - attempts.lastAttempt)) / 1000 / 60
      );
      throw new Error(
        `Too many attempts. Please try again in ${remainingTime} minutes.`
      );
    }

    // In a real app, this would generate and send a new OTP
    // For demo purposes, keep using '123456'
    return {
      success: true,
      message: 'New OTP sent successfully',
      remainingAttempts: MAX_ATTEMPTS - (otpAttempts.get(phone)?.count || 0)
    };
  }
};