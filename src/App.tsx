import React, { useState } from "react";
import { 
  Terminal as TerminalIcon, 
  User, 
  FolderGit2, 
  Globe, 
  Send, 
  Github, 
  Mail, 
  Copy, 
  Check, 
  Code2, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GridBackground } from "./components/GridBackground";
import { Terminal } from "./components/Terminal";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectDetailsModal } from "./components/ProjectDetailsModal";
import { WebPreviewCard } from "./components/WebPreviewCard";
import { PROJECTS, WEB_PROJECTS, SKILLS_LIST } from "./data";
import { Project } from "./types";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "automation" | "backend" | "tool">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Contacts clipboard states
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTelegram, setCopiedTelegram] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("wannaverysleep@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyTelegram = () => {
    navigator.clipboard.writeText("@xttxxtt");
    setCopiedTelegram(true);
    setTimeout(() => setCopiedTelegram(false), 2500);
  };

  // Filtering projects
  const filteredProjects = selectedCategory === "all" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === selectedCategory);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen text-zinc-100 font-sans relative selection:bg-indigo-500/30 selection:text-white pb-12">
      <GridBackground />

      {/* FIXED FLOATING NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0B10]/70 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cursor-pointer flex items-center gap-2 font-mono text-sm tracking-wider font-bold group"
          >
            <span className="text-indigo-400 font-semibold group-hover:text-indigo-300 transition-colors">&lt;</span>
            <span className="text-white">DEV_PORTFOLIO</span>
            <span className="text-indigo-400 font-semibold group-hover:text-indigo-300 transition-colors">/&gt;</span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <button 
              onClick={() => scrollToSection("hero")} 
              className="cursor-pointer hover:text-white transition-colors"
            >
              Главная
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className="cursor-pointer hover:text-white transition-colors"
            >
              Обо мне
            </button>
            <button 
              onClick={() => scrollToSection("projects")} 
              className="cursor-pointer hover:text-white transition-colors"
            >
              Проекты
            </button>
            <button 
              onClick={() => scrollToSection("websites")} 
              className="cursor-pointer hover:text-white transition-colors"
            >
              Веб-разработка
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="cursor-pointer hover:text-white transition-colors"
            >
              Контакты
            </button>
          </nav>

          {/* Contact Fast Access Pill */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection("contact")}
              className="cursor-pointer text-xs md:text-sm font-semibold text-white bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-1.5 rounded-full border border-indigo-500/25 transition-all shadow-md shadow-indigo-950/20"
            >
              Связаться
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section 
        id="hero" 
        className="pt-28 md:pt-40 pb-16 min-h-[90vh] flex items-center max-w-7xl mx-auto px-4 md:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Hero Left Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-300 font-mono font-medium self-start mb-6"
            >
              <Sparkles size={12} className="text-indigo-400 shrink-0" />
              <span>РАЗРАБОТКА И АВТОМАТИЗАЦИЯ СЕРВИСОВ</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
                Python Automation & Backend Developer
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base md:text-lg text-zinc-400 leading-relaxed max-w-xl"
            >
              Разрабатываю автоматизацию, Telegram-ботов, backend-инструменты и системы, 
              которые заменяют ручную работу и экономят ваше время. Специализируюсь на 
              отказоустойчивых фоновых процессах и парсинге сложных данных.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4 items-center"
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="cursor-pointer px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg hover:shadow-indigo-500/10 border border-white/10 flex items-center gap-2"
              >
                <span>Посмотреть проекты</span>
                <ChevronRight size={16} />
              </button>

              <a
                href="https://github.com/definitis"
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer px-6 py-3 rounded-xl font-medium bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5 hover:border-white/10 flex items-center gap-2"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
            </motion.div>
          </div>

          {/* Hero Right Interactive Terminal Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <Terminal />
          </motion.div>

        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section 
        id="about" 
        className="py-20 bg-slate-950/20 border-t border-b border-white/5 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-indigo-400 uppercase">
                <User size={14} className="shrink-0" />
                <span>ОБО МНЕ & ФИЛОСОФИЯ</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Инструменты для освобождения вашего времени
              </h2>
              <p className="text-base text-zinc-400 leading-relaxed">
                Специализируюсь на автоматизации процессов, Telegram-ботах, парсинге, 
                browser automation и backend-разработке. Большая часть моих проектов направлена 
                на устранение ручной работы, ускорение рутинных процедур и создание автономных систем.
              </p>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Я не считаю, что всё должно быть сделано вручную. Если процесс можно описать алгоритмом, 
                он должен работать автономно в облаке или на локальном сервере, освобождая человека от 
                монотонных кликов по сайтам и ручной сверки файлов Excel.
              </p>

              {/* Status card */}
              <div className="p-4 rounded-xl border border-indigo-500/10 bg-indigo-500/[0.02] flex items-center gap-3.5">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <div className="text-xs">
                  <p className="font-semibold text-zinc-200">Открыт для новых проектов</p>
                  <p className="text-zinc-400 mt-0.5">Разработка ботов, скриптов автоматизации, интеграции с внешними API</p>
                </div>
              </div>
            </div>

            {/* Right Tech Skills Badges Grid */}
            <div className="lg:col-span-6 p-6 rounded-2xl border border-white/10 bg-[#0E1017]/40 backdrop-blur-sm">
              <h3 className="text-sm font-mono tracking-widest text-zinc-300 uppercase mb-4">
                Технические навыки / Стек:
              </h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS_LIST.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs md:text-sm font-mono text-indigo-300 bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/15 transition-colors px-3 py-1.5 rounded-lg select-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Minimal Code Editor snippet mock */}
              <div className="mt-8 border-t border-white/5 pt-6 text-left font-mono text-[11px] text-zinc-500">
                <p className="text-zinc-400 hover:text-zinc-300 duration-150 mb-1"># Развёртывание процессов</p>
                <div className="bg-black/20 p-3 rounded-lg border border-white/5 text-indigo-300">
                  <p><span className="text-purple-400">git clone</span> https://github.com/definitis/automation</p>
                  <p><span className="text-[#D4AF37]">pip install</span> -r requirements.txt</p>
                  <p><span className="text-emerald-400">python</span> -m app.main <span className="text-zinc-500">--env=production</span></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE PROJECTS SECTION */}
      <section 
        id="projects" 
        className="py-20 max-w-7xl mx-auto px-4 md:px-8 scroll-mt-20"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-indigo-400 uppercase mb-3">
              <FolderGit2 size={14} className="shrink-0" />
              <span>ГЛАВНЫЙ БЛОК ПРОЕКТОВ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Разработанные системы
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 mt-2 max-w-xl">
              Нажмите на «Технические детали» у любой карточки, чтобы посмотреть углублённую спецификацию архитектуры, интеграций и инфраструктуры.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl self-start">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`cursor-pointer px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === "all" ? "bg-indigo-600 text-white font-medium" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Все
            </button>
            <button
              onClick={() => setSelectedCategory("automation")}
              className={`cursor-pointer px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === "automation" ? "bg-indigo-600 text-white font-medium" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Автоматизация
            </button>
            <button
              onClick={() => setSelectedCategory("backend")}
              className={`cursor-pointer px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === "backend" ? "bg-indigo-600 text-white font-medium" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Бэкенд
            </button>
            <button
              onClick={() => setSelectedCategory("tool")}
              className={`cursor-pointer px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === "tool" ? "bg-indigo-600 text-white font-medium" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Утилиты
            </button>
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <motion.div layout="position" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onOpenDetails={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* WEBSITES SECTION */}
      <section 
        id="websites" 
        className="py-20 bg-slate-950/20 border-t border-white/5 scroll-mt-20 text-left"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#9333EA] uppercase mb-3">
              <Globe size={14} className="shrink-0" />
              <span>WEB PROJECTS / ФРОНТЕНД</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
               Веб-проекты & Лендинги
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl">
              Разработка интерактивных фронтенд-интерфейсов. Ниже представлены прототипы и визуальные демонстрации проектов.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {WEB_PROJECTS.map((wp) => (
              <WebPreviewCard key={wp.id} webProject={wp} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS / FOOTER SECTION */}
      <section 
        id="contact" 
        className="py-16 md:py-24 max-w-4xl mx-auto px-4 text-center scroll-mt-20"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-300 font-mono font-medium mb-6">
          <Briefcase size={12} className="text-emerald-400" />
          <span>ДАВАЙТЕ НАЧНЕМ СОТРУДНИЧЕСТВО</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Давайте автоматизируем ваши рутинные процессы
        </h2>
        <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto mb-12">
          Напишите мне для обсуждения вашего ТЗ на разработку ботов, скриптов сбора данных, 
          отказоустойчивых API или интеграции бизнес-систем с Google API / CRM или для других задач.
        </p>

        {/* Elegant Contacts Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-12">
          {/* Telegram Channel / direct */}
          <div className="bg-[#0E1017]/50 border border-white/10 rounded-xl p-5 hover:border-indigo-500/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                <Send size={18} />
              </div>
              <button 
                onClick={handleCopyTelegram}
                className="cursor-pointer text-zinc-500 hover:text-zinc-300 font-mono text-[10px] flex items-center gap-1 bg-white/5 border border-white/5 px-2 py-0.5 rounded transition-all"
              >
                {copiedTelegram ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                <span>{copiedTelegram ? "Скопировано" : "Copy"}</span>
              </button>
            </div>
            <p className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">TELEGRAM DIRECT</p>
            <a 
              href="https://t.me/xttxxtt" 
              target="_blank" 
              rel="noreferrer" 
              className="mt-1 text-sm font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors inline-flex items-center gap-1"
            >
              <span>@xttxxtt</span>
              <ArrowUpRight size={12} />
            </a>
          </div>

          {/* GitHub links */}
          <div className="bg-[#0E1017]/50 border border-white/10 rounded-xl p-5 hover:border-indigo-500/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                <Github size={18} />
              </div>
              <span className="text-[9px] font-mono text-indigo-400/80 bg-indigo-500/5 px-2 py-0.5 rounded">
                Active
              </span>
            </div>
            <p className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">GITHUB PROFILE</p>
            <a 
              href="https://github.com/definitis" 
              target="_blank" 
              rel="noreferrer" 
              className="mt-1 text-sm font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors inline-flex items-center gap-1"
            >
              <span>github.com/definitis</span>
              <ArrowUpRight size={12} />
            </a>
          </div>

          {/* Business email */}
          <div className="bg-[#0E1017]/50 border border-white/10 rounded-xl p-5 hover:border-indigo-500/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                <Mail size={18} />
              </div>
              <button 
                onClick={handleCopyEmail}
                className="cursor-pointer text-zinc-500 hover:text-zinc-300 font-mono text-[10px] flex items-center gap-1 bg-white/5 border border-white/5 px-2 py-0.5 rounded transition-all"
              >
                {copiedEmail ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                <span>{copiedEmail ? "Скопировано" : "Copy"}</span>
              </button>
            </div>
            <p className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">BUSINESS MAIL</p>
            <button 
              onClick={handleCopyEmail}
              className="cursor-pointer mt-1 text-sm font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors text-left"
            >
              wannaverysleep@gmail.com
            </button>
          </div>
        </div>

        {/* Bottom subtle copyright information */}
        <div className="border-t border-white/5 pt-8 text-xs font-mono text-zinc-600 flex flex-wrap items-center justify-between gap-4">
          <p>© 2026. All server pipelines are protected.</p>
        </div>
      </section>

      {/* CORE SPECIFICATIONS DETAIL MODAL POPUP */}
      <ProjectDetailsModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}
