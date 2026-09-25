import React from "react";
import { 
  Code2, 
  Database, 
  Terminal, 
  Cpu, 
  Layers, 
  Bot, 
  Boxes, 
  Zap, 
  Globe, 
  Share2, 
  Workflow, 
  FileSpreadsheet, 
  Sparkles,
  Server
} from "lucide-react";

export interface TechItem {
  name: string;
  category: "backend" | "database" | "automation" | "devops" | "ai";
  iconName?: string;
  color?: string;
}

export const TECH_ROWS: {
  row1: TechItem[];
  row2: TechItem[];
  row3: TechItem[];
} = {
  row1: [
    { name: "Python", category: "backend", color: "text-blue-500", iconName: "python" },
    { name: "FastAPI", category: "backend", color: "text-emerald-500", iconName: "zap" },
    { name: "PostgreSQL", category: "database", color: "text-sky-500", iconName: "database" },
    { name: "Redis", category: "database", color: "text-red-500", iconName: "database" },
    { name: "SQLAlchemy", category: "backend", color: "text-amber-500", iconName: "layers" },
    { name: "SQLite", category: "database", color: "text-blue-400", iconName: "database" },
    { name: "Asyncio", category: "backend", color: "text-violet-500", iconName: "cpu" },
    { name: "Celery", category: "backend", color: "text-lime-500", iconName: "workflow" }
  ],
  row2: [
    { name: "Docker", category: "devops", color: "text-blue-500", iconName: "boxes" },
    { name: "Linux (Ubuntu)", category: "devops", color: "text-amber-500", iconName: "terminal" },
    { name: "Git & GitHub", category: "devops", color: "text-orange-500", iconName: "share" },
    { name: "REST API", category: "backend", color: "text-teal-500", iconName: "globe" },
    { name: "Nginx", category: "devops", color: "text-emerald-500", iconName: "server" },
    { name: "Pydantic", category: "backend", color: "text-pink-500", iconName: "code" },
    { name: "Bash & Shell", category: "devops", color: "text-zinc-400", iconName: "terminal" },
    { name: "CI / CD", category: "devops", color: "text-cyan-500", iconName: "workflow" }
  ],
  row3: [
    { name: "Telegram Bot API", category: "automation", color: "text-sky-500", iconName: "bot" },
    { name: "Aiogram", category: "automation", color: "text-indigo-400", iconName: "bot" },
    { name: "Playwright", category: "automation", color: "text-green-500", iconName: "workflow" },
    { name: "Selenium WebDriver", category: "automation", color: "text-emerald-400", iconName: "globe" },
    { name: "Google Gemini API", category: "ai", color: "text-purple-400", iconName: "sparkles" },
    { name: "Google Sheets API", category: "automation", color: "text-emerald-500", iconName: "sheet" },
    { name: "Pandas", category: "ai", color: "text-blue-400", iconName: "sheet" },
    { name: "Webhooks", category: "backend", color: "text-amber-400", iconName: "share" }
  ]
};

