import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

// Define your custom themes
const LightTheme = {
  isDark: false,
  colors: {
    background: '#fefefe',
    text: '#000000',
  },
};

const DarkTheme = {
  isDark: true,
  colors: {
    background: '#000000',
    text: '#ffffff',
  },
};

const ThemeContext = createContext({
  theme: LightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: any) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(
    systemColorScheme === 'dark' ? DarkTheme : LightTheme
  );

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('userTheme');
      if (savedTheme) {
        setTheme(savedTheme === 'dark' ? DarkTheme : LightTheme);
      } else {
        setTheme(systemColorScheme === 'dark' ? DarkTheme : LightTheme);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === DarkTheme ? LightTheme : DarkTheme;
    setTheme(newTheme);
    await AsyncStorage.setItem('userTheme', newTheme.isDark ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
