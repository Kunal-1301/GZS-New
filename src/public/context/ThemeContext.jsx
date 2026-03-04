import { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * ThemeContext
 * ────────────
 * Manages the active CSS theme class on <html>, allowing pages to
 * call setThemeVariant('esports') and have the right --theme-*
 * variables activate automatically.
 *
 * The theme class is applied to document.documentElement so that
 * all CSS variables from theme.css resolve correctly without
 * manual DOM manipulation in each page.
 *
 * Usage:
 *   const { setThemeVariant, resetTheme, currentTheme } = useTheme();
 *   setThemeVariant('esports');  // applies .theme-esports on <html>
 *   resetTheme();                // removes theme class
 */

const THEME_CLASSES = [
  'theme-esports',
  'theme-blog',
  'theme-about',
  'theme-auth',
  'theme-profile',
  'theme-contact',
  'theme-admin',
  'theme-collection',
  'theme-gamepost',
];

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(null);

  // Apply the theme class to <html> whenever it changes
  useEffect(() => {
    const root = document.documentElement;

    // Remove all theme classes first
    THEME_CLASSES.forEach(cls => root.classList.remove(cls));

    // Apply the new theme class
    if (currentTheme) {
      const className = `theme-${currentTheme}`;
      if (THEME_CLASSES.includes(className)) {
        root.classList.add(className);
      }
    }

    return () => {
      // Cleanup on unmount
      THEME_CLASSES.forEach(cls => root.classList.remove(cls));
    };
  }, [currentTheme]);

  const setThemeVariant = useCallback((variant) => {
    setCurrentTheme(variant || null);
  }, []);

  const resetTheme = useCallback(() => {
    setCurrentTheme(null);
  }, []);

  const value = {
    currentTheme,
    setThemeVariant,
    resetTheme,
    themeClass: currentTheme ? `theme-${currentTheme}` : '',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * usePageTheme — convenience hook for page-level components.
 * Sets the theme on mount, resets on unmount.
 *
 * Usage:
 *   usePageTheme('esports');   // inside EsportsHome component body
 */
export function usePageTheme(variant) {
  const { setThemeVariant, resetTheme } = useTheme();

  useEffect(() => {
    setThemeVariant(variant);
    return () => resetTheme();
  }, [variant, setThemeVariant, resetTheme]);
}

export default ThemeContext;
