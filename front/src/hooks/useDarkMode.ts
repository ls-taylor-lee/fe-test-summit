import { useState } from "react";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const htmlElement = document.getElementById("main-content");
    if (isDarkMode) {
      htmlElement?.classList.remove("dark");
    } else {
      htmlElement?.classList.add("dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return { isDarkMode, toggleDarkMode };
}
