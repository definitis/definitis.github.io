import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

interface NavbarProps {
  current?: "home" | "experience" | "projects" | "technologies" | "education" | "resume";
}

export function Navbar({ current = "home" }: NavbarProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    setIsDark(isCurrentlyDark);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);

    if (nextIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const linkClass = (page: string) => {
    const isActive = current === page;
    return `inline-flex items-center transition-colors text-xs sm:text-sm font-medium py-1.5 px-0.5 sm:px-1 whitespace-nowrap touch-manipulation ${
      isActive
        ? "text-zinc-900 dark:text-white font-semibold"
        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white active:text-zinc-900 dark:active:text-white"
    }`;
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#F9F9F9]/85 dark:bg-[#111111]/85 border-b border-zinc-200/60 dark:border-zinc-800/60 transition-colors">
      <nav className="max-w-3xl mx-auto px-4 sm:px-6 py-2.5 sm:py-4 flex items-center justify-between">
        <a 
          href="/" 
          className="font-bold tracking-widest text-base sm:text-lg text-zinc-900 dark:text-white hover:opacity-80 transition-opacity pr-2 py-1 touch-manipulation"
        >
          VT
        </a>
        <div className="flex items-center gap-2 sm:gap-6">
          <a href="/experience/index.html" className={linkClass("experience")}>
            Опыт
          </a>
          <a href="/projects/index.html" className={linkClass("projects")}>
            Проекты
          </a>
          <a href="/technologies/index.html" className={linkClass("technologies")}>
            Стек
          </a>
          <a href="/education/index.html" className={linkClass("education")}>
            Образование
          </a>
          <div className="w-px h-3.5 sm:h-4 bg-zinc-300 dark:bg-zinc-800 mx-0.5 sm:mx-0 shrink-0"></div>
          <button
            onClick={toggleTheme}
            aria-label="Переключить тему"
            title={isDark ? "Темная тема активна" : "Светлая тема активна"}
            className="p-2 sm:p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer shrink-0 touch-manipulation active:scale-90"
          >
            {isDark ? <Moon size={17} /> : <Sun size={17} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
