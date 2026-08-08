import { createRoot } from "react-dom/client";
import { ArrowLeft, Download, Github, Mail, Send } from "lucide-react";
import "./index.css";

const experience = [
  {
    company: "Лепороша",
    role: "Python Developer / Business Automation",
    period: "июль - август 2026",
    points: [
      "Самостоятельно спроектировал FIFO-алгоритм для движения товарных партий по данным Wildberries и проверил его на реальных данных.",
      "Разработал Telegram-систему учета кодов «Честный знак» и отчетность в Google Sheets.",
      "Собрал plan/fact-витрину «вымывания» товарных партий; рабочий вариант был принят руководителем."
    ]
  },
  {
    company: "Открытая Европа",
    role: "Python Developer, project-based",
    period: "июнь 2025 - настоящее время",
    points: [
      "Основной разработчик VisaBot: до шести браузерных агентов, очередь, БД, orchestration, recovery/watchdog и Telegram-управление.",
      "Оптимизировал критичную часть workflow через прямые HTTP-запросы: с минут до нескольких секунд.",
      "Разрабатываю prototype для автоматизации 3-НДФЛ: FastAPI + Telegram, обработка документов/OCR, rules engine, XML ФНС/XSD и PDF-preview."
    ]
  }
];

const achievements = [
  "Призер олимпиады им. И.Я. Верченко по математике и криптографии, II уровень, 2025/2026.",
  "Призер «Росатома» по информатике, II уровень, 2025/2026.",
  "Победитель ТИИМ по информатике, 2026.",
  "Диплом III степени командного турнира ФКН НИУ ВШЭ + Яндекс, 2025."
];

function ResumePage() {
  return (
    <main className="min-h-screen bg-[#090A0F] text-zinc-100 selection:bg-indigo-500/30 selection:text-white">
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-10">
        <div className="mb-10 flex items-center justify-between gap-4">
          <a href="/" className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 transition-colors hover:text-white">
            <ArrowLeft size={14} />
            Портфолио
          </a>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">updated 08.08.2026</span>
        </div>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#10121B] shadow-2xl shadow-indigo-950/20">
          <div className="border-b border-white/10 bg-gradient-to-r from-indigo-500/10 via-transparent to-violet-500/10 p-7 md:p-10">
            <p className="mb-4 font-mono text-xs tracking-[0.2em] text-indigo-300">RESUME / CV</p>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Виктор Тимушев</h1>
                <p className="mt-3 text-lg font-medium text-zinc-200">Python Developer / Software Engineering Intern</p>
                <p className="mt-1 text-sm text-zinc-400">Backend · Automation · AI Engineering</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="/resume/viktor-timushev-internship-resume.pdf" download className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500">
                  <Download size={16} /> PDF
                </a>
                <a href="/resume/viktor-timushev-internship-resume.docx" download className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:bg-white/10">
                  <Download size={16} /> DOCX
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 p-7 md:p-10 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <section>
                <h2 className="font-mono text-xs font-semibold tracking-[0.18em] text-indigo-300">ПРОФИЛЬ</h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                  Студент ИТМО и Python-разработчик с коммерческим опытом в e-commerce, backend и автоматизации.
                  Беру задачу от неструктурированного запроса до рабочего решения, проверенного на реальных сценариях.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="font-mono text-xs font-semibold tracking-[0.18em] text-indigo-300">КОНТАКТЫ</h2>
                <div className="mt-4 space-y-3 text-sm text-zinc-300">
                  <a href="mailto:wannaverysleep@gmail.com" className="flex items-center gap-2 transition-colors hover:text-white"><Mail size={15} className="text-indigo-300" /> wannaverysleep@gmail.com</a>
                  <a href="https://t.me/xttxxtt" className="flex items-center gap-2 transition-colors hover:text-white"><Send size={15} className="text-indigo-300" /> @xttxxtt</a>
                  <a href="https://github.com/definitis" className="flex items-center gap-2 transition-colors hover:text-white"><Github size={15} className="text-indigo-300" /> github.com/definitis</a>
                </div>
              </section>

              <section className="mt-8">
                <h2 className="font-mono text-xs font-semibold tracking-[0.18em] text-indigo-300">ОБРАЗОВАНИЕ</h2>
                <p className="mt-4 font-medium text-zinc-100">Университет ИТМО, ФИТиП</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">09.03.02 «Информационные системы и технологии»<br />Software Engineering, 2026-2030</p>
              </section>

              <section className="mt-8">
                <h2 className="font-mono text-xs font-semibold tracking-[0.18em] text-indigo-300">ТЕХНОЛОГИИ</h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">Python, FastAPI, Pydantic, SQLAlchemy, Alembic, SQLite, SQL, REST/HTTP, Selenium, Playwright, Telegram Bot API, pandas, Google Sheets API, OpenAI API, Gemini API, pytest, Git, Linux/SSH.</p>
              </section>
            </aside>

            <div className="space-y-10 lg:col-span-8">
              <section>
                <h2 className="font-mono text-xs font-semibold tracking-[0.18em] text-indigo-300">ОПЫТ</h2>
                <div className="mt-5 space-y-8">
                  {experience.map((item) => (
                    <article key={item.company}>
                      <div className="flex flex-col gap-1 border-b border-white/10 pb-3 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="text-lg font-semibold text-white">{item.company} <span className="font-normal text-zinc-400">| {item.role}</span></h3>
                        <span className="font-mono text-xs text-zinc-500">{item.period}</span>
                      </div>
                      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-300">
                        {item.points.map((point) => <li key={point} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />{point}</li>)}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-mono text-xs font-semibold tracking-[0.18em] text-indigo-300">ИЗБРАННЫЕ ПРОЕКТЫ</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-black/15 p-4"><h3 className="font-semibold text-white">AI/SEO Automation</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">LLM-workflow для e-commerce; тестовая неделя привела к офферу в «Лепороше».</p></div>
                  <div className="rounded-xl border border-white/10 bg-black/15 p-4"><h3 className="font-semibold text-white">WB Social Autoposter</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">Пайплайн публикаций в VK, Pinterest и Instagram с browser automation.</p></div>
                  <div className="rounded-xl border border-white/10 bg-black/15 p-4"><h3 className="font-semibold text-white">Reporting Automation</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">Сбор просроченных заданий и синхронизация с Google Sheets; экономит около 20 минут в день.</p></div>
                </div>
              </section>

              <section>
                <h2 className="font-mono text-xs font-semibold tracking-[0.18em] text-indigo-300">ОЛИМПИАДЫ И ДОСТИЖЕНИЯ</h2>
                <ul className="mt-5 space-y-2 text-sm leading-relaxed text-zinc-300">
                  {achievements.map((achievement) => <li key={achievement} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />{achievement}</li>)}
                </ul>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<ResumePage />);
