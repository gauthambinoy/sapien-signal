"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TABS, type TabId, BASE_POPULATION, BASE_TIMESTAMP, GROWTH_PER_SECOND } from "@/lib/constants";
import { API_COUNT, FREE_COUNT } from "@/lib/api-catalog";
import LiveBadge from "@/components/ui/LiveBadge";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface SidebarProps {
  currentTab: TabId;
  onSelectTab: (id: TabId) => void;
  isOpen: boolean;
  onToggle: () => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
}

const TAB_GROUPS = [
  { label: "Command", tabs: ["overview"] as TabId[] },
  { label: "Earth Systems", tabs: ["weather", "quakes", "air", "energy"] as TabId[] },
  { label: "Economy", tabs: ["markets", "forex", "economy", "countries"] as TabId[] },
  { label: "Society", tabs: ["health", "space", "tech", "news"] as TabId[] },
  { label: "Intelligence", tabs: ["ai"] as TabId[] },
  { label: "System", tabs: ["datasources", "system"] as TabId[] },
];

const API_ENDPOINTS = [
  { name: "Weather", status: "ok" as const },
  { name: "Earthquakes", status: "ok" as const },
  { name: "Markets", status: "ok" as const },
  { name: "Forex", status: "ok" as const },
  { name: "Health", status: "ok" as const },
  { name: "Countries", status: "ok" as const },
  { name: "Space/ISS", status: "ok" as const },
  { name: "Air Quality", status: "ok" as const },
  { name: "Energy", status: "ok" as const },
  { name: "GitHub", status: "ok" as const },
  { name: "HackerNews", status: "ok" as const },
];

function livePop() {
  return Math.floor(BASE_POPULATION + ((Date.now() - BASE_TIMESTAMP) / 1000) * GROWTH_PER_SECOND);
}

