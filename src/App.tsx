import React, { useLayoutEffect, useRef, useState } from "react";
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
  Briefcase,
  GraduationCap,
  Trophy,
  Building2,
  Menu,
  X
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { GridBackground } from "./components/GridBackground";
import { Terminal } from "./components/Terminal";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectDetailsModal } from "./components/ProjectDetailsModal";
import { WebPreviewCard } from "./components/WebPreviewCard";
import { ACHIEVEMENTS, EXPERIENCE, PROJECTS, WEB_PROJECTS, SKILLS_LIST } from "./data";
import { Project } from "./types";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "automation" | "backend" | "tool">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const filterControlsRef = useRef<HTMLDivElement>(null);
  const filterControlsTop = useRef<number | null>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  
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
  const displayedProjects = selectedCategory === "all"
    ? PROJECTS
    : PROJECTS.filter((project) => project.category === selectedCategory);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const changeCategory = (category: "all" | "automation" | "backend" | "tool") => {
    filterControlsTop.current = filterControlsRef.current?.getBoundingClientRect().top ?? null;
    setSelectedCategory(category);
  };

  useLayoutEffect(() => {
    if (filterControlsTop.current === null) return;

    const nextTop = filterControlsRef.current?.getBoundingClientRect().top;
    if (nextTop !== undefined) {
      window.scrollBy({ top: nextTop - filterControlsTop.current, behavior: "auto" });
    }
    filterControlsTop.current = null;
  }, [selectedCategory]);

  const navigateFromMobileMenu = (id: string) => {
    setIsMobileMenuOpen(false);
    window.setTimeout(() => scrollToSection(id), 120);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    swipeStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!swipeStart.current) return;

    const touch = event.changedTouches[0];
    const horizontalDistance = touch.clientX - swipeStart.current.x;
    const verticalDistance = touch.clientY - swipeStart.current.y;

    if (Math.abs(horizontalDistance) > 70 && Math.abs(horizontalDistance) > Math.abs(verticalDistance)) {
      setIsMobileMenuOpen(horizontalDistance > 0);
    }

    swipeStart.current = null;
  };

  return (
    <div
      className="min-h-screen text-zinc-100 font-sans relative selection:bg-indigo-500/30 selection:text-white pb-12"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <GridBackground />

      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.button
              type="button"
              aria-label="Закрыть меню"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
              className="relative flex h-full w-[min(82vw,320px)] flex-col border-r border-white/10 bg-[#0A0B10] px-6 py-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <span className="font-mono text-xs tracking-[0.2em] text-indigo-300">НАВИГАЦИЯ</span>
                <button
                  type="button"
                  aria-label="Закрыть меню"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="cursor-pointer p-1 text-zinc-400 transition-colors hover:text-white"
                >
                  <X size={21} />
                </button>
              </div>
              <nav className="mt-6 flex flex-col gap-1">
                {[
                  ["Обо мне", "hero"],
                  ["Опыт", "experience"],
                  ["Проекты", "projects"],
                  ["Достижения", "education"],
                  ["Веб-концепты", "websites"],
                  ["Контакты", "contact"]
                ].map(([label, id]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => navigateFromMobileMenu(id)}
                    className="cursor-pointer rounded-lg px-3 py-3 text-left font-mono text-sm text-zinc-300 transition-colors hover:bg-indigo-500/10 hover:text-white"
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* FIXED FLOATING NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0B10]/70 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Открыть навигацию"
              onClick={() => setIsMobileMenuOpen(true)}
              className="-ml-2 cursor-pointer p-2 text-zinc-300 transition-colors hover:text-white md:hidden"
            >
              <Menu size={20} />
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="cursor-pointer flex items-center gap-1.5 font-mono text-xs sm:text-sm tracking-wider font-bold group"
            >
              <span className="text-indigo-400 font-semibold group-hover:text-indigo-300 transition-colors">&lt;</span>
              <span className="text-white">VIKTOR.TIMUSHEV</span>
              <span className="text-indigo-400 font-semibold group-hover:text-indigo-300 transition-colors">/&gt;</span>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <button 
              onClick={() => scrollToSection("hero")} 
              className="cursor-pointer hover:text-white transition-colors"
            >
              Обо мне
            </button>
            <button 
              onClick={() => scrollToSection("experience")}
              className="cursor-pointer hover:text-white transition-colors"
            >
              Опыт
            </button>
            <button 
              onClick={() => scrollToSection("projects")} 
              className="cursor-pointer hover:text-white transition-colors"
            >
              Проекты
            </button>
            <button 
              onClick={() => scrollToSection("education")}
              className="cursor-pointer hover:text-white transition-colors"
            >
              Достижения
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
        className="pt-28 md:pt-40 pb-16 min-h-0 md:min-h-[90vh] flex items-center max-w-7xl mx-auto px-4 md:px-8"
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
              <span>PYTHON • BACKEND • AUTOMATION</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
                Python Developer / Software Engineering Intern
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base md:text-lg text-zinc-400 leading-relaxed max-w-xl"
            >
              Студент ИТМО и Python-разработчик с коммерческим опытом в e-commerce, backend и автоматизации.
              Беру задачу от исследования процесса и данных до работающего решения, проверенного на реальных сценариях.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4 items-center"
            >
              <button
                onClick={() => scrollToSection("experience")}
                className="cursor-pointer px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg hover:shadow-indigo-500/10 border border-white/10 flex items-center gap-2"
              >
                <span>Посмотреть опыт</span>
                <ChevronRight size={16} />
              </button>

              <a
                href="/resume/"
                rel="nofollow"
                className="cursor-pointer px-6 py-3 rounded-xl font-medium bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5 hover:border-white/10 flex items-center gap-2"
              >
                <Briefcase size={16} />
                <span>Резюме</span>
              </a>
            </motion.div>
          </div>

          {/* Hero Right Interactive Terminal Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:col-span-5 lg:flex w-full justify-center"
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
                <span>ОБО МНЕ</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                От задачи без ТЗ до работающей системы
              </h2>
              <p className="text-base text-zinc-400 leading-relaxed">
                Работаю с Python, backend-разработкой и browser automation.
                Сильнее всего интересны системы, в которых нужно разобраться в реальном процессе,
                спроектировать логику и довести решение до использования.
              </p>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Сейчас ищу internship и junior-возможности в Python Backend, Software Engineering,
                Automation и AI Engineering. Открыт и к прикладным коммерческим задачам, где автоматизация
                действительно экономит людям время.
              </p>

              {/* Status card */}
              <div className="p-4 rounded-xl border border-indigo-500/10 bg-indigo-500/[0.02] flex items-center gap-3.5">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <div className="text-xs">
                  <p className="font-semibold text-zinc-200">Открыт для стажировок и прикладных проектов</p>
                  <p className="text-zinc-400 mt-0.5">Python Backend · Automation · AI Engineering</p>
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

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-20 max-w-7xl mx-auto px-4 md:px-8 scroll-mt-20">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-indigo-400 uppercase mb-3">
            <Building2 size={14} className="shrink-0" />
            <span>COMMERCIAL EXPERIENCE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Опыт</h2>
          <p className="text-sm text-zinc-400 mt-3 max-w-2xl">
            Коммерческие и project-based задачи, в которых я самостоятельно разбирался в процессах,
            проектировал логику и доводил решения до рабочего результата.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {EXPERIENCE.map((item) => (
            <article key={item.company} className="rounded-2xl border border-white/10 bg-[#0E1017]/50 p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-white/5 pb-5 mb-5">
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.company}</h3>
                  <p className="text-sm text-indigo-300 mt-1">{item.role}</p>
                </div>
                <span className="text-xs font-mono text-zinc-500 whitespace-nowrap">{item.period}</span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-400 mb-5">{item.summary}</p>
              <ul className="space-y-3 text-sm leading-relaxed text-zinc-300">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
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
              <span>SELECTED PROJECTS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Проекты
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 mt-2 max-w-xl">
              Технические детали показывают архитектуру, интеграции и инфраструктуру использованных в проекте решений.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div ref={filterControlsRef} className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl self-start">
            <button
              onClick={() => changeCategory("all")}
              className={`cursor-pointer px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === "all" ? "bg-indigo-600 text-white font-medium" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Все
            </button>
            <button
              onClick={() => changeCategory("automation")}
              className={`cursor-pointer px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === "automation" ? "bg-indigo-600 text-white font-medium" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Автоматизация
            </button>
            <button
              onClick={() => changeCategory("backend")}
              className={`cursor-pointer px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === "backend" ? "bg-indigo-600 text-white font-medium" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Бэкенд
            </button>
            <button
              onClick={() => changeCategory("tool")}
              className={`cursor-pointer px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === "tool" ? "bg-indigo-600 text-white font-medium" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Утилиты
            </button>
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 [overflow-anchor:none]">
          {displayedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={setSelectedProject}
            />
          ))}
        </div>
      </section>

      {/* EDUCATION AND ACHIEVEMENTS SECTION */}
      <section id="education" className="py-20 bg-slate-950/20 border-t border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-indigo-400 uppercase mb-3">
              <GraduationCap size={14} className="shrink-0" />
              <span>EDUCATION</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Образование и достижения</h2>
            <div className="mt-6 rounded-2xl border border-indigo-500/15 bg-indigo-500/[0.03] p-6">
              <p className="text-lg font-semibold text-white">Университет ИТМО, ФИТиП</p>
              <p className="mt-2 text-sm text-zinc-300">09.03.02 «Информационные системы и технологии»</p>
              <p className="mt-1 text-sm text-zinc-400">Разработка программного обеспечения / Software Engineering</p>
              <p className="mt-4 font-mono text-xs text-indigo-300">2026 - 2030</p>
            </div>
          </div>

          <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-[#0E1017]/45 p-6 md:p-8">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-300 uppercase mb-5">
              <Trophy size={14} className="shrink-0" />
              <span>OLYMPIADS & ACHIEVEMENTS</span>
            </div>
            <ul className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-300">
              {ACHIEVEMENTS.map((achievement) => (
                <li key={achievement} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
              <span>WEB CONCEPTS / ФРОНТЕНД</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
               Веб-концепты и интерфейсы
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl">
              Второй фокус портфолио: интерактивные интерфейсы, прототипы и визуальные демонстрации проектов.
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
          <span>OPEN TO INTERNSHIPS & COLLABORATION</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Обсудим стажировку или прикладную задачу
        </h2>
        <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto mb-12">
          Буду рад предложениям по Python Backend, Software Engineering, Automation и AI Engineering,
          а также задачам по разработке ботов, интеграций и внутренних инструментов.
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
