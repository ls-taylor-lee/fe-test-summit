"use client";

import classNames from "classnames";
import { useDarkMode } from "MyApp/hooks/useDarkMode";
import { ReactNode } from "react";

export default function DarkModeProvider({ children }: { children: ReactNode }) {
  const { isDarkMode } = useDarkMode();

  return (
    <div id="main-content" className={classNames({ dark: isDarkMode }, "w-screen h-screen bg-white dark:bg-black")}>
      {children}
    </div>
  );
}
