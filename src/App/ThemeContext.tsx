import React from 'react';

interface IThemeContext {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = React.createContext<IThemeContext>({
  darkMode: false,
  toggleDarkMode: () => {},
});
