// Direction A: Warm Editorial (cocoa night + terracotta) — REPO-TRUE
// The repo's actual aesthetic, polished. Sidebar layout, dense, analyst-grade.

const { useState, useEffect, useMemo } = React;

// ──────────────────────────────────────────────────────────────
// Sidebar
// ──────────────────────────────────────────────────────────────
const EditorialSidebar = ({ active, onSelect }) => {
  const T = window.GS_TOKENS.cocoa;
  const groups = useMemo(() => {
    const g = {};
    window.GS_TABS.forEach(t => { (g[t.group] ||= []).push(t); });
    return g;
  }, []);
  const groupLabels = { core: 'Command', earth: 'Earth Systems', economy: 'Economy', society: 'Society', tools: 'Intelligence', system: 'System' };

  return (
    <aside style={{
      width: 240, flexShrink: 0,
      background: 'linear-gradient(180deg, rgba(31,30,28,0.96) 0%, rgba(37,36,31,0.96) 100%)',
      borderRight: `1px solid ${T.border}`,
      padding: '20px 0',
      fontFamily: window.GS_FONTS.sans,
      overflowY: 'auto',
      height: '100%',
    }}>
      {/* Brand */}
      <div style={{ padding: '0 20px 20px', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: `linear-gradient(135deg, ${T.accent}, ${T.cyan})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, color: '#1F1E1C', fontWeight: 900,
            boxShadow: `0 4px 16px ${T.accent}40`,
          }}>◉</div>
          <div>
            <div style={{ fontFamily: window.GS_FONTS.serif, fontSize: 16, fontWeight: 700, color: T.text, letterSpacing: '-0.01em' }}>Global Signal</div>
            <div style={{ fontSize: 9.5, color: T.text3, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 1 }}>Orbital Intel</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '14px 16px 8px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 10px', borderRadius: 10,
          background: 'rgba(245,240,232,0.04)', border: `1px solid ${T.border}`,
          fontSize: 12, color: T.text3,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></svg>
          <span style={{ flex: 1 }}>Search anything…</span>
          <kbd style={{ fontFamily: window.GS_FONTS.mono, fontSize: 9, padding: '1px 5px', borderRadius: 4, border: `1px solid ${T.border}`, color: T.text3 }}>⌘K</kbd>
        </div>
      </div>

      {/* Nav groups */}
      {Object.entries(groups).map(([gKey, items]) => (
        <div key={gKey} style={{ padding: '10px 0 6px' }}>
          <div style={{
            padding: '0 20px 6px', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.22em', color: T.textMuted, textTransform: 'uppercase',
            fontFamily: window.GS_FONTS.mono,
          }}>{groupLabels[gKey]}</div>
          {items.map(item => {
            const isActive = item.id === active;
            return (
              <button key={item.id} onClick={() => onSelect && onSelect(item.id)} style={{
                display: 'flex', alignItems: 'center', gap: 11,
                width: '100%', padding: '7px 16px 7px 20px',
                background: isActive ? `${T.accent}15` : 'transparent',
                border: 'none', borderLeft: `2px solid ${isActive ? T.accent : 'transparent'}`,
                color: isActive ? T.text : T.text2,
                fontSize: 13, fontWeight: isActive ? 600 : 450,
                textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
                position: 'relative',
              }}>
                <span style={{ fontSize: 13, color: isActive ? T.accent : T.text3, width: 14, textAlign: 'center' }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.novel && <span style={{ fontSize: 8, padding: '1px 5px', borderRadius: 3, background: `${T.cyan}22`, color: T.cyan, fontWeight: 700, letterSpacing: '0.1em' }}>NEW</span>}
              </button>
            );
          })}
        </div>
      ))}

      {/* User pill */}
      <div style={{ padding: '14px 16px', marginTop: 'auto', borderTop: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 4px' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${T.cyan}, ${T.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#1F1E1C' }}>GB</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.text }}>Gautham B</div>
            <div style={{ fontSize: 10, color: T.text3 }}>Analyst · Pro</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

// ──────────────────────────────────────────────────────────────
// Top bar
// ──────────────────────────────────────────────────────────────
const EditorialHeader = ({ title, subtitle }) => {
  const T = window.GS_TOKENS.cocoa;
  const [time, setTime] = useState('--:--:--');
  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString('en-US', { hour12: false })), 1000);
    setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 28px', borderBottom: `1px solid ${T.border}`,
      background: 'rgba(31,30,28,0.7)', backdropFilter: 'blur(20px)',
      fontFamily: window.GS_FONTS.sans,
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ margin: 0, fontFamily: window.GS_FONTS.serif, fontSize: 22, fontWeight: 700, color: T.text, letterSpacing: '-0.02em' }}>{title}</h1>
          <LiveTag color={T.accent} label="LIVE" />
        </div>
        <div style={{ marginTop: 3, fontSize: 11.5, color: T.text3 }}>{subtitle}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ fontFamily: window.GS_FONTS.mono, fontSize: 11, color: T.text3 }}>
          <span style={{ color: T.textMuted }}>UTC </span>
          <span style={{ color: T.text2, fontWeight: 600 }}>{time}</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['◐','✦','◊','◉'].map((g, i) => (
            <button key={i} style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'rgba(245,240,232,0.04)', border: `1px solid ${T.border}`,
              color: T.text2, fontSize: 13, cursor: 'pointer',
            }}>{g}</button>
          ))}
        </div>
        <button style={{
          padding: '7px 14px', borderRadius: 8,
          background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`,
          border: 'none', color: '#1F1E1C', fontSize: 12, fontWeight: 700,
          cursor: 'pointer', boxShadow: `0 4px 16px ${T.accent}40`,
          letterSpacing: '0.02em',
        }}>+ New view</button>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────
// Hero overview screen
// ──────────────────────────────────────────────────────────────
const EditorialOverview = () => {
  const T = window.GS_TOKENS.cocoa;
  const [pop, setPop] = useState(8127845632);
  const [co2, setCo2] = useState(421.7);
  const [energy, setEnergy] = useState(0);
  const [strikes, setStrikes] = useState(2400000);
  useEffect(() => {
    const t = setInterval(() => {
      setPop(p => p + Math.floor(Math.random() * 5 + 2));
      setCo2(p => p + (Math.random() - 0.5) * 0.001);
      setEnergy(p => p + Math.floor(Math.random() * 924147 + 500000));
      setStrikes(p => p + Math.floor(Math.random() * 60));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const heroStats = [
    { label: 'World population',      value: pop,    unit: 'people',    color: T.cyan,   trend: '+147 / sec' },
    { label: 'Atmospheric CO₂',       value: co2.toFixed(2), unit: 'ppm',  color: T.amber,  trend: 'NOAA · Mauna Loa' },
    { label: 'Energy generated YTD',  value: energy, unit: 'MWh',       color: T.accent, trend: 'IEA composite' },
    { label: 'Lightning today',       value: strikes,unit: 'strikes',   color: T.purple, trend: 'Vaisala net.' },
  ];

  return (
    <div style={{ padding: '24px 28px 40px', display: 'grid', gap: 18, fontFamily: window.GS_FONTS.sans, color: T.text }}>
      {/* Editorial hero */}
      <div style={{
        position: 'relative', borderRadius: 24, overflow: 'hidden',
        border: `1px solid ${T.border}`,
        background: 'linear-gradient(135deg, rgba(45,42,36,0.9) 0%, rgba(31,30,28,0.95) 100%)',
        padding: 28,
      }}>
        {/* Background art */}
        <div style={{
          position: 'absolute', right: -60, top: -40, width: 380, height: 380,
          opacity: 0.5, pointerEvents: 'none',
        }}>
          <MiniGlobe size={380} accent={T.accent} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 30%, rgba(217,119,87,0.15), transparent 50%)' }} />

        <div style={{ position: 'relative', maxWidth: '60%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.25em', color: T.accent, fontFamily: window.GS_FONTS.mono }}>ORBITAL COMMAND</span>
            <span style={{ fontSize: 10, color: T.textMuted }}>Tuesday · Apr 29, 2026</span>
          </div>
          <h2 style={{
            margin: 0, fontFamily: window.GS_FONTS.serif,
            fontSize: 44, lineHeight: 1.05, fontWeight: 600,
            letterSpacing: '-0.025em', color: T.text,
          }}>
            The state of the planet, <em style={{ color: T.accent, fontStyle: 'italic' }}>right now</em>.
          </h2>
          <p style={{ margin: '14px 0 0', fontSize: 14, lineHeight: 1.65, color: T.text2, maxWidth: 540 }}>
            One stream for weather, seismic activity, energy, markets, public health, space, and the conversation around it. Validated, normalized, and cached on a single edge — so the data shows up and stays up.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
            {['200 APIs', '14 categories', 'AI briefings', '1s tick', 'Edge-cached'].map(c => (
              <span key={c} style={{ fontSize: 11, fontWeight: 500, padding: '5px 11px', borderRadius: 999, background: 'rgba(245,240,232,0.06)', border: `1px solid ${T.border}`, color: T.text2 }}>{c}</span>
            ))}
          </div>
        </div>

        {/* Live counters strip */}
        <div style={{ position: 'relative', marginTop: 26, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {heroStats.map(s => (
            <div key={s.label} style={{
              padding: 16, borderRadius: 14,
              background: 'rgba(245,240,232,0.04)', border: `1px solid ${T.border}`,
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.2em', color: T.text3, textTransform: 'uppercase', fontFamily: window.GS_FONTS.mono }}>{s.label}</div>
              <div style={{ marginTop: 10, fontFamily: window.GS_FONTS.mono, fontSize: 24, fontWeight: 700, color: s.color, letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums', textShadow: `0 0 18px ${s.color}33` }}>
                {typeof s.value === 'number' ? fmt(s.value) : s.value}
                <span style={{ fontSize: 11, color: T.text3, fontWeight: 400, marginLeft: 5 }}>{s.unit}</span>
              </div>
              <div style={{ marginTop: 6, fontSize: 10.5, color: T.textMuted }}>{s.trend}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-col: map + briefing */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
        <div style={{
          borderRadius: 16, border: `1px solid ${T.border}`,
          background: T.card, padding: 18,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontFamily: window.GS_FONTS.serif, fontSize: 16, fontWeight: 600, color: T.text }}>Live Satellite Intelligence</div>
              <div style={{ fontSize: 11, color: T.text3, marginTop: 2 }}>Quakes · Markets · Outages · Space · 1m refresh</div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['Quakes', 'Markets', 'Power', 'Space'].map((l, i) => (
                <button key={l} style={{
                  fontSize: 10.5, fontWeight: 600, padding: '5px 9px', borderRadius: 7,
                  background: i === 0 ? `${T.accent}22` : 'rgba(245,240,232,0.04)',
                  border: `1px solid ${i === 0 ? T.accent + '55' : T.border}`,
                  color: i === 0 ? T.accent : T.text2, cursor: 'pointer',
                  fontFamily: 'inherit',
                }}>{l}</button>
              ))}
            </div>
          </div>
          <SimpleWorldMap height={260} theme="dark" accent={T.accent} markers={[
            { x: 220, y: 180, color: T.red, r: 6 },
            { x: 700, y: 160, color: T.accent, r: 5 },
            { x: 500, y: 220, color: T.amber, r: 4 },
            { x: 820, y: 350, color: T.cyan, r: 4 },
            { x: 280, y: 320, color: T.purple, r: 3 },
            { x: 600, y: 240, color: T.red, r: 5 },
          ]} />
          <div style={{ display: 'flex', gap: 14, marginTop: 12, fontSize: 10.5, color: T.text3 }}>
            <span style={{ color: T.red }}>● M5+ quakes 12</span>
            <span style={{ color: T.accent }}>● Market shocks 4</span>
            <span style={{ color: T.amber }}>● Grid alerts 2</span>
            <span style={{ color: T.cyan }}>● ISS</span>
          </div>
        </div>

        <div style={{
          borderRadius: 16, border: `1px solid ${T.border}`,
          background: T.card, padding: 18, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: `radial-gradient(circle, ${T.accent}22, transparent 70%)`, pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: `${T.accent}22`, border: `1px solid ${T.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.accent, fontSize: 13 }}>✦</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: T.text, textTransform: 'uppercase', fontFamily: window.GS_FONTS.mono }}>AI Briefing</div>
              <div style={{ fontSize: 9.5, color: T.textMuted }}>Synthesized 14s ago · Claude Haiku</div>
            </div>
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.65, color: T.text2, fontFamily: window.GS_FONTS.serif, fontStyle: 'italic' }}>
            "Seismic activity dominates the last 24h with a <strong style={{ color: T.red, fontStyle: 'normal' }}>M6.4 in the Kermadec trench</strong>. Markets opened mixed — BTC +1.8%, S&P futures flat. Three grid stress alerts in <strong style={{ color: T.amber, fontStyle: 'normal' }}>Western Europe</strong> as a heat dome enters day 4. Air quality is healthy across N. America, hazardous in Northern India."
          </p>
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${T.border}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { l: 'Risk index', v: '6.3', c: T.amber, s: '+0.4 vs yest' },
              { l: 'Market sentiment', v: 'Neutral', c: T.text2, s: 'Fear & Greed 52' },
              { l: 'Climate stress', v: 'Elevated', c: T.red, s: '3 alerts active' },
              { l: 'Tech pulse', v: '142 stories', c: T.cyan, s: '↑ 18%' },
            ].map(m => (
              <div key={m.l} style={{ padding: 10, borderRadius: 10, background: 'rgba(245,240,232,0.03)', border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 9, color: T.textMuted, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: window.GS_FONTS.mono }}>{m.l}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: m.c, marginTop: 3 }}>{m.v}</div>
                <div style={{ fontSize: 10, color: T.text3, marginTop: 1 }}>{m.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metric grid */}
      <div>
        <SectionHead title="Live world counters" sub="80+ continuously-updating metrics across 6 categories" T={T} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
          {[
            { l: 'Births today', v: 285430, c: T.green, ic: '◉' },
            { l: 'Cars produced', v: 142800, c: T.cyan, ic: '◌' },
            { l: 'Solar TWh / yr', v: 1640, c: T.amber, ic: '☀' },
            { l: 'Plastic waste t', v: 920500, c: T.red, ic: '⚠' },
            { l: 'Searches / s', v: 99000, c: T.purple, ic: '⌕' },
            { l: 'Trees lost ha', v: 47200, c: T.accent, ic: '⌬' },
            { l: 'Mobile users', v: 5420000000, c: T.cyan, ic: '◊' },
            { l: 'Bitcoin mined', v: 19720000, c: T.amber, ic: '$' },
            { l: 'Books published', v: 4200000, c: T.text2, ic: '☰' },
            { l: 'CO₂ emitted Mt', v: 36400, c: T.red, ic: '⚡' },
          ].map(m => (
            <div key={m.l} style={{
              padding: 14, borderRadius: 12,
              background: T.card, border: `1px solid ${T.border}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 10, color: T.textMuted, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: window.GS_FONTS.mono }}>{m.l}</span>
                <span style={{ color: m.c, fontSize: 11 }}>{m.ic}</span>
              </div>
              <div style={{ fontFamily: window.GS_FONTS.mono, fontSize: 18, fontWeight: 700, color: m.c, fontVariantNumeric: 'tabular-nums', textShadow: `0 0 12px ${m.c}22` }}>{fmt(m.v)}</div>
              <div style={{ marginTop: 6 }}>
                <Spark data={genSpark(16, Math.random() - 0.4)} color={m.c} width={140} height={20} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: regional energy */}
      <div>
        <SectionHead title="Energy consumption by region" sub="Composite from IEA / EIA / IRENA · live" T={T} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
          {[
            { name: 'N. America', twh: 5125, mix: [62, 22, 16], c: T.amber },
            { name: 'Europe', twh: 3890, mix: [42, 38, 20], c: T.cyan },
            { name: 'Asia Pacific', twh: 14200, mix: [72, 15, 13], c: T.red },
            { name: 'Middle East', twh: 1150, mix: [95, 3, 2], c: T.accent },
            { name: 'S. America', twh: 1200, mix: [30, 62, 8], c: T.green },
            { name: 'Africa', twh: 830, mix: [74, 20, 6], c: T.purple },
          ].map(r => (
            <div key={r.name} style={{ padding: 14, borderRadius: 12, background: T.card, border: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: window.GS_FONTS.mono }}>{r.name}</div>
              <div style={{ marginTop: 8, fontFamily: window.GS_FONTS.mono, fontSize: 18, fontWeight: 700, color: r.c }}>{fmt(r.twh)}<span style={{ fontSize: 10, color: T.text3, fontWeight: 400, marginLeft: 4 }}>TWh/yr</span></div>
              <div style={{ marginTop: 10, height: 4, borderRadius: 2, overflow: 'hidden', display: 'flex', background: 'rgba(245,240,232,0.04)' }}>
                <div style={{ width: `${r.mix[0]}%`, background: T.red }} />
                <div style={{ width: `${r.mix[1]}%`, background: T.green }} />
                <div style={{ width: `${r.mix[2]}%`, background: T.cyan }} />
              </div>
              <div style={{ marginTop: 6, fontSize: 9.5, color: T.text3, display: 'flex', justifyContent: 'space-between' }}>
                <span>F {r.mix[0]}%</span><span>R {r.mix[1]}%</span><span>N {r.mix[2]}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper
const SectionHead = ({ title, sub, T }) => (
  <div style={{ marginBottom: 12, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
    <div>
      <h3 style={{ margin: 0, fontFamily: window.GS_FONTS.serif, fontSize: 18, fontWeight: 600, color: T.text, letterSpacing: '-0.015em' }}>{title}</h3>
      <div style={{ fontSize: 11, color: T.text3, marginTop: 2 }}>{sub}</div>
    </div>
    <button style={{ fontSize: 11, color: T.text3, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>View all →</button>
  </div>
);

// Wrap a screen in editorial chrome
const EditorialScreen = ({ children, active = 'overview', title, subtitle }) => {
  const T = window.GS_TOKENS.cocoa;
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      background: T.bg0, color: T.text, overflow: 'hidden',
      fontFamily: window.GS_FONTS.sans,
    }}>
      <EditorialSidebar active={active} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <EditorialHeader title={title} subtitle={subtitle} />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

window.EditorialOverview = EditorialOverview;
window.EditorialScreen = EditorialScreen;
window.EditorialSidebar = EditorialSidebar;
window.EditorialHeader = EditorialHeader;
window.SectionHead = SectionHead;
