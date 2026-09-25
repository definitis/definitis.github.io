import React from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft } from "lucide-react";
import { EXPERIENCE } from "./data";
import { Navbar } from "./Navbar";
import { Reveal } from "./Reveal";
import "./index.css";

function ExperiencePage() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#111111] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-300 dark:selection:bg-zinc-700 pb-28">
      <Navbar current="experience" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 flex flex-col gap-12 sm:gap-14">
        
        {/* Header as in Screenshot 1 */}
        <Reveal delay={40} y={16}>
          <header className="flex flex-col gap-3">
            <a 
              href="/" 
              className="hover:text-zinc-900 dark:hover:text-white inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400 transition-colors mb-2 py-1 touch-manipulation"
            >
              <ArrowLeft size={14} /> На главную
            </a>
            <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-zinc-900 dark:text-white">
              Опыт работы
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
              Где я работал и какими задачами занимался.
            </p>
          </header>
        </Reveal>

        {/* Timeline as in Screenshot 1 */}
        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-2 sm:ml-3 pl-6 sm:pl-8 space-y-14">
          {EXPERIENCE.map((item, idx) => (
            <Reveal key={idx} delay={idx * 90} y={20}>
              <article className="relative group">
                {/* Timeline white circle dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-900 dark:bg-white ring-4 ring-[#F9F9F9] dark:ring-[#111111]" />

                {/* Date */}
                <div className="text-xs sm:text-sm font-mono text-zinc-400 dark:text-zinc-500 mb-1.5">
                  {item.period}
                </div>

                {/* Role */}
                <h2 className="text-lg sm:text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
                  {item.role}
                </h2>

                {/* Company & Format */}
                <div className="text-sm font-normal text-zinc-700 dark:text-zinc-300 mt-0.5">
                  {item.company}
                </div>
                <div className="text-xs text-zinc-400 dark:text-zinc-500 mb-4">
                  {item.location}
                </div>

                {/* Bullet points */}
                <ul className="space-y-2.5 text-sm sm:text-[15px] text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed">
                  {item.highlights.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <span className="text-zinc-400 dark:text-zinc-500 select-none">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<ExperiencePage />);
