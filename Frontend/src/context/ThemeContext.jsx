import { createContext, useState, useEffect, useContext } from "react";

/**
 * ThemeContext
 * ------------
 * Manages dark/light mode across the entire app.
 * - Reads saved theme from localStorage on first load
 * - Defaults to "dark" mode if nothing is saved
 * - Adds/removes the "dark" class on the <html> element
 *   (this is how Tailwind's dark: variants work)
 */

// Create the context object
const ThemeContext = createContext();

// Custom hook — use this in any component to access theme
export function useTheme() {
  return useContext(ThemeContext);
}

// Provider component — wrap your app with this
export function ThemeProvider({ children }) {
  // Initialize theme from localStorage, default to "dark"
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("reforgeai-theme");
    return saved || "dark";
  });

  // Every time theme changes, update the <html> class and localStorage
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Save to localStorage so it persists across page reloads
    localStorage.setItem("reforgeai-theme", theme);
  }, [theme]);

  // Toggle between dark and light
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
