// Direction A v2 — Globe screen (immersive)
const PG = window.GS_PALETTE_A;
const FG = window.GS_FONTS_A;

const GlobeScreenA = () => (
  <div style={{ padding: '28px 32px 56px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 22, height: 'calc(100% - 0px)' }}>
    {/* Left: Globe stage */}
    <div style={{
      position: 'relative', borderRadius: 24, overflow: 'hidden',
      border: `1px solid ${PG.line}`,
      background: `radial-gradient(ellipse at 50% 50%, ${PG.bg2} 0%, ${PG.bg0} 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: `0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
    }}>
      {/* Star field */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }}>
        {Array.from({ length: 80 }).map((_, i) => {
          const x = (i * 73 + 41) % 100;
          const y = (i * 31 + 17) % 100;
          const s = (i % 3) + 0.5;
          return <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: s, height: s, borderRadius: '50%', background: PG.cream, boxShadow: `0 0 ${s*2}px ${PG.cream}` }} />;
        })}
      </div>

      <window.PhotorealEarth size={580} glowAccent={PG.accent} spinSpeed={0.05} />

      {/* Top-left layer pill */}
      <div style={{ position: 'absolute', top: 18, left: 18, padding: '8px 14px', borderRadius: 999, background: 'rgba(27,26,24,0.7)', border: `1px solid ${PG.line}`, fontSize: 10.5, fontFamily: FG.mono, letterSpacing: '0.2em', color: PG.text2, backdropFilter: 'blur(20px)' }}>
        EARTH · LIVE · ORTHO
      </div>

      {/* Bottom layer toggle */}
      <div style={{ position: 'absolute', bottom: 18, left: 18, display: 'flex', gap: 4, padding: 4, borderRadius: 12, background: 'rgba(27,26,24,0.7)', border: `1px solid ${PG.line}`, backdropFilter: 'blur(20px)' }}>
        {['Quakes','Power','Markets','Air','ISS','News'].map((l,i) => (
          <button key={l} style={{
            padding: '6px 12px', borderRadius: 9,
            background: i === 0 ? `linear-gradient(180deg, ${PG.accentHi}, ${PG.accentLo})` : 'transparent',
            border: 'none', color: i === 0 ? PG.bg0 : PG.text2,
            fontSize: 11.5, fontWeight: 600, cursor: 'pointer', fontFamily: FG.sans,
            boxShadow: i === 0 ? `0 2px 8px ${PG.accent}55` : 'none',
          }}>{l}</button>
        ))}
      </div>

      {/* Zoom controls */}
      <div style={{ position: 'absolute', bottom: 18, right: 18, display: 'flex', flexDirection: 'column', gap: 4, padding: 4, borderRadius: 12, background: 'rgba(27,26,24,0.7)', border: `1px solid ${PG.line}`, backdropFilter: 'blur(20px)' }}>
        {['+','−','◐','⌖'].map(s => (
          <button key={s} style={{ width: 30, height: 30, borderRadius: 8, background: 'transparent', border: 'none', color: PG.text2, cursor: 'pointer', fontSize: 13 }}>{s}</button>
        ))}
      </div>
    </div>

    {/* Right rail */}
    <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
      <window.CardA glow>
        <div style={{ fontSize: 9.5, color: PG.text4, letterSpacing: '0.22em', fontFamily: FG.mono, textTransform: 'uppercase' }}>SELECTED REGION</div>
        <div style={{ fontFamily: FG.display, fontSize: 24, fontWeight: 600, marginTop: 6, letterSpacing: '-0.02em' }}>Western Pacific</div>
        <div style={{ fontSize: 11.5, color: PG.text4, fontFamily: FG.mono, marginTop: 2 }}>−29.4° · 177.8° W</div>
        <div style={{ marginTop: 16, display: 'grid', gap: 9 }}>
          {[
            ['Active quakes', '12', PG.ember],
            ['Tsunami watch', '1', PG.ember],
            ['Power grids', '3 nominal', PG.sage],
            ['Vessels tracked', '142', PG.cream],
            ['Storms in basin', '0', PG.text2],
          ].map(([l, v, c]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 12.5, paddingBottom: 8, borderBottom: `1px dashed ${PG.line}` }}>
              <span style={{ color: PG.text3 }}>{l}</span>
              <span style={{ color: c, fontWeight: 600, fontFamily: FG.mono }}>{v}</span>
            </div>
          ))}
        </div>
      </window.CardA>

      <window.CardA>
        <div style={{ fontSize: 9.5, color: PG.text4, letterSpacing: '0.22em', fontFamily: FG.mono, textTransform: 'uppercase', marginBottom: 10 }}>NEARBY EVENTS</div>
        {[
          { m: 6.4, p: 'Kermadec Islands', t: '14m ago' },
          { m: 5.1, p: 'Tonga', t: '1h ago' },
          { m: 4.8, p: 'Samoa', t: '2h ago' },
          { m: 4.2, p: 'Fiji', t: '4h ago' },
        ].map((q, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderTop: i ? `1px solid ${PG.line}` : 'none' }}>
            <div style={{ fontFamily: FG.mono, fontSize: 20, fontWeight: 700, color: q.m >= 6 ? PG.ember : q.m >= 5 ? PG.amber : PG.text2, width: 44, textShadow: q.m >= 6 ? `0 0 12px ${PG.ember}55` : 'none' }}>{q.m}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: PG.text }}>{q.p}</div>
              <div style={{ fontSize: 10.5, color: PG.text4, fontFamily: FG.mono, marginTop: 1 }}>{q.t}</div>
            </div>
          </div>
        ))}
      </window.CardA>

      <window.CardA>
        <div style={{ fontSize: 9.5, color: PG.text4, letterSpacing: '0.22em', fontFamily: FG.mono, textTransform: 'uppercase', marginBottom: 10 }}>SATELLITES OVERHEAD</div>
        {['ISS · 408 km','Hubble · 547 km','Starlink-1283','Sentinel-6'].map(s => (
          <div key={s} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', fontSize: 12, color: PG.text2, borderTop: `1px solid ${PG.line}`, fontFamily: FG.mono }}>
            <span>{s}</span><span style={{ color: PG.sage }}>● live</span>
          </div>
        ))}
      </window.CardA>
    </div>
  </div>
);

window.GlobeScreenA = GlobeScreenA;
