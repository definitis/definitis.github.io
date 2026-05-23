import { Project, WebProject } from "./types";

export const SKILLS_LIST = [
  "Python", "FastAPI", "TypeScript", "JavaScript", "Selenium", "Playwright", 
  "Telegram Bot API", "SQLite", "SQLAlchemy", "Automation", "Parsing", 
  "APIs", "Linux", "Git", "Docker", "Asynchronous Python", "Scapy", 
  "Network Security"
];

export const PROJECTS: Project[] = [
  {
    id: "visabot",
    title: "VisaBot",
    category: "automation",
    description: "Автоматизированная система мониторинга и бронирования свободных слотов для записи на визу с использованием автономных сессий.",
    longDescription: "Комплексное решение для бронирования дефицитных слотов в условиях жесткой конкуренции. Архитектура построена на базе изолированных браузерных агентов, управляемых единым диспетчером задач, с непрерывным мониторингом доступности и отправкой моментальных уведомлений.",
    stack: ["Python", "Selenium", "SQLAlchemy", "Telegram API", "Automation"],
    status: "Paused",
    isPrivate: true,
    revenue: "Система использовалась в реальном коммерческом сценарии и дала измеримый результат.",
    features: [
      "Автономный watchdog мониторинга работоспособности сервиса",
      "Управление пулом браузерных сессий в фоновом режиме",
      "Автоматическое распознавание капчи и обход базовых задержек",
      "Моментальные уведомления и пуш-уведомления через Telegram Bot API"
    ],
    technicalDetails: {
      backend: [
        "Python 3.11+ асинхронное ядро мониторинга",
        "SQLAlchemy ORM для персистентности сессий и статусов слотов",
        "SQLite локальная база данных для транзакционных логов"
      ],
      automation: [
        "Selenium WebDriver с кастомной конфигурацией заголовков и профилей",
        "Автономные фоновые воркеры с механизмом экспоненциального отката (backoff)",
        "Отказоустойчивая машина состояний для восстановления сессий при сбое сети"
      ],
      integrations: [
        "Telegram Bot API для мгновенного бронирования в один клик и логов",
        "Внешняя интеграция с сервисами авто-решения капчи через API"
      ],
      infrastructure: [
        "Windows process orchestration",
        "Watchdog скрипты для автоматического высвобождения зависшего ОЗУ / процессов Chrome",
        "Потоковое логирование с фильтрацией чувствительных данных"
      ],
      architectureOverview: "Многопроцессный демон с центральной очередью задач. Каждый воркер представляет собой изолированный браузерный контейнер, который асинхронно опрашивает ресурс и, при обнаружении слота, моментально инициирует процедуру резервирования."
    }
  },
  {
    id: "obsidian-gemini",
    title: "Obsidian Gemini Plugin",
    category: "tool",
    description: "Полнофункциональный плагин интеграции Gemini AI непосредственно в вашу локальную базу знаний Obsidian.",
    longDescription: "Интеллектуальный помощник для работы со вторым мозгом. Плагин глубоко индексирует локальные папки заметок, позволяя генерировать связи, делать саммари длинных лекций по Markdown структуре и автоматически расставлять теги.",
    stack: ["TypeScript", "FastAPI", "Gemini API", "Obsidian API"],
    status: "Active",
    isPrivate: false,
    githubUrl: "https://github.com/definitis/Plugin_Obsidian_Gemini",
    features: [
      "Семантический анализ текста заметок прямо во время редактирования",
      "Генерация связей и перекрестных ссылок по концепциям",
      "Кастомные промпты уплотнения информации без ручного копирования",
      "Локальное кеширование контекста базы для экономии токенов"
    ],
    technicalDetails: {
      backend: [
        "FastAPI локальный бэкенд для распределения тяжелых текстовых запросов",
        "Uvicorn сервер с нулевым временем отклика для обслуживания локальных портов",
        "Pydantic модели валидации JSON-схем входящих документов"
      ],
      automation: [
        "Фоновая индексация измененных файлов по событиям изменения диска (FSM)",
        "Безопасная конвейерная перезапись файлов Markdown с бэкапом в Git"
      ],
      integrations: [
        "Google Gemini API с использованием библиотеки @google/genai",
        "Obsidian Plugin API (Events, Vault, Workspace, Settings)"
      ],
      infrastructure: [
        "Локальная среда выполнения на хосте разработчика",
        "Интеграция с Git для страховки исходных заметок от случайной перезаписи"
      ],
      architectureOverview: "Гибридный плагин: легкий UI на TypeScript внутри Obsidian взаимодействует по HTTP/JSON с локальным FastAPI-сервером, который управляет длинным контекстом и общается с API искусственного интеллекта."
    }
  },
  {
    id: "3ndfl-bot",
    title: "3-NDFL Automation Bot",
    category: "automation",
    description: "Провизионинг и автоматизированное заполнение налоговых деклараций 3-НДФЛ на основе документов пользователя.",
    longDescription: "Коммерческая система для быстрого декларирования доходов. Бот принимает разрозненные PDF-сканы документов, извлекает и верифицирует ключевые финансовые поля, на основе которых формирует готовую декларацию в формате XML для налоговой инспекции.",
    stack: ["Python", "FastAPI", "PDF Processing", "Telegram Bot"],
    status: "Frozen",
    isPrivate: true,
    revenue: "Коммерческий проект (архив)",
    features: [
      "Автоматический парсинг PDF справок о доходах и договоров",
      "Определение налоговых вычетов по сложным формулам",
      "Интегрированное хранилище документов с автоудалением для безопасности пользователей",
      "Генерация официальных XML схем Федеральной Налоговой Службы"
    ],
    technicalDetails: {
      backend: [
        "FastAPI микросервисный REST API",
        "Pydantic строго типизированные схемы финансовых расчетов",
        "SQLite для безопасного хранения черновиков пользователей"
      ],
      automation: [
        "Конвейер обработки входящих файлов в изолированных потоках",
        "Алгоритм динамического сопоставления структуры PDF документов для разных банков"
      ],
      integrations: [
        "Telegram WebApps для удобного заполнения полей ввода прямо внутри мессенджера",
        "Парсеры XML-структур ФНС РФ"
      ],
      infrastructure: [
        "Docker контейнеры с изоляцией сессий",
        "Безопасный буфер оперативной памяти, очищающий все персональные данные сразу после скачивания файлов"
      ],
      architectureOverview: "Модульный сервис обработки документов. Входящий поток файлов раскладывается в структурированный JSON, валидируется моделью Pydantic, которая затем транслирует его в XML-чертеж декларации согласно спецификациям ФНС."
    }
  },
  {
    id: "reporting-automation",
    title: "Reporting Automation Script",
    category: "automation",
    description: "Система автоматического мониторинга и сбора просроченных заданий для администраторов онлайн-школы.",
    longDescription: "Скрипт оптимизирует ежедневное администрирование платформы онлайн-обучения. Он авторизуется в аккаунтах преподавателей, парсит текущий статус студенческих задач, собирает статистику задержек и обновляет дашборд в Google Sheets.",
    stack: ["Python", "Google API", "Sheets API", "Parsing"],
    status: "Completed",
    isPrivate: true,
    result: "Экономит около 20 минут времени кураторов ежедневно.",
    features: [
      "Авторизация в закрытых кабинетах с сохранением кук сессий",
      "Многопоточный опрос страниц задач для экономии времени выполнения",
      "Синхронизация результатов с корпоративными таблицами Google Sheets API",
      "Встроенные проверки на дубли и пропуски данных"
    ],
    technicalDetails: {
      backend: [
        "Python скриптовый движок",
        "Google API Python SDK Client"
      ],
      automation: [
        "Ускоренный Web Scraping на базе HTTP-сессий (Requests/Httpx)",
        "Пул асинхронных задач для параллельного опроса личных кабинетов"
      ],
      integrations: [
        "Google Sheets API v4 для записи журналов логов",
        "Google Drive API для создания резервных копий отчетов"
      ],
      infrastructure: [
        "Cron расписания на VPS сервере",
        "Ротация логов выполнения для контроля сбоев авторизации"
      ],
      architectureOverview: "Скрипт запускается по крону, считывает список аккаунтов из Google Drive, асинхронно производит опрос контента страниц через HTTP-сессии, отфильтровывает долги учеников и атомарно записывает сводные данные обратно в таблицу."
    }
  },
  {
    id: "telegram-secretary",
    title: "Telegram Secretary Bot",
    category: "backend",
    description: "Персональный ассистент-секретарь для хаотичных заметок, дедлайнов и регулярных напоминаний.",
    longDescription: "Умный бот для людей с высокой плотностью задач. Принимает голосовые сообщения и неструктурированный поток мыслей, бережно парсит даты, времена, названия дел и наводит идеальный порядок в вашем календаре.",
    stack: ["Python", "Aiogram", "FastAPI", "Task Management"],
    status: "In Development",
    isPrivate: false,
    githubUrl: "https://github.com/definitis/telegram_secretary_bot",
    features: [
      "Распознавание дедлайнов по ключевым русским фразам (сегодня в х, завтра, в пятницу)",
      "Сводный утренний дайджест планов, приходящий в заданное время",
      "Удобное продление и перенос задач с интерактивных инлайн-кнопок",
      "Фильтрация спама и группировка похожих напоминаний"
    ],
    technicalDetails: {
      backend: [
        "Python 3.10+",
        "Aiogram 3.x - передовой асинхронный фреймворк для ботов",
        "FastAPI вэбхуки для отказоустойчивой отправки сообщений под нагрузкой"
      ],
      automation: [
        "Планировщик фоновых уведомлений на базе Asyncio Task Queue",
        "Алгоритмы авто-извлечения сущностей времени из естественного языка"
      ],
      integrations: [
        "Google Calendar API для дублирования важных встреч",
        "Почтовые шлюзы уведомлений (по выбору)"
      ],
      infrastructure: [
        "Docker-контейнер для независимого развертывания",
        "Redis для хранения данных пользователя во временной памяти (FSM)"
      ],
      architectureOverview: "Асинхронный бот на вебхуках. Вся входящая нагрузка логируется, сессии хранятся в кэше Redis, что снижает задержку ответа до <100мс. Внутренний планировщик непрерывно сверяет БД с текущим временем."
    }
  },
  {
    id: "network-scanner",
    title: "Network Scanner",
    category: "tool",
    description: "Network Scanner — это простой инструмент для сканирования локальной сети и проверки доступности устройств. Программа пингует все устройства в сети и выводит их статус (доступен/недоступен) и имя хоста, если оно доступно.",
    longDescription: "Этот проект сканирует все IP-адреса в заданной подсети и проверяет их доступность с помощью команды ping. Если устройство отвечает на пинг, программа пытается получить имя хоста через socket.gethostbyaddr. Результаты сохраняются в CSV-файл для дальнейшего анализа.",
    stack: ["Python", "CLI Socket", "CSV Output", "Networking"],
    status: "Completed",
    isPrivate: false,
    githubUrl: "https://github.com/definitis/network-scanner",
    features: [
      "Сканирует все устройства в сети (например, 192.168.3.0/24)",
      "Проверяет доступность каждого устройства с помощью пинга",
      "Получает имя хоста для доступных устройств",
      "Сохраняет результаты сканирования в CSV-файл"
    ],
    technicalDetails: {
      backend: [
        "Python 3.10 standard library",
        "socket.gethostbyaddr resolution for hostname discovery",
        "csv module for report serialization"
      ],
      automation: [
        "Ping process run automation using built-in subprocess",
        "Sequential IP scanner checking online availability of high-density ranges",
        "Automatic timeout and recovery for inactive subnet segments"
      ],
      integrations: [
        "System subprocess API utilizing native OS ping execution",
        "Native socket library integration for remote host identification"
      ],
      infrastructure: [
        "Lightweight command line utility with zero external package dependencies",
        "Local filesystem integration write-out for .csv spreadsheets"
      ],
      architectureOverview: "Этот проект сканирует все IP-адреса в заданной подсети и проверяет их доступность с помощью команды ping. Если устройство отвечает на пинг, программа пытается получить имя хоста через socket.gethostbyaddr. Результаты сохраняются в CSV-файл для дальнейшего анализа."
    }
  }
];