export default function Sidebar({ currentTab, onSelectTab, isOpen, onToggle, theme, onThemeToggle }: SidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    TAB_GROUPS.forEach((g) => { init[g.label] = true; });
    return init;
  });
  const [pop, setPop] = useState(0);
  const [utc, setUtc] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPop(livePop());
    setUtc(new Date().toUTCString().slice(0, -4));
    const t = setInterval(() => { setPop(livePop()); setUtc(new Date().toUTCString().slice(0, -4)); }, 1000);
    return () => clearInterval(t);
  }, []);

  const toggleGroup = (label: string) => setExpandedGroups((p) => ({ ...p, [label]: !p[label] }));
  const tabMeta = (id: TabId) => TABS.find((t) => t.id === id);

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: "var(--overlay-bg)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full flex-col border-r sidebar-transition lg:relative lg:z-auto ${
          isOpen ? "w-[280px]" : "w-0 overflow-hidden lg:w-[68px]"
        }`}
        style={{
          background: "linear-gradient(180deg, rgba(33,31,28,0.98) 0%, rgba(27,26,24,0.98) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderColor: "var(--border)",
          boxShadow: "8px 0 42px rgba(0,0,0,0.34), inset -1px 0 0 rgba(245,240,232,0.035)",
        }}
      >
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-48" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(217,119,87,0.10), transparent 72%)" }} />
        {/* Logo */}
        <div
          className="relative flex h-20 shrink-0 items-center gap-3 border-b px-5"
          style={{ borderColor: "var(--border)" }}
        >
          {isOpen ? (
            <>
              <div
                className="relative flex h-10 w-10 items-center justify-center rounded-xl glow-pulse"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #E89070, #C96442)",
                  border: "1px solid rgba(245,240,232,0.16)",
                  boxShadow: "0 8px 24px rgba(217,119,87,0.24), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
              >
                <span className="text-lg text-[#1B1A18]">◉</span>
              </div>
              <div>
                <div className="font-serif text-lg font-semibold tracking-tight">
                  <span style={{ color: "var(--text-primary)" }}>Global Signal</span>
                </div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
                  Orbital Intel · v2
                </div>
              </div>
            </>
          ) : (
            <div
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                background: "radial-gradient(circle at 30% 30%, #E89070, #C96442)",
                border: "1px solid rgba(245,240,232,0.16)",
              }}
            >
              <span className="text-lg text-[#1B1A18]">◉</span>
            </div>
          )}
        </div>

        {/* Live stats */}
        {isOpen && mounted && (
          <div className="relative shrink-0 border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
            <div className="mb-2 flex items-center gap-2">
              <LiveBadge />
              <span className="font-mono text-[10px] tabular-nums" style={{ color: "var(--text-tertiary)" }}>
                {utc} UTC
              </span>
            </div>
            <div className="font-mono text-[11px] tabular-nums" style={{ color: "var(--text-secondary)" }}>
              🌍 {pop.toLocaleString()}
            </div>
          </div>
        )}

        {isOpen && (
          <div className="relative px-4 py-3">
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs transition hover:scale-[1.01]"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-tertiary)" }}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="11" cy="11" r="7" strokeWidth={2} />
                <path d="M21 21l-5-5" strokeWidth={2} strokeLinecap="round" />
              </svg>
              <span className="flex-1">Search the planet...</span>
              <kbd className="rounded border px-1.5 py-0.5 font-mono text-[9px]" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>⌘K</kbd>
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="relative flex-1 overflow-y-auto px-2 pb-3">
          {TAB_GROUPS.map((group) => (
            <div key={group.label} className="mb-1">
              {isOpen ? (
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.24em] transition"
                  style={{ color: "var(--text-muted)" }}
                >
                  {group.label}
                  <svg
                    className={`h-3 w-3 transition-transform ${expandedGroups[group.label] ? "rotate-0" : "-rotate-90"}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              ) : (
                <div className="mx-2 mb-1 h-px" style={{ background: "var(--border)" }} />
              )}

              <AnimatePresence initial={false}>
                {(isOpen ? expandedGroups[group.label] : true) && (
                  <motion.div
                    initial={isOpen ? { height: 0, opacity: 0 } : false}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {group.tabs.map((tabId) => {
                      const meta = tabMeta(tabId);
                      if (!meta) return null;
                      const active = currentTab === tabId;
                      return (
                        <button
                          key={tabId}
                          onClick={() => { onSelectTab(tabId); if (window.innerWidth < 1024) onToggle(); }}
                          className="group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-all duration-300"
                          style={{
                            background: active
                              ? "linear-gradient(90deg, rgba(217,119,87,0.16) 0%, rgba(217,119,87,0.04) 72%, transparent 100%)"
                              : "transparent",
                            color: active ? "var(--text-primary)" : "var(--text-secondary)",
                            border: active ? "1px solid rgba(217,119,87,0.20)" : "1px solid transparent",
                            boxShadow: active ? "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 20px rgba(217,119,87,0.08)" : "none",
                          }}
                          title={meta.label}
                        >
                          {active && <span className="absolute bottom-1.5 left-0 top-1.5 w-0.5 rounded-full" style={{ background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />}
                          <span className={`w-5 text-center font-mono text-[15px] transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-105"}`} style={{ color: active ? "var(--accent)" : "var(--text-tertiary)" }}>{meta.icon}</span>
                          {isOpen && <span className="truncate">{meta.label}</span>}
                          {active && isOpen && (
                            <div
                              className="ml-auto h-2 w-2 rounded-full glow-pulse"
                              style={{ background: "var(--accent)", boxShadow: "0 0 8px rgba(217,119,87,0.5)" }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* API Status */}
        {isOpen && (
          <div className="relative shrink-0 border-t px-4 py-3" style={{ borderColor: "var(--border)" }}>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[1px]" style={{ color: "var(--text-muted)" }}>
              API Status
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
              {API_ENDPOINTS.map((ep, i) => (
                <div key={ep.name} className="flex items-center gap-1.5">
                  <div className="relative">
                    <div className="h-[5px] w-[5px] rounded-full bg-emerald-500" />
                    <div
                      className="absolute inset-0 h-[5px] w-[5px] rounded-full bg-emerald-500"
                      style={{ animation: `ping 2s cubic-bezier(0,0,0.2,1) ${i * 0.15}s infinite` }}
                    />
                  </div>
                  <span className="text-[9px]" style={{ color: "var(--text-muted)" }}>{ep.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer — Theme toggle + info */}
        <div className="relative shrink-0 border-t px-4 py-3" style={{ borderColor: "var(--border)" }}>
          {isOpen ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-lg px-1.5 py-0.5 text-[9px] font-bold" style={{ background: "var(--accent-bg)", color: "var(--accent)" }}>
                  {API_COUNT}+ APIs
                </span>
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{FREE_COUNT} free</span>
              </div>
              <ThemeToggle theme={theme} onToggle={onThemeToggle} compact />
            </div>
          ) : (
            <div className="flex justify-center">
              <button onClick={onThemeToggle} className="text-lg" title="Toggle theme">
                {theme === "dark" ? "🌙" : "☀️"}
              </button>
            </div>
          )}
          {isOpen && (
            <a
              href="https://github.com/gauthambinoy/global-signal"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-1 text-[10px] transition hover:opacity-80"
              style={{ color: "var(--text-muted)" }}
            >
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          )}
        </div>
      </aside>
    </>
  );
}
