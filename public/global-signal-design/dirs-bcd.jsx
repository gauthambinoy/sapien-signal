// Direction B: Newspaper Atlas — paper, serif, editorial print feel
// Direction C: Hacker Terminal — dense, monospace, green-on-black
// Direction D: Aurora Spatial — glowy, dark purple, canvas-style

const { useState: useStateB, useEffect: useEffectB } = React;

// ═══════════════════════════════════════════════════════
// DIRECTION B: NEWSPAPER ATLAS
// ═══════════════════════════════════════════════════════
const NewspaperAtlas = () => {
  const T = window.GS_TOKENS.paper;
  return (
    <div style={{
      width: '100%', height: '100%', overflowY: 'auto',
      background: T.bg0, color: T.text,
      fontFamily: window.GS_FONTS.newspaper,
    }}>
      {/* Masthead */}
      <div style={{ borderBottom: `4px double ${T.text}`, padding: '24px 36px 16px', textAlign: 'center', background: T.bg1 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.5em', fontFamily: window.GS_FONTS.sans, fontWeight: 600, color: T.text2 }}>VOL. MMXXVI · NO. 119 · WEDNESDAY APRIL 29, 2026 · ALL EDITIONS</div>
        <h1 style={{ margin: '8px 0', fontFamily: window.GS_FONTS.newspaper, fontSize: 64, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}>The Global Signal</h1>
        <div style={{ fontSize: 11, fontStyle: 'italic', color: T.text3, fontFamily: window.GS_FONTS.newspaper }}>"All the data the planet sends — synthesized, validated, on one page."</div>
      </div>

      {/* Top nav strip */}
      <div style={{ display: 'flex', gap: 22, justifyContent: 'center', padding: '10px 0', borderBottom: `1px solid ${T.text}`, fontSize: 11, fontWeight: 600, fontFamily: window.GS_FONTS.sans, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        {['Front','Earth','Markets','Society','Space','Tech','Briefing','Tools','Archive'].map((l, i) => (
          <span key={l} style={{ color: i === 0 ? T.accent : T.text2, borderBottom: i === 0 ? `2px solid ${T.accent}` : 'none', paddingBottom: 2, cursor: 'pointer' }}>{l}</span>
        ))}
      </div>

      {/* Grid: 3-col newspaper */}
      <div style={{ padding: '28px 40px 60px', display: 'grid', gridTemplateColumns: '1.6fr 2.2fr 1.2fr', gap: 32 }}>
        {/* LEFT: counters + small cards */}
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', fontFamily: window.GS_FONTS.sans, fontWeight: 700, paddingBottom: 8, borderBottom: `2px solid ${T.text}`, marginBottom: 12 }}>WORLD COUNTERS · LIVE</div>
          {[
            { l: 'Population', v: '8.13 B', sub: '+147 / sec' },
            { l: 'Atmospheric CO₂', v: '421.7 ppm', sub: 'Mauna Loa' },
            { l: 'Energy YTD', v: '14.2 TWh', sub: 'IEA' },
            { l: 'Births today', v: '285,430', sub: 'WHO' },
            { l: 'Crypto mkt cap', v: '$2.42 T', sub: '+1.2%' },
          ].map((s, i) => (
            <div key={s.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', borderBottom: `1px dotted ${T.text2}` }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{s.l}</div>
                <div style={{ fontSize: 10.5, color: T.text3, fontFamily: window.GS_FONTS.sans, fontStyle: 'italic' }}>{s.sub}</div>
              </div>
              <div style={{ fontFamily: window.GS_FONTS.mono, fontSize: 18, fontWeight: 700, color: T.accent }}>{s.v}</div>
            </div>
          ))}

          <div style={{ marginTop: 24, fontSize: 10, letterSpacing: '0.3em', fontFamily: window.GS_FONTS.sans, fontWeight: 700, paddingBottom: 8, borderBottom: `2px solid ${T.text}`, marginBottom: 12 }}>SEISMIC DESK</div>
          {[
            { m: 6.4, p: 'Kermadec Is.' },
            { m: 5.8, p: 'Honshu coast' },
            { m: 5.2, p: 'Aleutian Arc' },
            { m: 4.9, p: 'Central Chile' },
          ].map((q, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${T.border}` }}>
              <div style={{ fontFamily: window.GS_FONTS.mono, fontSize: 22, fontWeight: 800, color: q.m >= 6 ? T.accent : T.text }}>{q.m}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: T.text }}>{q.p}</div>
                <div style={{ fontSize: 10, color: T.text3, fontFamily: window.GS_FONTS.sans }}>{Math.floor(Math.random()*60)}m ago</div>
              </div>
            </div>
          ))}
        </div>

        {/* CENTER: lead story + map */}
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', fontFamily: window.GS_FONTS.sans, fontWeight: 700, color: T.accent, paddingBottom: 8, marginBottom: 8 }}>FRONT PAGE · INTELLIGENCE BRIEFING</div>
          <h2 style={{ margin: 0, fontFamily: window.GS_FONTS.newspaper, fontSize: 52, fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.02em' }}>A quiet day, punctuated by a Pacific quake and a European heat dome.</h2>
          <div style={{ marginTop: 8, fontSize: 13, color: T.text3, fontStyle: 'italic', fontFamily: window.GS_FONTS.newspaper }}>By the AI Briefing Desk · Synthesized from 14 live sources at 06:00 UTC</div>

          {/* Drop-cap body */}
          <div style={{ marginTop: 18, fontSize: 14.5, lineHeight: 1.7, color: T.text, columnCount: 2, columnGap: 24, columnRule: `1px solid ${T.text2}33`, fontFamily: window.GS_FONTS.newspaper }}>
            <p style={{ margin: 0 }}><span style={{ float: 'left', fontFamily: window.GS_FONTS.newspaper, fontSize: 64, lineHeight: 0.85, fontWeight: 900, paddingRight: 8, paddingTop: 6, color: T.accent }}>T</span>he morning's signal is dominated by physical-world stress. A magnitude-6.4 in the Kermadec trench triggered a Pacific tsunami watch; aftershocks continued through the night. Markets, by contrast, are calm — Bitcoin nudged 1.8% higher, and S&P futures held flat ahead of the Fed minutes.</p>
            <p>Across Western Europe, day four of the heat dome brought three grid-stress alerts. Air-conditioning load curves now correlate at <strong>0.92</strong> with the regional heat index — the strongest reading since the system began tracking the relationship.</p>
            <p>Watch the next 24 hours of Pacific aftershocks and EU grid demand. Both are non-linear systems; both are loaded.</p>
          </div>

          {/* Map */}
          <div style={{ marginTop: 24, padding: 14, border: `2px solid ${T.text}`, background: T.card }}>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', fontFamily: window.GS_FONTS.sans, fontWeight: 700, marginBottom: 8 }}>WORLD AT A GLANCE · 24 HOURS</div>
            <SimpleWorldMap height={260} theme="paper" accent={T.accent} markers={[
              { x: 220, y: 180, color: T.accent, r: 7 },
              { x: 700, y: 160, color: T.text, r: 5 },
              { x: 850, y: 180, color: T.accent, r: 6 },
              { x: 280, y: 320, color: T.text2, r: 4 },
              { x: 600, y: 240, color: T.accent, r: 5 },
            ]} />
            <div style={{ marginTop: 10, fontSize: 10.5, color: T.text3, fontFamily: window.GS_FONTS.sans, fontStyle: 'italic', textAlign: 'center' }}>Fig. 1 — Significant events plotted on equirectangular projection. Source: USGS, IEA, OpenAQ.</div>
          </div>
        </div>

        {/* RIGHT: vertical mini-stories */}
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', fontFamily: window.GS_FONTS.sans, fontWeight: 700, paddingBottom: 8, borderBottom: `2px solid ${T.text}`, marginBottom: 12 }}>BY THE NUMBERS</div>
          {[
            { t: 'Markets', h: '$2.42T', sub: 'Total crypto market capitalization', tag: 'CRYPTO' },
            { t: 'Health', h: '0', sub: 'New WHO emergency designations', tag: 'GLOBAL' },
            { t: 'Space', h: '21:14 PT', sub: 'Tonight\'s ISS pass over Western US', tag: 'ORBITAL' },
            { t: 'Tech', h: '142', sub: 'Stories trending across Hacker News + Reddit', tag: 'PULSE' },
          ].map(s => (
            <div key={s.t} style={{ padding: '14px 0', borderBottom: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 9, letterSpacing: '0.25em', fontFamily: window.GS_FONTS.sans, fontWeight: 700, color: T.accent, textTransform: 'uppercase' }}>{s.tag}</div>
              <div style={{ marginTop: 4, fontFamily: window.GS_FONTS.newspaper, fontSize: 32, fontWeight: 900, color: T.text, lineHeight: 1 }}>{s.h}</div>
              <div style={{ marginTop: 6, fontSize: 12, color: T.text2, fontStyle: 'italic', fontFamily: window.GS_FONTS.newspaper, lineHeight: 1.4 }}>{s.sub}</div>
            </div>
          ))}

          <div style={{ marginTop: 16, padding: 14, background: T.text, color: T.bg1 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', fontFamily: window.GS_FONTS.sans, fontWeight: 700, opacity: 0.6 }}>OPINION</div>
            <div style={{ marginTop: 6, fontFamily: window.GS_FONTS.newspaper, fontSize: 16, lineHeight: 1.4, fontStyle: 'italic' }}>"Markets are calm; the planet is not. The 24-hour gap between a tremor and a trade is closing."</div>
            <div style={{ marginTop: 10, fontSize: 10, opacity: 0.5, fontFamily: window.GS_FONTS.sans, letterSpacing: '0.16em' }}>— THE EDITOR</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// DIRECTION C: HACKER TERMINAL
// ═══════════════════════════════════════════════════════
const HackerTerminal = () => {
  const T = window.GS_TOKENS.terminal;
  const [tick, setTick] = useStateB(0);
  useEffectB(() => { const t = setInterval(() => setTick(x => x + 1), 1000); return () => clearInterval(t); }, []);

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'hidden',
      background: T.bg0, color: T.text, fontFamily: window.GS_FONTS.mono, fontSize: 12,
      display: 'flex', flexDirection: 'column',
      backgroundImage: `repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0,255,102,0.02) 2px, rgba(0,255,102,0.02) 3px)`,
    }}>
      {/* Top status bar */}
      <div style={{ padding: '6px 14px', borderBottom: `1px solid ${T.border}`, display: 'flex', gap: 24, fontSize: 10.5 }}>
        <span style={{ color: T.accent }}>● GLOBAL_SIGNAL.SYS</span>
        <span style={{ color: T.text2 }}>UPTIME 04:18:33</span>
        <span style={{ color: T.text2 }}>STREAMS 14/14</span>
        <span style={{ color: T.text2 }}>LATENCY 28ms</span>
        <span style={{ color: T.text2 }}>API_CALLS {fmt(847230 + tick * 4)}</span>
        <span style={{ marginLeft: 'auto', color: T.amber }}>◈ 2 ALERTS</span>
        <span style={{ color: T.accent }}>{new Date().toLocaleTimeString('en-GB')}</span>
      </div>

      {/* Layout: nav | main | side */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '180px 1fr 280px', overflow: 'hidden' }}>
        {/* Nav */}
        <div style={{ borderRight: `1px solid ${T.border}`, padding: '10px 0', overflowY: 'auto' }}>
          <div style={{ padding: '4px 14px', fontSize: 9, letterSpacing: '0.2em', color: T.text3 }}>// MODULES</div>
          {window.GS_TABS.map((tab, i) => (
            <div key={tab.id} style={{ padding: '4px 14px', color: i === 0 ? T.accent : T.text2, background: i === 0 ? `${T.accent}11` : 'transparent', borderLeft: i === 0 ? `2px solid ${T.accent}` : '2px solid transparent', cursor: 'pointer' }}>
              <span style={{ width: 24, display: 'inline-block', color: T.text3 }}>[{String(i+1).padStart(2,'0')}]</span>
              {tab.label.toLowerCase().replace(/ /g, '_')}
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ padding: 14, overflowY: 'auto', borderRight: `1px solid ${T.border}` }}>
          <div style={{ color: T.accent, marginBottom: 8 }}>{'>'} ./global-signal --module=overview --realtime</div>
          <div style={{ color: T.text3, marginBottom: 12 }}>{'/* connecting to 14 streams... OK */'}</div>

          <pre style={{ margin: 0, color: T.accent, lineHeight: 1.3, fontSize: 11 }}>{
`╔═══════════════════════════════════════════════════════════════╗
║  GLOBAL SIGNAL — ORBITAL COMMAND VIEW                         ║
║  ─────────────────────────────────────────────────────────── ║
║  TIMESTAMP : ${new Date().toISOString()}                  ║
║  STATUS    : NOMINAL · 14 STREAMS · 200 APIs · 0 BREAKERS   ║
╚═══════════════════════════════════════════════════════════════╝`
          }</pre>

          <div style={{ marginTop: 16 }}>
            <div style={{ color: T.amber, marginBottom: 6 }}>┌── LIVE_COUNTERS ─────────────────────────────────┐</div>
            {[
              ['POPULATION       ', fmt(8127845632 + tick * 4), 'people'],
              ['CO2_PPM          ', '421.72', 'ppm'],
              ['ENERGY_YTD_MWH   ', fmt(2.4e12 + tick * 924147), 'MWh'],
              ['LIGHTNING_TODAY  ', fmt(2400000 + tick * 30), 'strikes'],
              ['BTC_USD          ', '94,247.18', 'USD'],
              ['ISS_LAT_LON      ', '34.21°, -118.45°', '·'],
            ].map(([l, v, u]) => (
              <div key={l} style={{ display: 'flex', gap: 12, padding: '2px 0' }}>
                <span style={{ color: T.text3 }}>│</span>
                <span style={{ color: T.text2, width: 180 }}>{l}</span>
                <span style={{ color: T.accent, width: 200, textAlign: 'right' }}>{v}</span>
                <span style={{ color: T.text3 }}>{u}</span>
                <span style={{ marginLeft: 'auto', color: T.text3 }}>│</span>
              </div>
            ))}
            <div style={{ color: T.amber }}>└────────────────────────────────────────────────────┘</div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ color: T.amber, marginBottom: 6 }}>┌── SEISMIC_FEED · usgs.gov ───────────────────────┐</div>
            {[
              { m: 6.4, p: 'KERMADEC_IS_NZ', d: '35km', t: '14m', flag: 'TSUNAMI' },
              { m: 5.8, p: 'HONSHU_COAST_JP', d: '12km', t: '01h', flag: '' },
              { m: 5.2, p: 'ALEUTIAN_AK_US', d: '88km', t: '02h', flag: '' },
              { m: 4.9, p: 'CHILE_CENTRAL', d: '42km', t: '03h', flag: '' },
            ].map((q, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '2px 0' }}>
                <span style={{ color: T.text3 }}>│</span>
                <span style={{ color: q.m >= 6 ? T.red : q.m >= 5 ? T.amber : T.accent, width: 50 }}>M{q.m.toFixed(1)}</span>
                <span style={{ color: T.text2, width: 200 }}>{q.p}</span>
                <span style={{ color: T.text3, width: 60 }}>{q.d}</span>
                <span style={{ color: T.text3, width: 50 }}>{q.t}</span>
                <span style={{ color: q.flag ? T.red : T.text3 }}>{q.flag}</span>
                <span style={{ marginLeft: 'auto', color: T.text3 }}>│</span>
              </div>
            ))}
            <div style={{ color: T.amber }}>└────────────────────────────────────────────────────┘</div>
          </div>

          <div style={{ marginTop: 14, color: T.text2 }}>{'>'} <span style={{ background: T.accent, color: '#000', padding: '0 4px' }}> </span></div>
        </div>

        {/* Side: AI chat */}
        <div style={{ padding: 12, overflowY: 'auto' }}>
          <div style={{ color: T.text3, fontSize: 9, letterSpacing: '0.2em', marginBottom: 8 }}>// AI_QUERY · CLAUDE</div>
          <div style={{ padding: 8, background: `${T.accent}08`, border: `1px solid ${T.accent}33`, marginBottom: 8 }}>
            <div style={{ color: T.accent, fontSize: 10, marginBottom: 4 }}>{'>'} user@gs:</div>
            <div style={{ color: T.text }}>summarize last 24h</div>
          </div>
          <div style={{ padding: 8, background: T.card, border: `1px solid ${T.border}`, marginBottom: 8 }}>
            <div style={{ color: T.amber, fontSize: 10, marginBottom: 4 }}>{'<'} claude:</div>
            <div style={{ color: T.text2, lineHeight: 1.5, fontSize: 11 }}>
              kermadec m6.4 → tsunami watch sw_pac.<br/>
              eu heat_dome day_4, 3 grid_alerts.<br/>
              btc +1.8%, eth flat. crude +2.3%.<br/>
              risk_index = 6.3 ↑0.4
            </div>
          </div>
          <div style={{ padding: 8, background: `${T.accent}08`, border: `1px solid ${T.accent}33`, marginBottom: 8 }}>
            <div style={{ color: T.accent, fontSize: 10, marginBottom: 4 }}>{'>'} user@gs:</div>
            <div style={{ color: T.text }}>correlate eu_heat eu_demand</div>
          </div>
          <div style={{ padding: 8, background: T.card, border: `1px solid ${T.border}` }}>
            <div style={{ color: T.amber, fontSize: 10, marginBottom: 4 }}>{'<'} claude:</div>
            <div style={{ color: T.text2, lineHeight: 1.5, fontSize: 11 }}>
              pearson_r = +0.92 (30d)<br/>
              extreme coupling.<br/>
              <span style={{ color: T.accent }}>RECOMMENDATION:</span> hedge eu_power exposure.
            </div>
          </div>

          <div style={{ marginTop: 14, padding: '6px 8px', border: `1px solid ${T.accent}`, background: '#000', color: T.accent }}>
            {'>'} _<span style={{ animation: 'gsBlink 1s steps(2) infinite' }}>█</span>
          </div>
        </div>
      </div>

      {/* Bottom shortcuts */}
      <div style={{ padding: '6px 14px', borderTop: `1px solid ${T.border}`, fontSize: 10.5, display: 'flex', gap: 16, color: T.text3 }}>
        {[['^K','search'],['^J','ai'],['^G','globe'],['^M','map'],['^/','help'],['ESC','exit']].map(([k, l]) => (
          <span key={k}><span style={{ color: T.accent }}>{k}</span> {l}</span>
        ))}
        <span style={{ marginLeft: 'auto', color: T.amber }}>HEALTH 100% · CIRCUIT_BREAKERS 0 OPEN</span>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// DIRECTION D: AURORA SPATIAL CANVAS
// ═══════════════════════════════════════════════════════
const AuroraSpatial = () => {
  const T = window.GS_TOKENS.aurora;
  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'hidden', position: 'relative',
      background: `radial-gradient(ellipse at 30% 20%, #2A0F4E 0%, ${T.bg0} 50%), radial-gradient(ellipse at 80% 80%, #4A1A5E 0%, ${T.bg0} 50%)`,
      color: T.text, fontFamily: window.GS_FONTS.sans,
    }}>
      {/* Aurora particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4 }}>
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}55, transparent 70%)`, filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${T.pink}44, transparent 70%)`, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', top: '40%', left: '50%', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${T.cyan}33, transparent 70%)`, filter: 'blur(60px)' }} />
      </div>

      {/* Floating dock */}
      <div style={{
        position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 4, padding: 6, borderRadius: 999,
        background: 'rgba(15,8,30,0.6)', backdropFilter: 'blur(20px)',
        border: `1px solid ${T.border}`, zIndex: 10,
      }}>
        {window.GS_TABS.slice(0, 9).map((tab, i) => (
          <button key={tab.id} style={{
            padding: '8px 12px', borderRadius: 999, border: 'none', cursor: 'pointer',
            background: i === 0 ? `linear-gradient(135deg, ${T.accent}, ${T.pink})` : 'transparent',
            color: i === 0 ? '#fff' : T.text2, fontSize: 12, fontWeight: 500, fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Center globe */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.4em', color: T.text3, marginBottom: 14 }}>EARTH · LIVE</div>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <MiniGlobe size={420} accent={T.accent} />
          {/* Aurora ring */}
          <div style={{
            position: 'absolute', inset: -30, borderRadius: '50%', pointerEvents: 'none',
            background: `conic-gradient(from 0deg, ${T.accent}, ${T.pink}, ${T.cyan}, ${T.accent})`,
            filter: 'blur(20px)', opacity: 0.4, zIndex: -1,
          }} />
        </div>
        <div style={{ marginTop: 16, fontFamily: window.GS_FONTS.display, fontSize: 56, fontWeight: 600, letterSpacing: '-0.04em', background: `linear-gradient(135deg, ${T.accent}, ${T.cyan}, ${T.pink})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          8,127,845,632
        </div>
        <div style={{ fontSize: 12, color: T.text3, letterSpacing: '0.3em', marginTop: -6 }}>HUMANS · +147 / sec</div>
      </div>

      {/* Floating cards */}
      {[
        { x: '5%', y: '20%', t: 'Seismic', v: '247', s: 'last 24h', c: T.accent, w: 180 },
        { x: '5%', y: '50%', t: 'Markets', v: '$2.42T', s: 'crypto cap', c: T.cyan, w: 180 },
        { x: '5%', y: '78%', t: 'Energy', v: '14.2 TWh', s: 'YTD', c: T.pink, w: 180 },
        { x: '78%', y: '20%', t: 'CO₂', v: '421.7 ppm', s: 'Mauna Loa', c: T.cyan, w: 180 },
        { x: '78%', y: '50%', t: 'ISS', v: '21:14 PT', s: 'next pass', c: T.accent, w: 180 },
        { x: '78%', y: '78%', t: 'Tech Pulse', v: '142', s: 'stories', c: T.pink, w: 180 },
      ].map((c, i) => (
        <div key={i} style={{
          position: 'absolute', left: c.x, top: c.y, width: c.w,
          padding: 16, borderRadius: 18, background: 'rgba(20,10,40,0.5)',
          backdropFilter: 'blur(24px)', border: `1px solid ${c.c}33`,
          boxShadow: `0 0 30px ${c.c}22, inset 0 1px 0 rgba(255,255,255,0.06)`,
        }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.25em', color: c.c, fontFamily: window.GS_FONTS.mono, textTransform: 'uppercase' }}>{c.t}</div>
          <div style={{ marginTop: 10, fontFamily: window.GS_FONTS.display, fontSize: 28, fontWeight: 700, color: T.text, letterSpacing: '-0.02em' }}>{c.v}</div>
          <div style={{ marginTop: 4, fontSize: 11, color: T.text3 }}>{c.s}</div>
        </div>
      ))}

      {/* Bottom AI prompt bar */}
      <div style={{
        position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        width: 520, padding: 8, borderRadius: 999,
        background: 'rgba(15,8,30,0.7)', backdropFilter: 'blur(24px)',
        border: `1px solid ${T.accent}55`, display: 'flex', gap: 10, alignItems: 'center',
        boxShadow: `0 0 40px ${T.accent}22`,
      }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${T.accent}, ${T.pink})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#fff' }}>✦</div>
        <input placeholder="Ask anything about the world..." style={{ flex: 1, background: 'transparent', border: 'none', color: T.text, fontSize: 13.5, outline: 'none', fontFamily: 'inherit' }} />
        <kbd style={{ fontSize: 9, color: T.text3, padding: '3px 7px', borderRadius: 6, border: `1px solid ${T.border}`, fontFamily: window.GS_FONTS.mono }}>⌘J</kbd>
      </div>
    </div>
  );
};

window.NewspaperAtlas = NewspaperAtlas;
window.HackerTerminal = HackerTerminal;
window.AuroraSpatial = AuroraSpatial;
