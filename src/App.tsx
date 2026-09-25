import React, { useState } from "react";
import { 
  Github, 
  Mail, 
  Send, 
  ArrowUpRight, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  ChevronRight, 
  Cpu
} from "lucide-react";
import { EXPERIENCE, PROJECTS, EDUCATION, Project } from "./data";
import { Navbar } from "./Navbar";
import { TECH_ROWS, TechBadge } from "./TechBadge";
import { Reveal } from "./Reveal";
import { AvatarPixelCard } from "./AvatarPixelCard";
import { ProjectDetailsModal } from "./ProjectDetailsModal";

function SolidBlueVerified({ className = "w-5 h-5 shrink-0" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 22 22" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      title="Подтвержденный профиль"
      aria-label="Подтвержденный профиль"
    >
      <path 
        fill="#0088FF" 
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.053-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.607-.274 1.264-.144 1.898.13.634.435 1.219.88 1.688.47.443 1.054.749 1.688.879.633.13 1.29.083 1.897-.14.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.607.224 1.264.272 1.897.14.634-.13 1.217-.436 1.687-.878.445-.47.75-1.055.88-1.688.13-.634.083-1.291-.14-1.897.586-.274 1.084-.705 1.438-1.246.354-.541.551-1.17.57-1.817Z"
      />
      <path 
        fill="#FFFFFF" 
        d="m9.053 14.9-3.5-3.5 1.238-1.238 2.262 2.262 5.315-5.315L15.5 8.35l-6.447 6.55Z"
      />
    </svg>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#111111] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-300 dark:selection:bg-zinc-700 pb-28 overflow-x-hidden">
      
      {/* STICKY BLURRED NAVIGATION */}
      <Navbar current="home" />

      {/* Main Container - Responsive padding */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-10 sm:mt-20 flex flex-col gap-16 sm:gap-24">
        
        {/* HERO SECTION */}
        <header className="flex flex-col">
          
          {/* Profile Block: Interactive Mosaic Avatar + Name */}
          <Reveal delay={40} y={20}>
            <div className="flex items-center gap-4 sm:gap-7 mb-7 sm:mb-9">
              <AvatarPixelCard 
                primarySrc="/images/avatar-anime.png"
                secondarySrc="/images/avatar-real.png"
                alt="Виктор Тимушев"
                className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                duration={330}
              />
              <div className="flex flex-col gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-900 dark:text-white">
                    Виктор Тимушев
                  </h1>
                  <SolidBlueVerified />
                </div>
                <div className="flex items-center gap-4 sm:gap-4 text-zinc-700 dark:text-zinc-400">
                  <a 
                    href="https://github.com/definitis" 
                    target="_blank" 
                    rel="noreferrer" 
                    title="GitHub"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors p-2 -m-2 touch-manipulation"
                  >
                    <Github size={18} />
                  </a>
                  <a 
                    href="https://t.me/xttxxtt" 
                    target="_blank" 
                    rel="noreferrer" 
                    title="Telegram"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors p-2 -m-2 touch-manipulation"
                  >
                    <Send size={18} />
                  </a>
                  <a 
                    href="mailto:wannaverysleep@gmail.com" 
                    title="Email"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors p-2 -m-2 touch-manipulation"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
          
          {/* Headline - Responsive typography */}
          <Reveal delay={120} y={20}>
            <h2 className="text-2xl sm:text-4xl md:text-[38px] leading-tight font-normal tracking-tight text-zinc-900 dark:text-white mb-5 sm:mb-6">
              Backend Developer <span className="text-zinc-400 dark:text-zinc-500 font-light">— Python & Automation</span>
            </h2>
          </Reveal>

          {/* Bio with generous line spacing and neat inline badges */}
          <Reveal delay={200} y={20}>
            <p className="text-[16px] sm:text-[19px] font-light leading-[1.8] sm:leading-[1.85] text-zinc-600 dark:text-zinc-400 mb-7 sm:mb-8 hyphens-none break-normal">
              Студент Университета ИТМО (Software Engineering). Разрабатываю надежные бэкенд-системы, сервисы автоматизации и интеграционные пайплайны на{" "}
              <span className="inline-flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#181818] px-2 sm:px-2.5 py-0.5 rounded-md text-xs sm:text-sm font-normal text-zinc-800 dark:text-zinc-200 shadow-2xs whitespace-nowrap">
                <Code2 size={13} className="text-blue-500" /> Python
              </span>
              ,{" "}
              <span className="inline-flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#181818] px-2 sm:px-2.5 py-0.5 rounded-md text-xs sm:text-sm font-normal text-zinc-800 dark:text-zinc-200 shadow-2xs whitespace-nowrap">
                <Code2 size={13} className="text-emerald-500" /> FastAPI
              </span>{" "}
              и{" "}
              <span className="inline-flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#181818] px-2 sm:px-2.5 py-0.5 rounded-md text-xs sm:text-sm font-normal text-zinc-800 dark:text-zinc-200 shadow-2xs whitespace-nowrap">
                <Code2 size={13} className="text-indigo-500" /> PostgreSQL
              </span>
              . Умею погружаться в неструктурированные бизнес-процессы и переводить их в устойчивую, поддерживаемую кодовую базу.
            </p>
          </Reveal>

          {/* CTA Button */}
          <Reveal delay={280} y={16}>
            <div>
              <a 
                href="/resume/viktor-timushev-internship-resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-5 py-3 rounded-xl text-sm font-normal hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-xs cursor-pointer active:scale-95 touch-manipulation"
              >
                Посмотреть резюме <ChevronRight size={16} />
              </a>
            </div>
          </Reveal>
        </header>

        {/* 1. EXPERIENCE SECTION */}
        <section id="experience" className="flex flex-col gap-5 sm:gap-6">
          <Reveal delay={50} y={20}>
            <div className="flex items-center justify-between pb-2.5 border-b border-zinc-200 dark:border-zinc-800/80">
              <h2 className="text-xl sm:text-[22px] font-normal tracking-tight text-zinc-900 dark:text-white">
                Опыт
              </h2>
              <a 
                href="/experience/index.html" 
                className="text-xs sm:text-sm font-light text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 p-1 -m-1"
              >
                Подробнее <ChevronRight size={14} />
              </a>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6 sm:gap-7">
            {EXPERIENCE.map((item, idx) => (
              <Reveal key={idx} delay={idx * 80} y={16}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:gap-12 gap-1">
                  <span className="shrink-0 w-44 text-xs sm:text-sm font-mono text-zinc-400 dark:text-zinc-500 pt-0.5">
                    {item.period}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-white">
                      {item.role}
                    </h3>
                    <div className="text-sm font-light text-zinc-700 dark:text-zinc-300">
                      {item.company}
                    </div>
                    <div className="text-xs font-light text-zinc-400 dark:text-zinc-500">
                      {item.location}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 2. PROJECTS SECTION */}
        <section id="projects" className="flex flex-col gap-5 sm:gap-6">
          <Reveal delay={50} y={20}>
            <div className="flex items-center justify-between pb-2.5 border-b border-zinc-200 dark:border-zinc-800/80">
              <h2 className="text-xl sm:text-[22px] font-normal tracking-tight text-zinc-900 dark:text-white">
                Проекты
              </h2>
              <a 
                href="/projects/index.html" 
                className="text-xs sm:text-sm font-light text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 p-1 -m-1"
              >
                Все проекты <ChevronRight size={14} />
              </a>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-3.5 sm:gap-4">
            {PROJECTS.map((project, idx) => {
              const CardWrapper = project.link ? "a" : "div";
              const wrapperProps = project.link 
                ? { href: project.link, target: "_blank", rel: "noreferrer" } 
                : { 
                    role: "button", 
                    tabIndex: 0, 
                    onClick: () => setSelectedProject(project),
                    onKeyDown: (e: React.KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedProject(project);
                      }
                    }
                  };
                
              return (
                <Reveal key={idx} delay={idx * 70} y={20}>
                  <CardWrapper 
                    {...wrapperProps}
                    className={`group block p-5 sm:p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#141414] transition-all cursor-pointer ${
                      project.link 
                        ? 'hover:border-zinc-300 dark:hover:border-zinc-700' 
                        : 'hover:border-amber-500/40 dark:hover:border-amber-500/30'
                    } active:scale-[0.99] touch-manipulation`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-base sm:text-lg font-medium text-zinc-900 dark:text-white flex items-center gap-2 transition-colors ${
                        project.link 
                          ? 'group-hover:text-blue-500 dark:group-hover:text-blue-400' 
                          : 'group-hover:text-amber-500 dark:group-hover:text-amber-400'
                      }`}>
                        {project.title}
                        {project.link && (
                          <ArrowUpRight size={16} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                        )}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base font-light leading-relaxed text-zinc-600 dark:text-zinc-400 mb-3.5 sm:mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.stack.map(tech => (
                        <span key={tech} className="px-2 sm:px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/50 text-xs sm:text-sm font-light text-zinc-600 dark:text-zinc-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardWrapper>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* 3. TECHNOLOGIES MARQUEE */}
        <section id="technologies" className="flex flex-col gap-5 sm:gap-6">
          <Reveal delay={50} y={20}>
            <div className="flex items-center justify-between pb-2.5 border-b border-zinc-200 dark:border-zinc-800/80">
              <h2 className="text-xl sm:text-[22px] font-normal tracking-tight text-zinc-900 dark:text-white">
                Технологии
              </h2>
              <a 
                href="/technologies/index.html" 
                className="text-xs sm:text-sm font-light text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 p-1 -m-1"
              >
                Смотреть все <ChevronRight size={14} />
              </a>
            </div>
          </Reveal>

          {/* Marquee with touch-pan-y for smooth mobile scroll */}
          <Reveal delay={100} y={24}>
            <div className="marquee-mask overflow-hidden py-2.5 flex flex-col gap-3 select-none -mx-4 sm:-mx-6 touch-pan-y">
              
              {/* Row 1: Left (Slowest) */}
              <div className="animate-marquee-left marquee-slow gap-2.5 sm:gap-3 flex">
                {[...TECH_ROWS.row1, ...TECH_ROWS.row1, ...TECH_ROWS.row1].map((tech, idx) => (
                  <TechBadge key={`r1-${idx}`} name={tech.name} color={tech.color} iconName={tech.iconName} />
                ))}
              </div>

              {/* Row 2: Right (Medium, less slowed down) */}
              <div className="animate-marquee-right marquee-medium gap-2.5 sm:gap-3 flex">
                {[...TECH_ROWS.row2, ...TECH_ROWS.row2, ...TECH_ROWS.row2].map((tech, idx) => (
                  <TechBadge key={`r2-${idx}`} name={tech.name} color={tech.color} iconName={tech.iconName} />
                ))}
              </div>

              {/* Row 3: Left (Standard) */}
              <div className="animate-marquee-left marquee-normal gap-2.5 sm:gap-3 flex">
                {[...TECH_ROWS.row3, ...TECH_ROWS.row3, ...TECH_ROWS.row3].map((tech, idx) => (
                  <TechBadge key={`r3-${idx}`} name={tech.name} color={tech.color} iconName={tech.iconName} />
                ))}
              </div>

            </div>
          </Reveal>
        </section>

        {/* 4. EDUCATION & ACHIEVEMENTS */}
        <section id="education" className="flex flex-col gap-5 sm:gap-6">
          <Reveal delay={50} y={20}>
            <div className="flex items-center justify-between pb-2.5 border-b border-zinc-200 dark:border-zinc-800/80">
              <h2 className="text-xl sm:text-[22px] font-normal tracking-tight text-zinc-900 dark:text-white">
                Образование и олимпиады
              </h2>
              <a 
                href="/education/index.html" 
                className="text-xs sm:text-sm font-light text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 p-1 -m-1"
              >
                Подробнее <ChevronRight size={14} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={100} y={20}>
            <ul className="flex flex-col gap-3.5 sm:gap-4 text-[15px] sm:text-base font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {EDUCATION.map((edu, idx) => (
                <li key={idx} className="flex items-start gap-2.5 sm:gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" />
                  <span>{edu}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* 5. LET'S WORK TOGETHER */}
        <section className="pt-2 sm:pt-4">
          <Reveal delay={50} y={20}>
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 sm:gap-8 md:gap-12">
              
              {/* Left Column: Heading & Description */}
              <div className="flex flex-col gap-2.5 sm:gap-3.5 max-w-md">
                <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-zinc-900 dark:text-white">
                  Буду рад сотрудничеству.
                </h2>
                <p className="text-sm sm:text-base font-light leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Открыт к предложениям по backend-разработке, автоматизации бизнес-процессов и интеграции сервисов — от создания решений с нуля до оптимизации существующих систем. Помогаю бизнесу сокращать рутину и выстраивать надежные пайплайны.
                </p>
              </div>

              {/* Right Column: Contact Action Cards */}
              <div className="flex flex-col gap-3 w-full md:w-auto md:min-w-[320px]">
                {/* Email Card */}
                <a
                  href="mailto:wannaverysleep@gmail.com"
                  className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151515] hover:border-zinc-300 dark:hover:border-zinc-700 active:scale-[0.99] transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors shrink-0">
                      <Mail size={17} />
                    </div>
                    <div className="flex flex-col text-left min-w-0">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                        EMAIL
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">
                        wannaverysleep@gmail.com
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </a>

                {/* Telegram Card */}
                <a
                  href="https://t.me/xttxxtt"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151515] hover:border-zinc-300 dark:hover:border-zinc-700 active:scale-[0.99] transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors shrink-0">
                      <Send size={17} />
                    </div>
                    <div className="flex flex-col text-left min-w-0">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                        TELEGRAM
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">
                        @xttxxtt
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </a>
              </div>

            </div>
          </Reveal>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-dashed border-zinc-200 dark:border-zinc-800/80 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm font-light text-zinc-500">
          <p>© {new Date().getFullYear()} Виктор Тимушев</p>
          <a href="mailto:wannaverysleep@gmail.com" className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-1">
            <Mail size={15} /> wannaverysleep@gmail.com
          </a>
        </footer>
        
      </div>

      {/* Project Details Modal for closed/private projects */}
      <ProjectDetailsModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}
