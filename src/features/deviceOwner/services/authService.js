// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user storage
let mockUsers = new Map();

export const mockAuthService = {
  async login(email, password) {
    await delay();
    const user = Array.from(mockUsers.values()).find(u => u.email === email);
    
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword };
  },

  async register(userData) {
    await delay();
    if (Array.from(mockUsers.values()).some(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };

    mockUsers.set(newUser.id, newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword };
  },

  async sendOTP(phone) {
    await delay();
    // In a real app, this would send an actual OTP
    // For demo purposes, always use '123456'
    return { success: true, message: 'OTP sent successfully' };
  },

  async verifyOTP(phone, code) {
    await delay();
    // For demo purposes, accept '123456' as valid OTP
    if (code !== '123456') {
      throw new Error('Invalid OTP');
    }
    return { success: true };
  },

  async resetPassword(email) {
    await delay();
    const user = Array.from(mockUsers.values()).find(u => u.email === email);
    if (!user) {
      // Don't reveal if email exists
      return { success: true, message: 'If your email exists, you will receive reset instructions' };
    }
    return { success: true, message: 'If your email exists, you will receive reset instructions' };
  },

  async changePassword(userId, oldPassword, newPassword) {
    await delay();
    const user = mockUsers.get(userId);
    if (!user || user.password !== oldPassword) {
      throw new Error('Invalid current password');
    }

    user.password = newPassword;
    user.updatedAt = new Date().toISOString();
    mockUsers.set(userId, user);
    
    return { success: true };
  },

  async updateProfile(userId, updates) {
    await delay();
    const user = mockUsers.get(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    mockUsers.set(userId, updatedUser);
    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  },

  async logout() {
    await delay();
    return { success: true };
  }
};