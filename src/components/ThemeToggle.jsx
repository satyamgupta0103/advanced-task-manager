import React, { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme === "dark" ? "dark" : "light"
    );
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="icon-btn"
      aria-label="toggle-theme"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
