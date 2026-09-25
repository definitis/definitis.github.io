import { createRoot } from "react-dom/client";
import { ArrowLeft, Download, Github, Mail, Send } from "lucide-react";
import { EDUCATION, EXPERIENCE, SKILLS, PROJECTS } from "./data";
import "./index.css";

function ResumePage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#111] text-zinc-900 dark:text-zinc-200">
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-16">
        <div className="mb-10 flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">
            <ArrowLeft size={16} />
            Вернуться в портфолио
          </a>
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">CV 2026</span>
        </div>

        <section className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 md:p-12">
          
          <div className="flex flex-col md:flex-row justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">Виктор Тимушев</h1>
              <p className="mt-2 text-lg text-zinc-700 dark:text-zinc-300">Backend-разработчик</p>
              <p className="text-sm text-zinc-500 mt-1">Автоматизация бизнес-процессов · Python · Интеграции</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <a href="mailto:wannaverysleep@gmail.com" className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white"><Mail size={16}/> wannaverysleep@gmail.com</a>
                <a href="https://t.me/xttxxtt" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white"><Send size={16}/> @xttxxtt</a>
                <a href="https://github.com/definitis" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white"><Github size={16}/> github.com/definitis</a>
              </div>
              <a 
                href="/resume/viktor-timushev-internship-resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black px-4 py-2 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs"
              >
                <Download size={14} /> Открыть официальный PDF
              </a>
            </div>
          </div>

          <div className="space-y-12">
            
            <section>
              <h2 className="text-xs font-semibold tracking-widest text-zinc-900 dark:text-white uppercase mb-4">Опыт работы</h2>
              <div className="space-y-6">
                {EXPERIENCE.map((item) => (
                  <article key={item.company}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold text-zinc-900 dark:text-white">{item.company} — {item.role}</h3>
                      <span className="text-sm text-zinc-500">{item.period}</span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xs font-semibold tracking-widest text-zinc-900 dark:text-white uppercase mb-4">Проекты</h2>
              <div className="space-y-6">
                {PROJECTS.map((project) => (
                  <article key={project.title}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold text-zinc-900 dark:text-white">{project.title}</h3>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-2">
                      {project.description}
                    </p>
                    <p className="text-xs text-zinc-500 font-mono">
                      Стек: {project.stack.join(", ")}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xs font-semibold tracking-widest text-zinc-900 dark:text-white uppercase mb-4">Образование и достижения</h2>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                {EDUCATION.map((edu) => (
                  <li key={edu} className="flex gap-2"><span className="text-zinc-300 dark:text-zinc-700">—</span> {edu}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xs font-semibold tracking-widest text-zinc-900 dark:text-white uppercase mb-4">Навыки</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-mono leading-relaxed">
                {SKILLS.join(", ")}
              </p>
            </section>

          </div>
        </section>

      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<ResumePage />);
