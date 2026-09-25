import React from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft, GraduationCap, Award, Wrench } from "lucide-react";
import { EDUCATION, SKILLS } from "./data";
import { Navbar } from "./Navbar";
import "./index.css";

function EducationPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#111111] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-300 dark:selection:bg-zinc-700 pb-28">
      <Navbar current="education" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 flex flex-col gap-10 sm:gap-12">
        
        {/* Header */}
        <header className="flex flex-col gap-3">
          <a 
            href="/" 
            className="hover:text-zinc-900 dark:hover:text-white inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400 transition-colors mb-2 py-1 touch-manipulation"
          >
            <ArrowLeft size={14} /> На главную
          </a>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-zinc-900 dark:text-white">
            Образование
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
            Академическая подготовка в Университете ИТМО и профильные олимпиадные достижения.
          </p>
        </header>

        {/* Education Item */}
        <section className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#151515] shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
              <GraduationCap size={18} />
            </div>
            <h2 className="text-lg sm:text-xl font-medium text-zinc-900 dark:text-white">
              Высшее образование
            </h2>
          </div>

          <div className="border-l border-zinc-200 dark:border-zinc-800 pl-4 ml-1 space-y-2">
            <h3 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-white">
              Университет ИТМО (Санкт-Петербург)
            </h3>
            <p className="text-sm font-normal text-zinc-700 dark:text-zinc-300">
              Факультет информационных технологий и программирования (ФИТиП)
            </p>
            <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
              09.03.02 «Информационные системы и технологии» (Software Engineering) · 2026 — 2030
            </p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed pt-2">
              Фундаментальная подготовка: алгоритмы и структуры данных, операционные системы, архитектура вычислительных систем, сетевые протоколы и реляционные базы данных.
            </p>
          </div>
        </section>

        {/* Olympiads */}
        <section className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#151515] shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
              <Award size={18} />
            </div>
            <h2 className="text-lg sm:text-xl font-medium text-zinc-900 dark:text-white">
              Олимпиады и достижения
            </h2>
          </div>

          <ul className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed">
            {EDUCATION.slice(1).map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<EducationPage />);
