import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { PROJECTS, Project } from "./data";
import { Navbar } from "./Navbar";
import { ProjectDetailsModal } from "./ProjectDetailsModal";
import "./index.css";

function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#111111] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-300 dark:selection:bg-zinc-700 pb-24">
      <Navbar current="projects" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8 flex flex-col gap-10 sm:gap-12">
        
        {/* Header */}
        <header className="flex flex-col gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-6 sm:pb-8">
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-2">
            <a href="/" className="hover:text-zinc-900 dark:hover:text-white inline-flex items-center gap-1 transition-colors py-1 touch-manipulation">
              <ArrowLeft size={15} /> Главная
            </a>
            <span>/</span>
            <span className="text-zinc-900 dark:text-white font-medium">Проекты</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Проекты
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
            Разработка прикладных систем, автоматизация рутинных процессов, Telegram-боты и сервисы на Python.
          </p>
        </header>

        {/* Project List */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {PROJECTS.map((project, idx) => {
            const hasLink = Boolean(project.link);
            return (
              <article 
                key={idx} 
                onClick={!hasLink ? () => setSelectedProject(project) : undefined}
                className={`p-5 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#151515] transition-all shadow-sm ${
                  !hasLink 
                    ? "cursor-pointer group hover:border-amber-500/40 dark:hover:border-amber-500/30" 
                    : "hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
                role={!hasLink ? "button" : undefined}
                tabIndex={!hasLink ? 0 : undefined}
                onKeyDown={!hasLink ? (e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                } : undefined}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h2 className={`text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2 ${
                    !hasLink ? "group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors" : ""
                  }`}>
                    {project.title}
                  </h2>
                  {hasLink ? (
                    <a 
                      href={project.link!} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <Github size={16} /> Исходный код <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 self-start sm:self-auto">
                      Приватный репозиторий
                    </span>
                  )}
                </div>

                <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 mb-6 font-normal">
                  {project.description}
                </p>

                <div className="flex flex-col gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Стек технологий
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/60 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-6 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Больше учебных репозиториев и сниппетов доступно в моем{" "}
          <a href="https://github.com/definitis" target="_blank" rel="noreferrer" className="text-zinc-900 dark:text-white font-medium underline">
            GitHub профиле
          </a>.
        </div>

      </main>

      {/* Project Details Modal for closed/private projects */}
      <ProjectDetailsModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<ProjectsPage />);
