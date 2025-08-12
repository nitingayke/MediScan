import React from "react";
import { useThemeContext } from "./context/ThemeContext";

function App() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4">Hey Ujju Bhai</h1>

      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-md bg-blue-500 text-white dark:bg-yellow-500 dark:text-black hover:opacity-80 transition-colors duration-200"
      >
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
}

export default App;
