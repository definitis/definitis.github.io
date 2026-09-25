import React from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "./Navbar";
import { TECH_CATEGORIES, TechBadge } from "./TechBadge";
import "./index.css";

function TechnologiesPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#111111] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-300 dark:selection:bg-zinc-700 pb-24">
      <Navbar current="technologies" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8 flex flex-col gap-10 sm:gap-12">
        
        {/* Header */}
        <header className="flex flex-col gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-6 sm:pb-8">
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-2">
            <a href="/" className="hover:text-zinc-900 dark:hover:text-white inline-flex items-center gap-1 transition-colors py-1 touch-manipulation">
              <ArrowLeft size={15} /> На главную
            </a>
            <span>/</span>
            <span className="text-zinc-900 dark:text-white font-medium">Стек</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Стек технологий
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
            Комплексный перечень языков, фреймворков, баз данных и инфраструктурных инструментов, с которыми я работаю.
          </p>
        </header>

        {/* Categories as in Screenshot 2 */}
        <div className="flex flex-col gap-10">
          {TECH_CATEGORIES.map((cat, idx) => (
            <section 
              key={cat.id} 
              className={`flex flex-col gap-4 ${
                idx !== TECH_CATEGORIES.length - 1 ? "border-b border-zinc-200/80 dark:border-zinc-800/80 pb-10" : ""
              }`}
            >
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {cat.title}
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {cat.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {cat.items.map((tech) => (
                  <TechBadge 
                    key={tech.name} 
                    name={tech.name} 
                    color={tech.color} 
                    iconName={tech.iconName} 
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer info card */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151515] text-sm text-zinc-600 dark:text-zinc-400 flex flex-col gap-2">
          <span className="font-semibold text-zinc-900 dark:text-white">Принцип выбора стека</span>
          <p className="leading-relaxed">
            Применяю технологии под реальную задачу бизнеса, избегая неоправданного усложнения. В приоритете — типобезопасность, стабильность интеграций, обработка краевых случаев и воспроизводимость деплоя через Docker.
          </p>
        </div>

      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<TechnologiesPage />);
