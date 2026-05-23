import React, { useState, useEffect } from "react";
import { WebProject } from "../types";
import { 
  Laptop, 
  Smartphone, 
  ExternalLink, 
  Check,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  X,
  Sliders,
  Lock,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface WebPreviewCardProps {
  key?: React.Key;
  webProject: WebProject;
}

export function WebPreviewCard({ webProject }: WebPreviewCardProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "features">("preview");
  const [simulatedDevice, setSimulatedDevice] = useState<"desktop" | "mobile">("desktop");
  const [isDemoBooked, setIsDemoBooked] = useState(false);
  const [coursePrice, setCoursePrice] = useState(12000);

  // Live simulation states (for projects without screenshots)
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");

  // Upgraded case-study states
  const [zoomScale, setZoomScale] = useState(1.0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName) return;
    setIsDemoBooked(true);
    setTimeout(() => {
      setIsDemoBooked(false);
      setBookingName("");
      setBookingPhone("");
    }, 4000);
  };

  // Zoom manipulation logic
  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomScale((prev) => Math.min(prev + 0.15, 2.0));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomScale((prev) => Math.max(prev - 0.15, 0.5));
  };

  const handleZoomReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomScale(1.0);
  };

  // Slideshow navigation logic
  const handlePrevImage = () => {
    if (!webProject.screenshots) return;
    setActiveImageIdx((prev) => (prev - 1 + webProject.screenshots!.length) % webProject.screenshots!.length);
  };

  const handleNextImage = () => {
    if (!webProject.screenshots) return;
    setActiveImageIdx((prev) => (prev + 1) % webProject.screenshots!.length);
  };

  // Global Keyboard event listeners for Arrow keys & Escape
  useEffect(() => {
    if (!isModalOpen || !webProject.screenshots) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Right") {
        handleNextImage();
      } else if (e.key === "ArrowLeft" || e.key === "Left") {
        handlePrevImage();
      } else if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, webProject.screenshots, activeImageIdx]);

  return (
    <>
      <div 
        id={`web-preview-${webProject.id}`}
        className="rounded-xl border border-white/10 bg-[#0A0C14]/40 backdrop-blur-md overflow-hidden flex flex-col transition-all duration-300 hover:border-violet-500/20"
      >
        {/* Upper Tab Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-[#0C0E14] select-none text-xs">
          <div className="flex items-center gap-1.5 font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
            <span>{webProject.title}</span>
          </div>
          <div className="flex rounded bg-white/5 p-0.5">
            <button
              onClick={() => setActiveTab("preview")}
              className={`cursor-pointer px-2.5 py-0.5 rounded text-[11px] transition-colors ${
                activeTab === "preview" ? "bg-violet-600 text-white font-medium" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Превью
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`cursor-pointer px-2.5 py-0.5 rounded text-[11px] transition-colors ${
                activeTab === "features" ? "bg-violet-600 text-white font-medium" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Характеристики
            </button>
          </div>
        </div>

        {/* Main interactive mockup display Container */}
        {activeTab === "preview" ? (
          <div className="flex flex-col bg-[#07080C] p-4 relative h-80 justify-between">
            
            {/* Device Frame Browser Navigation simulator (shows lock and mock URI) */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] font-mono select-none">
              <span className="font-semibold text-zinc-300">{webProject.mockupTitle}</span>
              <div className="flex gap-2 text-zinc-500">
                <span>Главная</span>
                <span>О нас</span>
                <span>Контакты</span>
              </div>
            </div>

            {/* Smart Device Shell Selector (only for mockups without screenshots) */}
            {!webProject.screenshots && (
              <div className="absolute right-3 top-10 flex gap-1 z-10 bg-black/40 p-1 rounded-md border border-white/5 shrink-0">
                <button
                  onClick={() => setSimulatedDevice("desktop")}
                  title="Desktop preview"
                  className={`cursor-pointer p-1 rounded transition-colors ${simulatedDevice === "desktop" ? "bg-white/10 text-violet-400" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  <Laptop size={12} />
                </button>
                <button
                  onClick={() => setSimulatedDevice("mobile")}
                  title="Smartphone preview"
                  className={`cursor-pointer p-1 rounded transition-colors ${simulatedDevice === "mobile" ? "bg-white/10 text-violet-400" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  <Smartphone size={12} />
                </button>
              </div>
            )}

            {/* Content Container (Screenshot presentation with Zoom or original Interactive Mockup form) */}
            <div className="grow flex items-center justify-center py-2 overflow-hidden h-full">
              {webProject.screenshots ? (
                /* High-End Real Screenshot Viewer with zoom controls and click modal trigger */
                <div className="w-full h-full relative rounded-lg border border-white/5 bg-[#090b11] overflow-hidden group/browser shadow-inner flex flex-col">
                  {/* macOS Browser Bar */}
                  <div className="flex items-center justify-between px-3 py-1 bg-[#111319] border-b border-white/5 select-none text-[9px] text-zinc-400 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="w-44 bg-black/30 rounded py-0.5 px-2 flex items-center justify-center gap-1 text-[8px] text-zinc-500 border border-white/5">
                      <Lock size={8} className="text-emerald-500" />
                      <span className="truncate">
                        {webProject.id === "spa-salon" ? "spa-beauty.ru" : webProject.id === "online-school" ? "techstep.ru" : webProject.id === "jewelry-store" ? "нить-ариадны.рф" : `${webProject.id}.ru`}
                      </span>
                    </div>
                    <div className="w-4" />
                  </div>

                  {/* Browser viewport */}
                  <div className="grow relative overflow-hidden bg-[#06070a] flex items-start justify-center">
                    
                    {/* Web Preview Screenshot Content */}
                    <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-1">
                      <img 
                        src={webProject.screenshots[0].url} 
                        alt={webProject.screenshots[0].label}
                        className="w-full h-auto block select-none pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Premium Centered Overlay on Hover */}
                    <div 
                      onClick={() => setIsModalOpen(true)}
                      className="absolute inset-0 bg-transparent hover:bg-black/45 transition-all duration-300 flex items-center justify-center group/overlay cursor-pointer z-10"
                    >
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        className="opacity-0 group-hover/overlay:opacity-100 flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 border border-violet-400/30 rounded-full text-white font-mono text-[9px] font-semibold tracking-wider uppercase shadow-2xl transition-all duration-200"
                      >
                        <Maximize2 size={10} />
                        <span>Смотреть Презентацию</span>
                      </motion.div>
                    </div>

                  </div>
                </div>
              ) : (
                /* Fallback clean Interactive Mock site schemas (salon, card) */
                <div className={`transition-all duration-300 overflow-hidden rounded-lg bg-[#0E1016] border border-white/5 p-4 flex flex-col justify-between w-full h-full ${
                  simulatedDevice === "desktop" ? "w-full" : "w-48 text-center"
                }`}>
                  
                  {/* Luxury SPA Salon interactive schedule mock */}
                  {webProject.previewType === "salon" && (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <span className="text-[8px] tracking-widest text-[#D4AF37] uppercase font-serif">PREMIUM RETREAT</span>
                        <h4 className="text-sm font-serif text-white hover:text-amber-200 duration-150 leading-tight mt-0.5">
                          {isDemoBooked ? "✨ Заявка принята!" : webProject.mockupSubtitle}
                        </h4>
                      </div>
                      
                      {isDemoBooked ? (
                        <div className="text-[10px] text-amber-300 bg-amber-500/5 p-2 rounded border border-amber-500/10 text-center font-mono my-2">
                           Администратор ÉLIXIR свяжется с вами для верификации даты. Благодарим!
                        </div>
                      ) : (
                        <form onSubmit={handleBook} className="flex flex-col gap-1 my-1 text-left">
                          <div className="flex gap-1">
                            <input 
                              type="text" 
                              placeholder="Ваше имя" 
                              value={bookingName}
                              onChange={(e) => setBookingName(e.target.value)}
                              className="bg-black/40 border border-white/10 rounded px-1.5 py-0.5 text-[9px] text-white focus:outline-none focus:border-amber-500 grow"
                            />
                            <input 
                              type="text" 
                              placeholder="Телефон" 
                              value={bookingPhone}
                              onChange={(e) => setBookingPhone(e.target.value)}
                              className="bg-black/40 border border-white/10 rounded px-1.5 py-0.5 text-[9px] text-white focus:outline-none focus:border-amber-500 w-16"
                            />
                          </div>
                          <button 
                            type="submit" 
                            className="cursor-pointer bg-[#D4AF37] text-black font-semibold uppercase text-[8px] py-1 rounded tracking-wide hover:bg-amber-300 transition-colors text-center"
                          >
                            Записаться на процедуру
                          </button>
                        </form>
                      )}
                      <span className="text-[8px] font-mono text-zinc-500 select-none">★ 5.0 (182 отзыва) • Москва, Тверская 12</span>
                    </div>
                  )}

                  {/* Concept Store Brand Preview with items cards */}
                  {webProject.previewType === "card" && (
                    <div className="flex flex-col h-full justify-between">
                      <div className="text-center">
                        <span className="text-[7px] tracking-[0.25em] text-zinc-400 uppercase font-mono">{webProject.mockupSubtitle}</span>
                        <h4 className="text-sm font-light text-zinc-200 mt-2 tracking-wide font-sans">{webProject.mockupTitle}</h4>
                      </div>
                      
                      <div className="border border-white/10 group bg-stone-900/60 p-2.5 rounded-md flex items-center justify-between text-xs transition-all duration-300 hover:scale-105 hover:border-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 bg-gradient-to-tr from-stone-800 to-stone-600 rounded" />
                          <div className="text-left">
                            <p className="text-[8px] text-zinc-300 font-mono font-bold">ATX Oversized Hoodie</p>
                            <p className="text-[8px] text-zinc-500">Mineral Wash Edition</p>
                          </div>
                        </div>
                        <span className="text-[8px] font-mono text-zinc-400">8 900 ₽</span>
                      </div>

                      <div className="flex justify-between text-[7px] font-mono text-zinc-500 uppercase select-none">
                        <span>В наличии (12)</span>
                        <span>Доставка по всему миру</span>
                      </div>
                    </div>
                  )}

                  {/* Standard safety fallback */}
                  {webProject.previewType !== "salon" && webProject.previewType !== "card" && (
                    <div className="flex flex-col h-full justify-center items-center text-center p-4">
                      <p className="text-xs text-zinc-400 font-mono mb-2">Интерактивный демонстрационный модуль</p>
                      <span className="text-[10px] text-zinc-600 font-mono">Концептуальная сборка</span>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-[#07080C] p-6 h-80 flex flex-col justify-between text-left">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase">Технологический Арсенал</span>
              <div className="flex flex-wrap gap-1.5 mt-2 mb-4">
                {webProject.techStack.map((tech, i) => (
                  <span key={i} className="text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/5 py-0.5 px-2 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                {webProject.description}
              </p>

              <div className="space-y-1.5">
                {webProject.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                    <Check size={12} className="text-violet-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <span className="text-[10px] text-zinc-500 font-mono self-start">
               Коммерческий сайт в портфолио разработчика
            </span>
          </div>
        )}

        {/* Unified Demo trigger button for cases and simulations */}
        <div className="p-4 pt-0">
          {webProject.screenshots ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer w-full py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-mono text-[11px] font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 group border border-violet-500/20 active:scale-[0.98]"
            >
              <span>Посмотреть Демо</span>
              <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          ) : (
            <button
              onClick={() => setActiveTab(activeTab === "preview" ? "features" : "preview")}
              className="cursor-pointer w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 font-mono text-[11px] font-medium tracking-wide shadow-sm transition-all border border-white/5 active:scale-[0.98]"
            >
              <span>{activeTab === "preview" ? "Посмотреть Характеристики" : "Назад к Мокапу"}</span>
            </button>
          )}
        </div>
      </div>

      {/* FULLSCREEN CASE STUDY GALLERY VIEWER MODAL */}
      <AnimatePresence>
        {isModalOpen && webProject.screenshots && (
          <div 
            id={`fullscreen-gallery-modal-${webProject.id}`}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/92 backdrop-blur-xl transition-all duration-300 overflow-y-auto"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-6xl h-[88vh] md:h-[82vh] max-h-[850px] bg-[#0A0D14]/90 border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl backdrop-blur-md relative"
            >
              
              {/* LEFT SIDE: Dynamic Viewer container (fades & slides screenshots cleanly) */}
              <div className="flex-1 h-full bg-[#05060A]/80 flex items-center justify-center p-4 relative overflow-hidden select-none border-r border-white/5">
                
                {/* Visual context status label */}
                <div className="absolute top-4 left-4 z-30 flex items-center gap-2 bg-black/50 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                  <span>PREMIUM PREVIEW</span>
                </div>

                {/* Left arrow on-screen navigation */}
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-violet-600 text-white border border-white/5 hover:border-violet-500 shadow-xl cursor-pointer transition-all duration-200 active:scale-95"
                  title="Назад"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Right arrow on-screen navigation */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-violet-600 text-white border border-white/5 hover:border-violet-500 shadow-xl cursor-pointer transition-all duration-200 active:scale-95"
                  title="Вперед"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Counter index overlay */}
                <div className="absolute top-4 right-4 z-30 select-none">
                  <span className="text-xs font-mono bg-black/50 border border-white/10 px-3.5 py-1 rounded-full text-zinc-300">
                    {activeImageIdx + 1} / {webProject.screenshots.length}
                  </span>
                </div>

                {/* Image layout container */}
                <div className="h-full w-full flex items-center justify-center p-6 relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIdx}
                      src={webProject.screenshots[activeImageIdx].url}
                      alt={webProject.screenshots[activeImageIdx].label}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="max-w-full max-h-[92%] object-contain rounded-lg shadow-2xl border border-white/5"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                  
                </div>

              </div>

              {/* RIGHT SIDE: Styled sidebar list of screenshots thumbnails (Behance / Instagram story feeling) */}
              <div className="w-full md:w-80 shrink-0 bg-[#0A0D14] flex flex-col h-full border-t md:border-t-0 md:border-l border-white/10">
                
                {/* Sidebar Header details and close tool */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">{webProject.mockupTitle}</h3>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Интерактивная презентация</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="cursor-pointer p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all border border-white/5"
                    title="Закрыть (Esc)"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Thumbnails select list */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Навигация по разделам</p>
                  {webProject.screenshots.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-full text-left rounded-xl overflow-hidden border flex gap-3 p-2 bg-[#0E1119] transition-all duration-200 relative ${
                        activeImageIdx === idx 
                        ? "border-violet-500 ring-2 ring-violet-500/15" 
                        : "border-white/5 hover:border-white/15"
                      }`}
                    >
                      <div className="w-16 h-10 rounded overflow-hidden bg-black/20 shrink-0 border border-white/10 relative">
                        <img 
                          src={s.url} 
                          alt={s.label}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {activeImageIdx === idx && (
                          <div className="absolute inset-0 bg-violet-600/15 backdrop-blur-[0.5px]" />
                        )}
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <p className={`text-[10px] font-mono leading-none ${activeImageIdx === idx ? "text-violet-400 font-semibold" : "text-zinc-500"}`}>
                          Слайд 0{idx + 1}
                        </p>
                        <p className={`text-xs mt-1 truncate ${activeImageIdx === idx ? "text-white font-medium" : "text-zinc-300"}`}>
                          {s.label.replace(/^0\d\s[—-]\s/, "")}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Sidebar manual usage guide */}
                <div className="p-4 bg-[#07090F] border-t border-white/5 text-xs text-zinc-400 font-mono select-none shrink-0 ready-only">
                  <div className="flex items-center gap-1.5 text-violet-400 font-semibold mb-1">
                    <Sliders size={12} />
                    <span>УПРАВЛЕНИЕ ПРЕЗЕНТАЦИЕЙ</span>
                  </div>
                  <ul className="space-y-1 text-[10px] text-zinc-500 leading-normal">
                    <li>• Клавиши стрелок <span className="text-zinc-400">← →</span> на клавиатуре</li>
                    <li>• Клавиша <span className="text-zinc-400">ESC</span> для закрытия</li>
                    <li>• Кликайте по миниатюрам для перехода</li>
                  </ul>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
