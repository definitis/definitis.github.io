import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Play, RefreshCw, Circle, Shield, Code, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TerminalLog {
  id: string;
  time: string;
  type: "info" | "success" | "warning" | "error" | "system";
  text: string;
}

export function Terminal() {
  const [activeTab, setActiveTab] = useState<"visabot" | "monitor" | "config">("visabot");
  const [isRunning, setIsRunning] = useState(true);
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Default logs for visabot
  const initialBotLogs: TerminalLog[] = [
    { id: "1", time: "14:17:48", type: "system", text: "Initializing VisaBot daemon v2.4.1..." },
    { id: "2", time: "14:17:49", type: "info", text: "Loading SQLAlchemy database sqlite:///visabot_prod.db" },
    { id: "3", time: "14:17:50", type: "info", text: "Initializing headless browser worker pool (size = 3)" },
    { id: "4", time: "14:17:51", type: "success", text: "Worker #1: Connection established. User Session verified." },
    { id: "5", time: "14:17:52", type: "success", text: "Worker #2: Telegram Bot API handshake succeeded." },
    { id: "6", time: "14:17:55", type: "warning", text: "Monitor: IP rotation handler idle. Standby status." },
    { id: "7", time: "14:18:00", type: "info", text: "Submitting monitor ping: HTTP 200 OK — Next scan in 4.5s" }
  ];

  // Config tab dummy code
  const configCode = `{
  "agent_credentials": "●●●●●●●●●●●●●●●●",
  "worker_pool": {
    "instances": 3,
    "headless_mode": true,
    "user_data_dir": "./profiles"
  },
  "scheduler": {
    "min_interval_seconds": 3.2,
    "max_interval_seconds": 15.0,
    "watchdog_timeout_ms": 30000
  },
  "notifications": {
    "telegram_target_id": "902183112",
    "log_granularity": "INFO"
  }
}`;

  useEffect(() => {
    setLogs(initialBotLogs);
  }, []);

  // Log generation loop when running
  useEffect(() => {
    if (!isRunning) return;

    let idCounter = 8;
    const items = [
      { type: "info", text: "GET https://api.reservation-portal.eu/slots/status — checked 0 new slots" },
      { type: "info", text: "Queue check: 0 pending registrations, 3 active sessions" },
      { type: "success", text: "Heartbeat OK. System Memory load: 24.1%. ThreadPool: Healthy" },
      { type: "info", text: "Executing garbage collection... chrome profiles state synchronized" },
      { type: "warning", text: "Portal API rate limit alert: Backing off scan interval by 2.0s" },
      { type: "info", text: "Scan cycle complete. CPU load: 12.4% / Active chromium threads: 3" }
    ];

    const interval = setInterval(() => {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];

      setLogs((prev) => {
        const updated = [
          ...prev,
          {
            id: String(idCounter++),
            time: timeStr,
            type: randomItem.type as any,
            text: randomItem.text
          }
        ];
        // Keep last 15 logs
        return updated.slice(-15);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Autoscroll logging container
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, activeTab]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    if (isRunning) {
      setLogs((prev) => [
        ...prev,
        { id: "stop", time: timeStr, type: "error", text: "Deactivating worker loop. Demultiplexer stopped." }
      ].slice(-15));
    } else {
      setLogs((prev) => [
        ...prev,
        { id: "start", time: timeStr, type: "success", text: "Re-activating worker pool. Starting browser processes..." }
      ].slice(-15));
    }
  };

  const clearLogs = () => {
    setLogs([{ id: "clear", time: "--:--:--", type: "system", text: "Terminal outputs flushed by user." }]);
  };

  return (
    <div 
      id="terminal-container" 
      className="relative w-full rounded-xl border border-white/10 bg-[#0E1017]/95 backdrop-blur-xl shadow-2xl shadow-indigo-950/20 overflow-hidden"
    >
      {/* Terminal Title Bar */}
      <div id="terminal-header" className="flex items-center justify-between px-4 py-3 bg-[#07080C]/80 border-b border-white/5 select-none">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/60 block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/60 block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/60 block" />
          </span>
          <div className="flex items-center gap-1.5 ml-4 text-xs font-mono text-zinc-400">
            <TerminalIcon size={12} className="text-zinc-500" />
            <span>developer@backend-node1:~</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-800/60 border border-zinc-700/40 text-zinc-300 font-mono text-[10px]">
            <Circle size={8} className={`${isRunning ? 'fill-emerald-500 text-emerald-500 animate-pulse' : 'fill-rose-500 text-rose-500'}`} />
            <span>{isRunning ? "RUNNING" : "STOPPED"}</span>
          </div>
        </div>
      </div>

      {/* Terminal Navigation Tabs */}
      <div id="terminal-tabs" className="flex items-center bg-[#0C0D13]/50 border-b border-white/5 text-xs font-mono font-medium text-zinc-400">
        <button
          onClick={() => setActiveTab("visabot")}
          className={`flex items-center gap-1.5 px-4 py-2 border-r border-white/5 transition-all outline-none ${
            activeTab === "visabot" ? "bg-[#0E1017] text-indigo-400 border-t-2 border-t-indigo-500" : "hover:bg-zinc-800/20"
          }`}
        >
          <Code size={12} />
          <span>visabot.py</span>
        </button>
        <button
          onClick={() => setActiveTab("monitor")}
          className={`flex items-center gap-1.5 px-4 py-2 border-r border-white/5 transition-all outline-none ${
            activeTab === "monitor" ? "bg-[#0E1017] text-indigo-400 border-t-2 border-t-indigo-500" : "hover:bg-zinc-800/20"
          }`}
        >
          <Shield size={12} />
          <span>process_monitor.sh</span>
        </button>
        <button
          onClick={() => setActiveTab("config")}
          className={`flex items-center gap-1.5 px-4 py-2 transition-all outline-none ${
            activeTab === "config" ? "bg-[#0E1017] text-indigo-400 border-t-2 border-t-indigo-500" : "hover:bg-zinc-800/20"
          }`}
        >
          <span className="text-zinc-500">{`{}`}</span>
          <span>config.json</span>
        </button>

        {/* Action button inside space on right */}
        <div className="ml-auto pr-3 flex gap-2">
          <button 
            onClick={handleToggle}
            title={isRunning ? "Остановить выполнение" : "Запустить выполнение"}
            className={`cursor-pointer p-1 rounded-md transition-colors ${
              isRunning ? 'hover:bg-rose-500/10 text-rose-400' : 'hover:bg-emerald-500/10 text-emerald-400'
            }`}
          >
            {isRunning ? <span className="text-[10px] font-bold px-1 select-none">PAUSE</span> : <Play size={12} />}
          </button>
          <button 
            onClick={clearLogs}
            title="Очистить терминал"
            className="cursor-pointer p-1 rounded-md hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <RefreshCw size={12} />
          </button>
        </div>
      </div>

      {/* Terminal View Content */}
      <div 
        ref={logContainerRef}
        id="terminal-body" 
        className="h-72 p-4 font-mono text-[11px] leading-relaxed overflow-y-auto custom-scrollbar text-zinc-300 bg-[#0E1017] select-text"
      >
        <AnimatePresence mode="popLayout">
          {activeTab === "visabot" && (
            <div className="space-y-1">
              {logs.map((log) => {
                let colorClass = "text-zinc-400";
                if (log.type === "success") colorClass = "text-emerald-400";
                if (log.type === "warning") colorClass = "text-amber-400";
                if (log.type === "error") colorClass = "text-rose-400 font-semibold";
                if (log.type === "system") colorClass = "text-violet-400 font-semibold";

                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex text-[11px] items-start gap-2.5 hover:bg-white/5 py-0.5 px-1 rounded transition-colors"
                  >
                    <span className="text-zinc-600 shrink-0 select-none">[{log.time}]</span>
                    <span className={`${colorClass} shrink-0 select-none`}>
                      {log.type === "system" ? "⚙" : log.type === "success" ? "✔" : log.type === "warning" ? "⚠" : "ℹ"}
                    </span>
                    <span className="text-zinc-200 break-all">{log.text}</span>
                  </motion.div>
                );
              })}
              {isRunning && (
                <div className="flex items-center gap-1.5 text-zinc-500 pt-1">
                  <span className="w-1.5 h-3 bg-indigo-400 animate-pulse" />
                  <span className="text-[10px] italic">Ожидание следующего лога монитора...</span>
                </div>
              )}
            </div>
          )}

          {activeTab === "monitor" && (
            <div className="space-y-2 text-zinc-400">
              <div className="border border-green-500/10 bg-green-500/[0.02] p-2.5 rounded-lg">
                <p className="text-emerald-400 font-semibold mb-1 hover:text-emerald-300">SYSTEM HEALTH: EXCELLENT</p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div>CPU Usage: <span className="text-zinc-200">12.4%</span></div>
                  <div>Active Threads: <span className="text-zinc-200">3/16</span></div>
                  <div>RAM Allocated: <span className="text-zinc-200">512 MB</span></div>
                  <div>Zombies checks: <span className="text-zinc-200">0</span></div>
                </div>
              </div>
              <div className="space-y-1 mt-2 text-zinc-300">
                <p className="text-zinc-500 text-[10px] select-none"># netstat -tulnp | grep python</p>
                <div className="text-zinc-400">tcp  0  0 0.0.0.0:3000  0.0.0.0:*  LISTEN  10921/python</div>
                <p className="text-zinc-500 text-[10px] select-none pt-2"># pm2 status</p>
                <div className="grid grid-cols-4 gap-1 text-[10px] text-zinc-400 border-t border-white/5 pt-1">
                  <span className="text-indigo-400">App Name</span>
                  <span>status</span>
                  <span>cpu</span>
                  <span>mem</span>
                  <span className="text-zinc-200">visabot</span>
                  <span className="text-emerald-400">online</span>
                  <span className="text-zinc-200">1.2%</span>
                  <span className="text-zinc-200">42.1MB</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "config" && (
            <div className="relative">
              <pre className="text-indigo-300 leading-relaxed overflow-x-auto text-[11px] p-2 bg-black/40 rounded-lg">
                {configCode}
              </pre>
              <div className="absolute right-3 top-3 bg-zinc-800/90 text-zinc-400 text-[8px] px-1.5 py-0.5 rounded border border-white/10 select-none">
                JSON-READONLY
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* CLI Prompt Line Footer */}
      <div id="terminal-cli-footer" className="flex items-center gap-1.5 px-4 py-2.5 bg-[#07080C]/80 border-t border-white/5 font-mono text-xs select-none">
        <ChevronRight size={14} className="text-indigo-500" />
        <span className="text-zinc-400">python -m app.workers.visabot --run</span>
        <span className="w-1.5 h-3.5 bg-zinc-500 ml-1 block animate-ping" />
      </div>
    </div>
  );
}