export const WEB_PROJECTS: WebProject[] = [
  {
    id: "spa-salon",
    title: "SPA Salon Website",
    description: "Элегантный веб-сайт премиального спа-салона с утонченным дизайном, кастомными шрифтами, эффектами затухания и адаптивной интерактивной формой бронирования процедур.",
    techStack: ["React", "Tailwind CSS", "Framer Motion", "UI Design"],
    previewType: "salon",
    mockupTitle: "SPA-beauty",
    mockupSubtitle: "Пространство отдыха и восстановления в Зеленоградске",
    features: [
      "Каталог SPA-меню с детальным описанием процедур",
      "Интерактивный подбор идеальной программы (квиз)",
      "Интерактивный календарь онлайн-записи с выбором даты и времени",
      "Полная адаптивность под любые мобильные и Retina дисплеи"
    ],
    screenshots: [
      { url: "/src/assets/images/spa_hero_1779553684693.png", label: "01 — Главный экран" },
      { url: "/src/assets/images/spa_menu_1779553705640.png", label: "02 — Каталог SPA-меню" },
      { url: "/src/assets/images/spa_details_modal_1779553726698.png", label: "03 — Детали процедуры (Модальное окно)" },
      { url: "/src/assets/images/spa_calculator_1779553745135.png", label: "04 — Тест-подбор спа-программы" },
      { url: "/src/assets/images/spa_benefits_1779553762368.png", label: "05 — Почему выбирают нас" },
      { url: "/src/assets/images/spa_about_1779553780601.png", label: "06 — Философия и атмосфера" },
      { url: "/src/assets/images/spa_reviews_1779553800297.png", label: "07 — Отзывы гостей" },
      { url: "/src/assets/images/spa_contacts_1779553816345.png", label: "08 — Контактная информация" },
      { url: "/src/assets/images/spa_booking_modal_1779553833735.png", label: "09 — Онлайн-запись (Модальное окно)" }
    ]
  },
  {
    id: "online-school",
    title: "Techstep (Online School)",
    description: "Технологичный целевой лендинг для образовательной платформы компьютерной грамотности. Полноценная посадочная страница с направлениями обучения, процессом записи, отзывами и формой обратной связи.",
    techStack: ["React", "Tailwind CSS", "Motion", "HTML5"],
    previewType: "school",
    mockupTitle: "TechStep",
    mockupSubtitle: "Онлайн-обучение компьютерной грамотности",
    features: ["Интерактивный просмотр макетов", "Интегрированный презентационный слайдер", "Полноэкранная галерея с детальными скриншотами разделов"],
    screenshots: [
      { url: "/src/assets/images/techstep_homepage_1779553453577.png", label: "01 — Главная страница" },
      { url: "/src/assets/images/techstep_directions_1779553472069.png", label: "02 — Направления обучения" },
      { url: "/src/assets/images/techstep_tariffs_1779553488305.png", label: "03 — Процесс и Тарифы" },
      { url: "/src/assets/images/techstep_reviews_1779553502758.png", label: "04 — Отзывы студентов" },
      { url: "/src/assets/images/techstep_contacts_1779553517898.png", label: "05 — Контакты и Быстрая заявка" }
    ]
  },
  {
    id: "jewelry-store",
    title: "Jewelry Brand Landing",
    description: "Изысканный концептуальный сайт для бренда украшений из натуральных камней «Нить Ариадны». Философское позиционирование, разбор авторского процесса, каталог услуг, галерея работ ручной работы и интерактивный FAQ.",
    techStack: ["React", "Tailwind CSS", "Framer Motion", "Typography Play"],
    previewType: "card",
    mockupTitle: "Нить Ариадны",
    mockupSubtitle: "Найдите свой камень, обретите гармонию",
    features: [
      "Интерактивная презентация авторской концепции подбора камней",
      "Полный каталог индивидуальных услуг и консультаций",
      "Интерактивная галерея готовых изделий ручной работы",
      "Адаптивный аккордеон часто задаваемых вопросов (FAQ)",
      "Форма обратной связи для заказа украшений с душой"
    ],
    screenshots: [
      { url: "/src/assets/images/jewelry_hero_1779554069252.png", label: "01 — Главный экран" },
      { url: "/src/assets/images/jewelry_about_1779554084491.png", label: "02 — О бренде и мастере" },
      { url: "/src/assets/images/jewelry_process_1779554102300.png", label: "03 — Процесс создания" },
      { url: "/src/assets/images/jewelry_services_1779554117766.png", label: "04 — Услуги и стоимость" },
      { url: "/src/assets/images/jewelry_gallery_1779554132705.png", label: "05 — Галерея готовых работ" },
      { url: "/src/assets/images/jewelry_reviews_1779554150765.png", label: "06 — Отзывы гостей" },
      { url: "/src/assets/images/jewelry_faq_1779554165893.png", label: "07 — Часто задаваемые вопросы" },
      { url: "/src/assets/images/jewelry_contacts_1779554179842.png", label: "08 — Контакты и Быстрая заявка" }
    ]
  }
];
