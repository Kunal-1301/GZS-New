import { createContext, useContext, useState } from 'react';

// Theme variants
const themes = {
  default: {
    name: 'default',
    // Primary colors (Yellow theme for Blog)
    primaryColor: '#facc15',
    accentColor: '#facc15',
    
    // Background tones
    bgPage: '#FEF9E7',
    bgPrimary: '#FFFDF5',
    bgSecondary: '#FEF9E7',
    bgSurface: '#FFFFFF',
    
    // Text colors
    textPrimary: '#171717',
    textSecondary: '#525252',
    textMuted: '#737373',
    
    // Button colors
    btnPrimary: '#facc15',
    btnPrimaryHover: '#eab308',
    btnText: '#FFFFFF',
  },
  esports: {
    name: 'esports',
    // Primary colors (Green theme for Esports)
    primaryColor: '#4CAF50',
    accentColor: '#4CAF50',
    
    // Background tones (green gradient)
    bgPage: 'linear-gradient(180deg, #E8F5E9 0%, #C8E6C9 50%, #A5D6A7 100%)',
    bgPrimary: '#E8F5E9',
    bgSecondary: '#C8E6C9',
    bgSurface: '#FFFFFF',
    
    // Text colors
    textPrimary: '#1B5E20',
    textSecondary: '#2E7D32',
    textMuted: '#4CAF50',
    
    // Button colors
    btnPrimary: '#4CAF50',
    btnPrimaryHover: '#388E3C',
    btnText: '#FFFFFF',
  },
};

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('default');

  // Get current theme object
  const theme = themes[currentTheme] || themes.default;

  // Switch theme variant
  const setThemeVariant = (variant) => {
    if (themes[variant]) {
      setCurrentTheme(variant);
    }
  };

  // Reset to default theme
  const resetTheme = () => {
    setCurrentTheme('default');
  };

  const value = {
    theme,
    currentTheme,
    setThemeVariant,
    resetTheme,
    themes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