export const TECH_CATEGORIES = [
  {
    id: "backend",
    title: "Backend & Архитектура",
    description: "Серверные приложения, асинхронные микросервисы и проектирование надежного API",
    items: [
      { name: "Python 3.11+", color: "text-blue-500", iconName: "python" },
      { name: "FastAPI", color: "text-emerald-500", iconName: "zap" },
      { name: "Asyncio", color: "text-violet-500", iconName: "cpu" },
      { name: "SQLAlchemy ORM", color: "text-amber-500", iconName: "layers" },
      { name: "Pydantic V2", color: "text-pink-500", iconName: "code" },
      { name: "Celery", color: "text-lime-500", iconName: "workflow" },
      { name: "Проектирование REST API", color: "text-teal-500", iconName: "globe" },
      { name: "Вебхуки и события (Webhooks)", color: "text-indigo-400", iconName: "share" }
    ]
  },
  {
    id: "database",
    title: "Базы данных & Хранилища",
    description: "Реляционные базы данных, кэширование и персистентность состояния",
    items: [
      { name: "PostgreSQL", color: "text-sky-500", iconName: "database" },
      { name: "Redis", color: "text-red-500", iconName: "database" },
      { name: "SQLite", color: "text-blue-400", iconName: "database" },
      { name: "Alembic (Миграции)", color: "text-amber-400", iconName: "layers" }
    ]
  },
  {
    id: "automation",
    title: "Автоматизация & Парсинг",
    description: "Браузерные воркеры, Telegram-боты, интеграция сторонних платформ",
    items: [
      { name: "Telegram Bot API", color: "text-sky-500", iconName: "bot" },
      { name: "Aiogram 3", color: "text-indigo-400", iconName: "bot" },
      { name: "Playwright", color: "text-green-500", iconName: "workflow" },
      { name: "Selenium WebDriver", color: "text-emerald-400", iconName: "globe" },
      { name: "Google Sheets API", color: "text-emerald-500", iconName: "sheet" },
      { name: "Wildberries & Ozon API", color: "text-purple-400", iconName: "share" },
      { name: "Сервисы решения CAPTCHA", color: "text-amber-400", iconName: "cpu" }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Инфраструктура",
    description: "Развертывание, контейнеризация и поддержание аптайма",
    items: [
      { name: "Docker & Compose", color: "text-blue-500", iconName: "boxes" },
      { name: "Linux (Ubuntu Server)", color: "text-amber-500", iconName: "terminal" },
      { name: "Git & GitHub", color: "text-orange-500", iconName: "share" },
      { name: "Nginx (Reverse Proxy)", color: "text-emerald-500", iconName: "server" },
      { name: "Сервисы Systemd", color: "text-zinc-400", iconName: "terminal" },
      { name: "Bash-скрипты", color: "text-zinc-400", iconName: "terminal" }
    ]
  },
  {
    id: "ai",
    title: "Искусственный интеллект & Данные",
    description: "Применение LLM в прикладных задачах, структурирование и анализ данных",
    items: [
      { name: "Google Gemini API", color: "text-purple-400", iconName: "sparkles" },
      { name: "OpenAI API", color: "text-emerald-500", iconName: "sparkles" },
      { name: "Pandas (обработка данных)", color: "text-blue-400", iconName: "sheet" },
      { name: "Парсинг структурированного JSON", color: "text-cyan-400", iconName: "code" }
    ]
  }
];

export function TechBadgeIcon({ iconName, color = "text-zinc-400" }: { iconName?: string; color?: string }) {
  switch (iconName) {
    case "python":
    case "code":
      return <Code2 size={14} className={color} />;
    case "database":
      return <Database size={14} className={color} />;
    case "terminal":
      return <Terminal size={14} className={color} />;
    case "cpu":
      return <Cpu size={14} className={color} />;
    case "layers":
      return <Layers size={14} className={color} />;
    case "bot":
      return <Bot size={14} className={color} />;
    case "boxes":
      return <Boxes size={14} className={color} />;
    case "zap":
      return <Zap size={14} className={color} />;
    case "globe":
      return <Globe size={14} className={color} />;
    case "share":
      return <Share2 size={14} className={color} />;
    case "workflow":
      return <Workflow size={14} className={color} />;
    case "sheet":
      return <FileSpreadsheet size={14} className={color} />;
    case "sparkles":
      return <Sparkles size={14} className={color} />;
    case "server":
      return <Server size={14} className={color} />;
    default:
      return <Code2 size={14} className={color} />;
  }
}

export function TechBadge({ name, iconName, color }: { name: string; iconName?: string; color?: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#151515] text-sm sm:text-[15px] font-light text-zinc-800 dark:text-zinc-200 shadow-2xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors whitespace-nowrap cursor-default">
      <TechBadgeIcon iconName={iconName} color={color} />
      <span>{name}</span>
    </div>
  );
}
