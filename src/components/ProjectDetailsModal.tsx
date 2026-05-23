import React, { useEffect } from "react";
import { X, Server, Zap, Cpu, Link, Award, Code2, Lock, Landmark } from "lucide-react";
import { Project } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  // Setup ESC keyboard listener to close the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        id="modal-root-overlay" 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        {/* Backdrop overlay blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#06070B]/90 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Main Content Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
          className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0E1017] p-6 md:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto custom-scrollbar"
        >
          {/* Top glow flare inside modal */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent pointer-events-none" />

          {/* Header Close button */}
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-4 right-4 p-1.5 rounded-lg border border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>

          {/* Modal Header Title */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                {project.category.toUpperCase()}
              </span>
              {project.isPrivate ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                  <Lock size={10} />
                  Приватный коммерческий код
                </span>
              ) : (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                  Альтруистичный Open Source
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
          </div>

          {/* About project description text */}
          <div className="mb-8">
            <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase mb-2">
              Обзор системы
            </h3>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Core System Specifications Grid (The core prompt request) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Backend specs block */}
            <div className="p-5 rounded-xl border border-white/5 bg-[#0A0C11] hover:border-white/10 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Server size={18} className="text-indigo-400" />
                <h4 className="text-sm font-semibold text-zinc-200">Backend Стек</h4>
              </div>
              <ul className="space-y-2 text-zinc-400 text-xs font-mono">
                {project.technicalDetails.backend.map((spec, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-indigo-500 shrink-0 select-none">→</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Automation specs block */}
            <div className="p-5 rounded-xl border border-white/5 bg-[#0A0C11] hover:border-white/10 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Cpu size={18} className="text-indigo-400" />
                <h4 className="text-sm font-semibold text-zinc-200">Автоматизация & Рантайм</h4>
              </div>
              <ul className="space-y-2 text-zinc-400 text-xs font-mono">
                {project.technicalDetails.automation.map((spec, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-indigo-500 shrink-0 select-none">→</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Integrations specs block */}
            <div className="p-5 rounded-xl border border-white/5 bg-[#0A0C11] hover:border-white/10 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Link size={18} className="text-indigo-400" />
                <h4 className="text-sm font-semibold text-zinc-200">Интеграции & API</h4>
              </div>
              <ul className="space-y-2 text-zinc-400 text-xs font-mono">
                {project.technicalDetails.integrations.map((spec, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-indigo-500 shrink-0 select-none">→</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Infrastructure specs block */}
            <div className="p-5 rounded-xl border border-white/5 bg-[#0A0C11] hover:border-white/10 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={18} className="text-indigo-400" />
                <h4 className="text-sm font-semibold text-zinc-200">Инфраструктура</h4>
              </div>
              <ul className="space-y-2 text-zinc-400 text-xs font-mono">
                {project.technicalDetails.infrastructure.map((spec, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-indigo-500 shrink-0 select-none">→</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Architecture Overview Section */}
          <div className="p-5 rounded-xl border border-indigo-500/10 bg-indigo-500/[0.02] mb-8">
            <h4 className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase mb-2">
              Архитектурный подход & Workflow
            </h4>
            <p className="text-zinc-300 text-xs md:text-sm leading-relaxed font-sans">
              {project.technicalDetails.architectureOverview}
            </p>
          </div>

          {/* Features bullet list info */}
          <div className="mb-6">
            <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase mb-3">
              Ключевые особенности
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-zinc-300">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue or outcome bottom pill if available */}
          {(project.revenue || project.result) && (
            <div className="mt-8 pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Award className="text-emerald-400" size={18} />
                <span className="text-xs text-zinc-400 font-mono">
                  {project.id === "visabot" ? "Бизнес-эффект:" : "Бизнес-эффект / Результат:"}
                </span>
                <span className="text-sm font-semibold text-emerald-400">
                  {project.revenue || project.result}
                </span>
              </div>
              
              {!project.isPrivate && project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer inline-flex items-center gap-2 text-xs font-mono text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition-colors"
                >
                  <Code2 size={14} />
                  Репозиторий на GitHub
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
