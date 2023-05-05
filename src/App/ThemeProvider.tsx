import React, { createContext, useState } from "react";

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  backgroundColor: string;
  textColor: string;
}

export const lightTheme: Theme = {
  primary: "#007bff",
  secondary: "#6c757d",
  background: "#f8f9fa",
  text: "#343a40",
  backgroundColor: "#fff",
  textColor: "#212529",
};

export const darkTheme: Theme = {
  primary: "#007bff",
  secondary: "#6c757d",
  background: "#343a40",
  text: "#f8f9fa",
  backgroundColor: "#343a40",
  textColor: "#f8f9fa",
};

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
