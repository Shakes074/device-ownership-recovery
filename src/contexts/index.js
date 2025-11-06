export { ThemeProvider, useTheme } from './ThemeContext';
export { AuthProvider, useAuth } from './AuthContext';
export { DevicesProvider, useDevices } from './DevicesContext';
export { ChildrenProvider, useChildren } from './ChildrenContext';

import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from './AuthContext';
import { DevicesProvider } from './DevicesContext';
import { ChildrenProvider } from './ChildrenContext';

export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DevicesProvider>
          <ChildrenProvider>
            {children}
          </ChildrenProvider>
        </DevicesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};