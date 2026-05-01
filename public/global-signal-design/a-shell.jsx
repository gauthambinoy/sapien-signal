// Direction A v2 — Beautiful, refined Claude-themed design
// Cocoa night + terracotta · 1B-designer polish

const { useState, useEffect, useMemo, useRef } = React;

// ── Refined token palette (warmer, more Claude.ai) ──────
window.GS_PALETTE_A = {
  // Base surfaces
  bg0:    '#1B1A18',           // deepest
  bg1:    '#211F1C',
  bg2:    '#262420',
  card:   'rgba(245,240,232,0.025)',
  cardHi: 'rgba(245,240,232,0.045)',
  // Borders / lines
  line:   'rgba(245,240,232,0.06)',
  lineHi: 'rgba(245,240,232,0.12)',
  // Text
  text:   '#F5F0E8',
  text2:  '#D9D3C4',
  text3:  '#A39E92',
  text4:  '#6E6A62',
  text5:  '#48453F',
  // Brand
  accent:  '#D97757',          // terracotta
  accentLo:'#C96442',
  accentHi:'#E89070',
  // Semantic warm palette
  amber:  '#E8A260',
  gold:   '#D9B679',
  cream:  '#E5C9A3',
  rose:   '#D87E6E',
  rust:   '#B85F3E',
  ochre:  '#C49460',
  sage:   '#8FA876',           // soft green for "good"
  ember:  '#D45A48',           // soft red for "alert"
  azure:  '#7AAAD0',           // muted blue for cool data (rare)
  plum:   '#9F7494',           // muted purple
};

// ── Refined typography stacks ───────────────────────────
window.GS_FONTS_A = {
  display: '"Fraunces", "Source Serif 4", Georgia, serif',
  serif:   '"Source Serif 4", "Fraunces", Georgia, serif',
  sans:    '"Inter Tight", "Inter", system-ui, sans-serif',
  mono:    '"JetBrains Mono", ui-monospace, monospace',
};

const P = window.GS_PALETTE_A;
const FA = window.GS_FONTS_A;

