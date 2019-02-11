import React from 'react';

// Create context
const ThemeContext = React.createContext({
  activeTheme: 'primary-light'
});
export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;
