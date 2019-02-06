import React from 'react';

// Create context to hold themes
const ThemeContext = React.createContext({});
export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;