// ──────────────────────────────────────────────────────────
// SIDEBAR — refined
// ──────────────────────────────────────────────────────────
const SidebarA = ({ active = 'overview', onSelect = () => {} }) => {
  const groups = useMemo(() => {
    const g = {};
    window.GS_TABS.forEach(t => { (g[t.group] ||= []).push(t); });
    return g;
  }, []);
  const labels = { core: 'Command', earth: 'Earth Systems', economy: 'Economy', society: 'Society', tools: 'Intelligence', system: 'System' };

  return (
    <aside style={{
      width: 248, flexShrink: 0, height: '100%',
      background: `linear-gradient(180deg, ${P.bg1} 0%, ${P.bg0} 100%)`,
      borderRight: `1px solid ${P.line}`,
      display: 'flex', flexDirection: 'column',
      fontFamily: FA.sans,
      position: 'relative',
    }}>
      {/* Subtle inner glow */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200, background: `radial-gradient(ellipse at 50% 0%, ${P.accent}10, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Brand */}
      <div style={{ padding: '20px 22px 18px', borderBottom: `1px solid ${P.line}`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 11, position: 'relative',
            background: `radial-gradient(circle at 30% 30%, ${P.accentHi}, ${P.accentLo})`,
            boxShadow: `0 6px 20px ${P.accent}40, inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.2)`,
          }}>
            <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', border: '1.5px solid rgba(27,26,24,0.7)' }} />
            <div style={{ position: 'absolute', top: 12, left: 14, width: 6, height: 6, borderRadius: '50%', background: '#1B1A18' }} />
          </div>
          <div>
            <div style={{ fontFamily: FA.display, fontSize: 17, fontWeight: 600, color: P.text, letterSpacing: '-0.015em', lineHeight: 1.1 }}>Global Signal</div>
            <div style={{ fontSize: 9.5, color: P.text4, letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 3, fontFamily: FA.mono }}>Orbital Intel · v0.9</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '14px 14px 6px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 9,
          padding: '9px 12px', borderRadius: 11,
          background: P.card, border: `1px solid ${P.line}`,
          fontSize: 12.5, color: P.text3,
          transition: 'all 0.15s',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></svg>
          <span style={{ flex: 1 }}>Search the planet…</span>
          <kbd style={{ fontFamily: FA.mono, fontSize: 9.5, padding: '2px 6px', borderRadius: 4, border: `1px solid ${P.line}`, color: P.text4, background: 'rgba(0,0,0,0.2)' }}>⌘K</kbd>
        </div>
      </div>

      {/* Nav scroll */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0 16px' }}>
        {Object.entries(groups).map(([gKey, items]) => (
          <div key={gKey} style={{ padding: '10px 0 4px' }}>
            <div style={{
              padding: '0 22px 7px', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.24em', color: P.text4, textTransform: 'uppercase',
              fontFamily: FA.mono,
            }}>{labels[gKey]}</div>
            {items.map(item => {
              const isActive = item.id === active;
              return (
                <button key={item.id} onClick={() => onSelect(item.id)} style={{
                  position: 'relative',
                  display: 'flex', alignItems: 'center', gap: 11,
                  width: '100%',
                  padding: '7px 22px 7px 20px',
                  background: isActive ? `linear-gradient(90deg, ${P.accent}1A 0%, transparent 100%)` : 'transparent',
                  color: isActive ? P.text : P.text2,
                  fontSize: 13, fontWeight: isActive ? 600 : 450,
                  cursor: 'pointer',
                  border: 'none',
                  textAlign: 'left',
                  fontFamily: FA.sans,
                }}>
                  {isActive && <div style={{ position: 'absolute', left: 0, top: 4, bottom: 4, width: 2, borderRadius: 2, background: P.accent, boxShadow: `0 0 8px ${P.accent}` }} />}
                  <span style={{ width: 16, fontSize: 13, color: isActive ? P.accent : P.text3, textAlign: 'center', fontFamily: FA.mono }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.novel && <span style={{
                    fontSize: 8.5, padding: '1px 6px', borderRadius: 999,
                    background: `${P.gold}20`, color: P.gold,
                    fontWeight: 700, letterSpacing: '0.12em', fontFamily: FA.mono,
                    border: `1px solid ${P.gold}30`,
                  }}>NEW</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* User pill */}
      <div style={{ padding: '12px 14px', borderTop: `1px solid ${P.line}` }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 11,
          padding: '8px 10px', borderRadius: 11,
          background: P.card, border: `1px solid ${P.line}`,
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: `linear-gradient(135deg, ${P.gold}, ${P.accent})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: P.bg0,
            boxShadow: `0 2px 8px ${P.accent}40`,
          }}>GB</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: P.text }}>Gautham B.</div>
            <div style={{ fontSize: 10, color: P.text4, fontFamily: FA.mono, letterSpacing: '0.05em' }}>Pro · 14 streams</div>
          </div>
          <div style={{ color: P.text4, fontSize: 14 }}>⋯</div>
        </div>
      </div>
    </aside>
  );
};

