"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useDarkMode } from "MyApp/hooks/useDarkMode";

export default function ThemeToggleButton() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button onClick={(_) => toggleDarkMode()} className="p-2 absolute top-2 right-6">
      {isDarkMode ? <SunIcon width={24} height={24} /> : <MoonIcon width={24} height={24} />}
    </button>
  );
}
