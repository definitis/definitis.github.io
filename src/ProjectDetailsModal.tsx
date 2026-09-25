import React, { useEffect } from "react";
import { 
  X, 
  Lock, 
  Server, 
  Cpu, 
  Layers, 
  Zap, 
  Award, 
  CheckCircle2 
} from "lucide-react";
import { Project } from "./data";

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  useEffect(() => {
    if (!project) return;

    // Prevent background scroll
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#161616] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-5 sm:p-8 flex flex-col gap-6 text-zinc-900 dark:text-zinc-100 transition-all transform animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Header Close button */}
        <button
          onClick={onClose}
          aria-label="Закрыть окно"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer touch-manipulation active:scale-95"
        >
          <X size={18} />
        </button>

        {/* Modal Top Metadata & Title */}
        <div className="flex flex-col gap-2.5 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            {project.category && (
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md">
                {project.category}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
              <Lock size={11} />
              Приватный коммерческий код
            </span>
          </div>

          <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {project.title}
          </h2>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
            {project.stack.map((tech) => (
              <span 
                key={tech}
                className="px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/60 text-xs font-normal text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* System Overview */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-mono font-medium tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
            Обзор системы
          </h3>
          <p className="text-sm sm:text-[15px] font-normal leading-relaxed text-zinc-700 dark:text-zinc-300">
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Technical Specifications Grid */}
        {project.technicalDetails && (
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-mono font-medium tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
              Технические спецификации
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Backend */}
              <div className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-[#121212] flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-200">
                  <Server size={16} className="text-blue-500" />
                  <h4 className="text-xs sm:text-sm font-medium">Backend & База данных</h4>
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-normal">
                  {project.technicalDetails.backend.map((spec, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-blue-500 select-none shrink-0">→</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Automation */}
              <div className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-[#121212] flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-200">
                  <Cpu size={16} className="text-emerald-500" />
                  <h4 className="text-xs sm:text-sm font-medium">Автоматизация & Логика</h4>
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-normal">
                  {project.technicalDetails.automation.map((spec, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-emerald-500 select-none shrink-0">→</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Integrations */}
              <div className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-[#121212] flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-200">
                  <Layers size={16} className="text-sky-500" />
                  <h4 className="text-xs sm:text-sm font-medium">Интеграции & API</h4>
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-normal">
                  {project.technicalDetails.integrations.map((spec, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-sky-500 select-none shrink-0">→</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Infrastructure */}
              <div className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-[#121212] flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-200">
                  <Zap size={16} className="text-amber-500" />
                  <h4 className="text-xs sm:text-sm font-medium">Инфраструктура & Защита</h4>
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-normal">
                  {project.technicalDetails.infrastructure.map((spec, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-amber-500 select-none shrink-0">→</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Architecture & Workflow */}
        {project.technicalDetails?.architectureOverview && (
          <div className="p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#121212] flex flex-col gap-2">
            <h4 className="text-xs font-mono font-medium tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
              Архитектурный подход
            </h4>
            <p className="text-xs sm:text-sm font-normal leading-relaxed text-zinc-700 dark:text-zinc-300">
              {project.technicalDetails.architectureOverview}
            </p>
          </div>
        )}

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-mono font-medium tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
              Ключевые особенности
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-normal">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Business Outcome / Result */}
        {project.result && (
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2.5 text-xs sm:text-sm font-normal text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 border border-emerald-500/15 p-3.5 rounded-xl">
            <Award size={18} className="shrink-0" />
            <div>
              <span className="font-medium">Результат: </span>
              <span>{project.result}</span>
            </div>
          </div>
        )}

        {/* Bottom Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer touch-manipulation active:scale-95"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