// ──────────────────────────────────────────────────────────
// HEADER — refined
// ──────────────────────────────────────────────────────────
const HeaderA = ({ title, subtitle, eyebrow }) => {
  const [time, setTime] = useState('--:--:--');
  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString('en-GB', { hour12: false })), 1000);
    setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 32px', borderBottom: `1px solid ${P.line}`,
      background: `linear-gradient(180deg, ${P.bg1}E0 0%, ${P.bg1}AA 100%)`,
      backdropFilter: 'blur(20px)',
      fontFamily: FA.sans,
      position: 'relative', zIndex: 5,
    }}>
      <div>
        {eyebrow && <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.28em', color: P.accent, fontFamily: FA.mono, marginBottom: 5, textTransform: 'uppercase' }}>{eyebrow}</div>}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ margin: 0, fontFamily: FA.display, fontSize: 26, fontWeight: 600, color: P.text, letterSpacing: '-0.025em', lineHeight: 1 }}>{title}</h1>
          <LiveTag color={P.sage} label="LIVE" />
        </div>
        {subtitle && <div style={{ marginTop: 4, fontSize: 12, color: P.text3 }}>{subtitle}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ fontFamily: FA.mono, fontSize: 11, color: P.text3, textAlign: 'right', lineHeight: 1.3 }}>
          <div style={{ color: P.text4, fontSize: 9, letterSpacing: '0.2em' }}>UTC</div>
          <div style={{ color: P.text2, fontWeight: 600, fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>{time}</div>
        </div>
        <div style={{ width: 1, height: 24, background: P.line }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { i: '⌕', l: 'Search' },
            { i: '◐', l: 'Alerts' },
            { i: '✦', l: 'AI' },
          ].map(b => (
            <button key={b.l} style={{
              width: 34, height: 34, borderRadius: 9,
              background: P.card, border: `1px solid ${P.line}`,
              color: P.text2, fontSize: 13, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}>{b.i}</button>
          ))}
        </div>
        <button style={{
          padding: '8px 16px', borderRadius: 10,
          background: `linear-gradient(180deg, ${P.accentHi} 0%, ${P.accentLo} 100%)`,
          border: 'none', color: P.bg0, fontSize: 12.5, fontWeight: 700,
          cursor: 'pointer', boxShadow: `0 4px 14px ${P.accent}55, inset 0 1px 0 rgba(255,255,255,0.25)`,
          letterSpacing: '0.01em', fontFamily: FA.sans,
        }}>+ New view</button>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────
// SCREEN WRAPPER
// ──────────────────────────────────────────────────────────
const ScreenA = ({ children, active = 'overview', title, subtitle, eyebrow, onSelect }) => (
  <div style={{
    width: '100%', height: '100%', display: 'flex',
    background: `radial-gradient(ellipse 1200px 600px at 80% -10%, ${P.accent}08, transparent), ${P.bg0}`,
    color: P.text, overflow: 'hidden',
    fontFamily: FA.sans,
  }}>
    <SidebarA active={active} onSelect={onSelect} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <HeaderA title={title} subtitle={subtitle} eyebrow={eyebrow} />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  </div>
);

// ──────────────────────────────────────────────────────────
// REUSABLE CARD COMPONENTS
// ──────────────────────────────────────────────────────────
const CardA = ({ children, style = {}, glow, padded = true }) => (
  <div style={{
    position: 'relative',
    borderRadius: 16, border: `1px solid ${P.line}`,
    background: P.card, backdropFilter: 'blur(8px)',
    padding: padded ? 18 : 0,
    boxShadow: glow ? `0 1px 0 rgba(255,255,255,0.04) inset, 0 12px 40px rgba(0,0,0,0.4)` : `0 1px 0 rgba(255,255,255,0.04) inset`,
    ...style,
  }}>{children}</div>
);

const SectionTitle = ({ title, sub, action }) => (
  <div style={{ marginBottom: 14, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
    <div>
      <h3 style={{ margin: 0, fontFamily: FA.display, fontSize: 19, fontWeight: 600, color: P.text, letterSpacing: '-0.018em' }}>{title}</h3>
      {sub && <div style={{ fontSize: 12, color: P.text3, marginTop: 3 }}>{sub}</div>}
    </div>
    {action || <button style={{ fontSize: 11.5, color: P.text3, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: FA.sans }}>View all →</button>}
  </div>
);

const StatPill = ({ label, value, unit, trend, color = P.text, sparkColor }) => (
  <CardA style={{ padding: 16 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.22em', color: P.text4, textTransform: 'uppercase', fontFamily: FA.mono }}>{label}</div>
      {trend && <span style={{ fontSize: 10, color: P.text4, fontFamily: FA.mono }}>{trend}</span>}
    </div>
    <div style={{ marginTop: 10, fontFamily: FA.mono, fontSize: 22, fontWeight: 700, color, letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums', lineHeight: 1, textShadow: `0 0 24px ${color}22` }}>
      {typeof value === 'number' ? fmt(value) : value}
      {unit && <span style={{ fontSize: 11, color: P.text3, fontWeight: 400, marginLeft: 5, letterSpacing: 0 }}>{unit}</span>}
    </div>
    {sparkColor && <div style={{ marginTop: 10 }}><Spark data={genSpark(20, 0.2)} color={sparkColor} width={300} height={26} /></div>}
  </CardA>
);

Object.assign(window, { SidebarA, HeaderA, ScreenA, CardA, SectionTitle, StatPill });
