import React from "react";
import { Lock, Eye, ExternalLink, Code2, AlertTriangle, ArrowRight } from "lucide-react";
import { Project } from "../types";
import { motion } from "motion/react";

interface ProjectCardProps {
  key?: React.Key;
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const isFeatured = project.id === "visabot";

  // Dynamic status badges
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Paused":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "In Development":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Frozen":
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
      default:
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
    }
  };

  return (
    <motion.div
      layout
      id={`project-card-${project.id}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onOpenDetails(project)}
      className={`group relative rounded-xl border border-white/10 bg-slate-950/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 cursor-pointer select-none ${
        isFeatured ? "md:col-span-2" : ""
      }`}
    >
      {/* Background Hover Hover Glow Overlay */}
      <div 
        id={`card-glow-${project.id}`}
        className="absolute -inset-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" 
      />

      <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
        {/* Card Header Info */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-mono tracking-widest uppercase text-zinc-400 px-2 py-0.5 rounded-md bg-white/5 border border-white/5`}>
              {project.category}
            </span>
          </div>
          <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${getStatusStyle(project.status)}`}>
            {project.status === "Paused" && "Приостановлен"}
            {project.status === "Active" && "Активен"}
            {project.status === "In Development" && "В разработке"}
            {project.status === "Frozen" && "Заморожен"}
            {project.status === "Completed" && "Завершен"}
          </span>
        </div>

        {/* Title and Short Description */}
        <h3 className="text-xl md:text-2xl font-semibold text-zinc-100 tracking-tight group-hover:text-white transition-colors">
          {project.title}
        </h3>

        <p className="mt-3 text-zinc-400 text-sm leading-relaxed grow">
          {project.description}
        </p>

        {/* Featured Project Extra Meta Specs */}
        {isFeatured && (
          <div className="my-5 p-4 rounded-lg bg-zinc-900/50 border border-white/5">
            <h4 className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-widest mb-1.5 matches-glow">
              Бизнес-эффект
            </h4>
            <p className="text-sm font-medium text-emerald-400">
              {project.revenue}
            </p>
          </div>
        )}

        {/* Result summary if available & not featured */}
        {!isFeatured && project.result && (
          <div className="my-4 text-xs font-medium text-emerald-400/90 bg-emerald-500/[0.03] border border-emerald-500/10 rounded px-2.5 py-1.5 self-start">
            🚀 {project.result}
          </div>
        )}

        {/* Tech Stack Preview */}
        <div className="flex flex-wrap gap-1.5 my-4">
          {project.stack.map((tech, idx) => (
            <span
              key={idx}
              className="text-xs font-mono text-indigo-300 bg-indigo-500/5 border border-indigo-500/10 px-2 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions bar */}
        <div className="border-t border-white/5 pt-4 mt-auto flex items-center justify-between">
          <button
            onClick={() => onOpenDetails(project)}
            className="cursor-pointer group/btn inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-indigo-400 transition-colors"
          >
            <span>Технические детали</span>
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center gap-2">
            {project.isPrivate ? (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold text-amber-500 bg-amber-500/5 border border-amber-500/10 px-2 py-1 rounded">
                <Lock size={10} />
                Private Project
              </span>
            ) : (
              project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-pointer inline-flex items-center gap-1 text-[11px] font-mono text-indigo-400 hover:text-indigo-300 hover:underline"
                >
                  <Code2 size={12} />
                  GitHub
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
