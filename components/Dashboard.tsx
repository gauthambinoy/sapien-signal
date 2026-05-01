"use client";

import { useState, useEffect, Component, ReactNode, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import CommandPalette from "@/components/ui/CommandPalette";
import { TABS, type TabId } from "@/lib/constants";
import ErrorCard from "@/components/ui/ErrorCard";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import { useTheme } from "@/hooks/useTheme";
import { useAmbientLight } from "@/hooks/useAmbientLight";
import { useGlobalParallax } from "@/hooks/useInteractions";
import { AnomalyContainer, useAnomalyDetection } from "@/components/ai/AIFeatures";

const MeshBackground = dynamic(() => import("@/components/ui/AuroraParticleBackground"), { ssr: false });
const AIChatSidebar = dynamic(() => import("@/components/ui/AIChatSidebar"), { ssr: false });

import OverviewTab from "@/components/tabs/OverviewTab";
import WeatherTab from "@/components/tabs/WeatherTab";
import EarthquakeTab from "@/components/tabs/EarthquakeTab";
import MarketsTab from "@/components/tabs/MarketsTab";
import ForexTab from "@/components/tabs/ForexTab";
import EconomyTab from "@/components/tabs/EconomyTab";
import EnergyTab from "@/components/tabs/EnergyTab";
import HealthTab from "@/components/tabs/HealthTab";
import CountriesTab from "@/components/tabs/CountriesTab";
import SpaceTab from "@/components/tabs/SpaceTab";
import AirQualityTab from "@/components/tabs/AirQualityTab";
import TechPulseTab from "@/components/tabs/TechPulseTab";
import NewsTab from "@/components/tabs/NewsTab";
import DataSourcesTab from "@/components/tabs/DataSourcesTab";
import AIQueryTab from "@/components/tabs/AIQueryTab";
import SystemTab from "@/components/tabs/SystemTab";

class TabErrorBoundary extends Component<
  { children: ReactNode; tabName: string },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; tabName: string }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error) {
    console.error("[WORLDDATA]", { tab: this.props.tabName, error: error.message, ts: new Date().toISOString() });
  }
  render() {
    if (this.state.hasError) return <ErrorCard message={`${this.props.tabName} tab crashed`} onRetry={() => this.setState({ hasError: false })} />;
    return this.props.children;
  }
}

const TAB_COMPONENTS: Record<TabId, React.FC> = {
  overview: OverviewTab, weather: WeatherTab, quakes: EarthquakeTab, markets: MarketsTab,
  forex: ForexTab, economy: EconomyTab, energy: EnergyTab, health: HealthTab, countries: CountriesTab,
  space: SpaceTab, air: AirQualityTab, tech: TechPulseTab, news: NewsTab,
  datasources: DataSourcesTab, ai: AIQueryTab, system: SystemTab,
};

function DashboardInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme, toggle: toggleTheme, mounted: themeMounted } = useTheme();
  const ambient = useAmbientLight();
  useGlobalParallax();

  // Anomaly detection with sample data
  const { anomalies, dismiss: dismissAnomaly } = useAnomalyDetection({});

  const tabParam = searchParams.get("tab") as TabId | null;
  const validTab = TABS.some((t) => t.id === tabParam) ? tabParam! : "overview";
  const [tab, setTab] = useState<TabId>(validTab);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (tabParam && TABS.some((t) => t.id === tabParam)) setTab(tabParam);
  }, [tabParam]);

  useEffect(() => {
    const check = () => setSidebarOpen(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleTabChange = (id: TabId) => {
    setTab(id);
    router.replace(`/?tab=${id}`, { scroll: false });
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight") { const i = TABS.findIndex((t) => t.id === tab); if (i < TABS.length - 1) handleTabChange(TABS[i + 1].id); }
      if (e.key === "ArrowLeft") { const i = TABS.findIndex((t) => t.id === tab); if (i > 0) handleTabChange(TABS[i - 1].id); }
      const n = parseInt(e.key);
      if (n >= 1 && n <= 9 && n <= TABS.length) handleTabChange(TABS[n - 1].id);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const ActiveTab = TAB_COMPONENTS[tab];
  const tabLabel = TABS.find((t) => t.id === tab)?.label ?? "";

  if (!themeMounted) return <SkeletonLoader height={600} message="Loading..." />;

  return (
    <div className="relative flex min-h-screen" style={{ background: "var(--depth-gradient)", color: "var(--text-primary)" }}>
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 900px 420px at 78% -10%, rgba(217,119,87,0.12), transparent 62%), radial-gradient(ellipse 720px 420px at 12% 0%, rgba(217,182,121,0.07), transparent 64%), #1B1A18",
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.18]" style={{ backgroundImage: "radial-gradient(rgba(245,240,232,0.08) 1px, transparent 1px)", backgroundSize: "4px 4px" }} />
      <div className="pointer-events-none fixed inset-0 z-0" style={{ background: "linear-gradient(180deg, rgba(27,26,24,0.12), rgba(27,26,24,0.9) 78%)" }} />
      <div style={{ opacity: tab === "overview" ? 0.08 : 0.16 }}>
        <MeshBackground />
      </div>

      {/* Anomaly detection alerts */}
      <AnomalyContainer anomalies={anomalies} onDismiss={dismissAnomaly} />

      <Sidebar
        currentTab={tab}
        onSelectTab={handleTabChange}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        theme={theme}
        onThemeToggle={toggleTheme}
      />

      <main className="relative z-10 flex-1 overflow-hidden">
        <div
          className="flex min-h-20 items-center justify-between border-b px-6 py-4 md:px-8"
          style={{
            borderColor: "var(--border)",
            background: "linear-gradient(180deg, rgba(33,31,28,0.92) 0%, rgba(33,31,28,0.72) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: `0 1px 0 rgba(255,255,255,0.035) inset, 0 12px 36px rgba(0,0,0,0.24), 0 0 40px ${ambient.accentGlow}`,
          }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                color: "var(--text-secondary)",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <div>
              <div className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.28em]" style={{ color: "var(--accent)" }}>
                Orbital Command
              </div>
              <h2 className="font-serif text-2xl font-semibold leading-none tracking-tight" style={{ color: "var(--text-primary)" }}>{tabLabel}</h2>
              <div className="mt-1 flex items-center gap-2 text-[10px]" style={{ color: "var(--text-muted)" }}>
                <div className="h-1 w-1 rounded-full" style={{ background: ambient.accent, boxShadow: `0 0 6px ${ambient.accent}` }} />
                <span className="capitalize">{ambient.phase} mode</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Voice command button */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
              }}
              title="AI Chat (⌘J)"
              onClick={() => { window.dispatchEvent(new KeyboardEvent("keydown", { key: "j", metaKey: true })); }}
            >
              <span className="text-sm">🧠</span>
            </button>

            <button
              onClick={() => { window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true })); }}
              className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-all duration-300 hover:scale-[1.02]"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
                background: "var(--bg-card)",
                backdropFilter: "blur(12px)",
              }}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
              <kbd
                className="ml-1.5 rounded-md border px-1.5 py-0.5 font-mono text-[9px]"
                style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}
              >
                ⌘K
              </kbd>
            </button>
          </div>
        </div>

        <div className="h-[calc(100vh-80px)] overflow-y-auto px-4 py-5 md:px-8 md:py-7" style={{ background: "transparent" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12, filter: "blur(6px)", scale: 0.99 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)", scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <TabErrorBoundary tabName={tabLabel}>
                <ActiveTab />
              </TabErrorBoundary>
            </motion.div>
          </AnimatePresence>

          <footer
            className="mt-10 border-t pb-6 pt-4 text-center text-[11px]"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            <span className="text-aurora">Global Signal</span> — Built with Next.js 14 · TypeScript · TailwindCSS · 200+ APIs · AI Intelligence
          </footer>
        </div>
      </main>

      <CommandPalette onSelectTab={handleTabChange} currentTab={tab} />
      <AIChatSidebar />
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<SkeletonLoader height={600} message="Loading..." />}>
      <DashboardInner />
    </Suspense>
  );
}
