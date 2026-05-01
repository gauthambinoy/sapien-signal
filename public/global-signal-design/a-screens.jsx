// Direction A v2 — Briefing, Quakes, Markets, Correlator, Time Machine, Alerts, System
const PB = window.GS_PALETTE_A;
const FB = window.GS_FONTS_A;

// ── Briefing ─────────────────────────────────────────────
const BriefingA = () => {
  const sections = [
    { ic: '◬', title: 'Earth Systems', tone: 'elevated', body: 'Seismic activity is elevated with a M6.4 in Kermadec and aftershock cluster. Tsunami watch active for SW Pacific. Air quality deteriorated across Northern India (PM2.5 >180 µg/m³). Heat dome enters day 4 over Western Europe — three grid stress alerts.', tags: ['M6.4 NZ', 'Air: Delhi', 'Heat: EU'] },
    { ic: '$', title: 'Markets & Money', tone: 'mixed', body: 'BTC up 1.8% to $94.2K; ETH flat. Crude +2.3% on Mid-East tension. EUR/USD steady at 1.083. S&P futures unchanged ahead of Fed minutes. VIX at 14.2, complacency reading.', tags: ['BTC +1.8', 'Brent +2.3', 'VIX 14'] },
    { ic: '+', title: 'Public Health', tone: 'calm', body: 'No new WHO emergency designations. Influenza activity declining in Northern Hemisphere. Avian flu surveillance expanded across Pacific flyway. COVID variants stable.', tags: ['Flu ↓', 'H5N1 watch'] },
    { ic: '◌', title: 'Space', tone: 'normal', body: 'ISS visible passes over Western US tonight 21:14 PT. Two SpaceX launches scheduled this week. Solar wind speed nominal. Geomagnetic Kp index = 2.', tags: ['ISS pass', 'Kp 2'] },
    { ic: '⌘', title: 'Tech & Society', tone: 'normal', body: '142 stories trending; centered on AI policy in EU and a major outage at a tier-1 cloud provider (resolved). Hacker News front page is dominated by infrastructure topics.', tags: ['EU AI Act', 'Cloud outage'] },
  ];
  const tone = t => t === 'elevated' ? PB.ember : t === 'mixed' ? PB.amber : t === 'calm' ? PB.sage : PB.text2;
  return (
    <div style={{ padding: '32px 40px 60px', maxWidth: 1080, margin: '0 auto', display: 'grid', gap: 20 }}>
      <div style={{ borderRadius: 22, border: `1px solid ${PB.line}`, background: `linear-gradient(135deg, ${PB.bg2}, ${PB.bg1})`, padding: '36px 40px', position: 'relative', overflow: 'hidden', boxShadow: `0 24px 60px rgba(0,0,0,0.4)` }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, background: `radial-gradient(circle, ${PB.accent}30, transparent 70%)` }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.3em', color: PB.accent, fontFamily: FB.mono }}>DAILY BRIEFING · 06:00 UTC</span>
            <window.LiveTag color={PB.gold} label="UPDATED 14s" />
          </div>
          <h1 style={{ margin: 0, fontFamily: FB.display, fontSize: 52, lineHeight: 1.04, fontWeight: 500, letterSpacing: '-0.035em', color: PB.text }}>
            A quiet day, <em style={{ color: PB.accent, fontStyle: 'italic' }}>punctuated</em> by a Kermadec quake and a European heat dome.
          </h1>
          <p style={{ marginTop: 20, fontFamily: FB.serif, fontSize: 18.5, lineHeight: 1.55, color: PB.text2, fontStyle: 'italic', maxWidth: 720 }}>
            "The signal is dominated by physical-world stress this morning. Markets are calm; the planet is not. Watch the next 24 hours of Pacific aftershocks and EU grid demand curves."
          </p>
          <div style={{ marginTop: 22, display: 'flex', gap: 12, alignItems: 'center', fontSize: 11.5, color: PB.text3, fontFamily: FB.mono }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: `linear-gradient(135deg, ${PB.accentHi}, ${PB.accentLo})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: PB.bg0, boxShadow: `0 4px 14px ${PB.accent}55` }}>✦</div>
            <span style={{ color: PB.text2 }}>Synthesized by Claude</span> · 14 sources · 18s ago
          </div>
        </div>
      </div>

      {sections.map(s => (
        <div key={s.title} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 32, padding: '20px 0', borderTop: `1px solid ${PB.line}` }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: tone(s.tone), fontSize: 16 }}>{s.ic}</span>
              <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.22em', color: tone(s.tone), fontFamily: FB.mono, textTransform: 'uppercase' }}>{s.tone}</span>
            </div>
            <h3 style={{ margin: '8px 0 0', fontFamily: FB.display, fontSize: 23, fontWeight: 600, color: PB.text, letterSpacing: '-0.025em' }}>{s.title}</h3>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: PB.text2, fontFamily: FB.serif }}>{s.body}</p>
            <div style={{ marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {s.tags.map(t => <span key={t} style={{ fontSize: 11, fontFamily: FB.mono, padding: '4px 10px', borderRadius: 999, background: PB.card, border: `1px solid ${PB.line}`, color: PB.text3 }}>{t}</span>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Quakes ───────────────────────────────────────────────
const QuakesA = () => {
  const quakes = [
    { mag: 6.4, place: 'Kermadec Islands, NZ', depth: 35, t: '14m ago', tsunami: true, lon: 178, lat: -29 },
    { mag: 5.8, place: 'Off coast of Honshu', depth: 12, t: '1h ago', tsunami: false, lon: 142, lat: 38 },
    { mag: 5.2, place: 'Aleutian Arc, AK', depth: 88, t: '2h ago', tsunami: false, lon: -150, lat: 55 },
    { mag: 4.9, place: 'Central Chile', depth: 42, t: '3h ago', tsunami: false, lon: -71, lat: -33 },
    { mag: 4.7, place: 'Iceland Reykjanes', depth: 8, t: '4h ago', tsunami: false, lon: -22, lat: 64 },
    { mag: 4.3, place: 'Greece, Aegean', depth: 22, t: '5h ago', tsunami: false, lon: 25, lat: 37 },
  ];
  const colorFor = m => m >= 6 ? PB.ember : m >= 5 ? PB.accent : m >= 4 ? PB.amber : PB.text3;
  return (
    <div style={{ padding: '28px 32px 56px', display: 'grid', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { l: 'Last 24h', v: 247, c: PB.text },
          { l: '≥ M5.0', v: 18, c: PB.amber },
          { l: '≥ M6.0', v: 3, c: PB.accent },
          { l: 'Tsunami watches', v: 1, c: PB.ember },
        ].map(s => (
          <window.StatPill key={s.l} label={s.l} value={s.v} color={s.c} sparkColor={s.c} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>
        <window.CardA padded={false} glow>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 22px 14px' }}>
            <div>
              <div style={{ fontFamily: FB.display, fontSize: 17, fontWeight: 600 }}>Global seismic activity · 30 days</div>
              <div style={{ fontSize: 11, color: PB.text3, marginTop: 2, fontFamily: FB.mono }}>Source: USGS</div>
            </div>
            <window.LiveTag color={PB.sage} />
          </div>
          <div style={{ padding: '0 12px 16px' }}>
            <window.PhotorealMap height={320} accent={PB.accent} markers={quakes.map(q => ({ lon: q.lon, lat: q.lat, color: colorFor(q.mag), r: Math.max(3, q.mag - 2) }))} />
          </div>
        </window.CardA>
        <window.CardA padded={false}>
          <div style={{ padding: '16px 18px', borderBottom: `1px solid ${PB.line}` }}>
            <div style={{ fontFamily: FB.display, fontSize: 16, fontWeight: 600 }}>Recent significant</div>
          </div>
          <div style={{ maxHeight: 360, overflowY: 'auto' }}>
            {quakes.map((q, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '52px 1fr auto', gap: 12, padding: '14px 18px', borderBottom: i < quakes.length - 1 ? `1px solid ${PB.line}` : 'none', alignItems: 'center' }}>
                <div style={{ fontFamily: FB.mono, fontSize: 24, fontWeight: 700, color: colorFor(q.mag), textShadow: `0 0 14px ${colorFor(q.mag)}55`, letterSpacing: '-0.02em' }}>{q.mag}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: PB.text }}>{q.place}</div>
                  <div style={{ fontSize: 10.5, color: PB.text4, fontFamily: FB.mono, marginTop: 2 }}>
                    {q.depth} km · {q.t}{q.tsunami && <span style={{ color: PB.ember, marginLeft: 8 }}>● TSUNAMI</span>}
                  </div>
                </div>
                <div style={{ color: PB.text4 }}>›</div>
              </div>
            ))}
          </div>
        </window.CardA>
      </div>
      <window.CardA>
        <div style={{ fontFamily: FB.display, fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Magnitude frequency · 30d</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
          {[120, 88, 64, 32, 18, 8, 3, 1].map((v, i) => {
            const c = i < 2 ? PB.text3 : i < 4 ? PB.amber : i < 6 ? PB.accent : PB.ember;
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ fontSize: 10, color: PB.text3, fontFamily: FB.mono }}>{v}</div>
                <div style={{ height: `${v}px`, width: '100%', borderRadius: '4px 4px 0 0', background: `linear-gradient(180deg, ${c}, ${c}55)`, boxShadow: `0 0 12px ${c}33` }} />
                <div style={{ fontSize: 10, color: PB.text4, fontFamily: FB.mono }}>M{i+2}</div>
              </div>
            );
          })}
        </div>
      </window.CardA>
    </div>
  );
};

// ── Markets ──────────────────────────────────────────────
const MarketsA = () => {
  const coins = [
    { sym: 'BTC', name: 'Bitcoin', price: 94250, ch: 1.84, mc: 1.85e12, c: '#F7931A' },
    { sym: 'ETH', name: 'Ethereum', price: 3245, ch: 0.92, mc: 390e9, c: '#7B8EE0' },
    { sym: 'SOL', name: 'Solana', price: 178.4, ch: -2.34, mc: 84e9, c: PB.plum },
    { sym: 'BNB', name: 'BNB', price: 612, ch: 0.21, mc: 89e9, c: PB.gold },
    { sym: 'XRP', name: 'XRP', price: 0.612, ch: 4.18, mc: 33e9, c: PB.text3 },
    { sym: 'ADA', name: 'Cardano', price: 0.488, ch: -1.05, mc: 17e9, c: PB.azure },
    { sym: 'DOGE', name: 'Dogecoin', price: 0.142, ch: 0.55, mc: 20e9, c: PB.amber },
    { sym: 'AVAX', name: 'Avalanche', price: 38.4, ch: -3.14, mc: 14e9, c: PB.ember },
  ];
  return (
    <div style={{ padding: '28px 32px 56px', display: 'grid', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { l: 'Total mkt cap', v: '$2.42T', c: PB.cream, t: '+1.2%' },
          { l: '24h volume', v: '$118B', c: PB.text, t: '+8.4%' },
          { l: 'BTC dominance', v: '54.2%', c: PB.amber, t: '+0.3%' },
          { l: 'Fear & Greed', v: '52', c: PB.sage, t: 'Neutral' },
        ].map(s => <window.StatPill key={s.l} label={s.l} value={s.v} color={s.c} trend={s.t} />)}
      </div>
      <window.CardA padded={false} glow>
        <div style={{ padding: '18px 22px', borderBottom: `1px solid ${PB.line}`, display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: FB.display, fontSize: 19, fontWeight: 600, letterSpacing: '-0.018em' }}>Top crypto markets</div>
          <window.LiveTag color={PB.sage} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 110px 90px 110px 150px 120px', padding: '12px 22px', fontSize: 9.5, color: PB.text4, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: FB.mono, borderBottom: `1px solid ${PB.line}` }}>
          <div>#</div><div>Asset</div><div style={{ textAlign: 'right' }}>Price</div><div style={{ textAlign: 'right' }}>24h</div><div style={{ textAlign: 'right' }}>Mkt cap</div><div style={{ textAlign: 'right' }}>7d</div><div></div>
        </div>
        {coins.map((c, i) => (
          <div key={c.sym} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 110px 90px 110px 150px 120px', padding: '13px 22px', alignItems: 'center', borderBottom: i < coins.length - 1 ? `1px solid ${PB.line}` : 'none' }}>
            <div style={{ fontSize: 11.5, color: PB.text4, fontFamily: FB.mono }}>{i+1}</div>
            <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: c.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', boxShadow: `0 2px 8px ${c.c}55` }}>{c.sym[0]}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: PB.text }}>{c.name}</div>
                <div style={{ fontSize: 10.5, color: PB.text4, fontFamily: FB.mono }}>{c.sym}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontFamily: FB.mono, fontSize: 13, color: PB.text, fontVariantNumeric: 'tabular-nums' }}>${c.price < 1 ? c.price.toFixed(3) : fmt(c.price)}</div>
            <div style={{ textAlign: 'right', fontSize: 12, fontWeight: 600, color: c.ch >= 0 ? PB.sage : PB.ember, fontFamily: FB.mono }}>{c.ch >= 0 ? '+' : ''}{c.ch.toFixed(2)}%</div>
            <div style={{ textAlign: 'right', fontFamily: FB.mono, fontSize: 12, color: PB.text2 }}>${fmt(c.mc)}</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Spark data={genSpark(20, c.ch)} color={c.ch >= 0 ? PB.sage : PB.ember} width={140} height={30} /></div>
            <div style={{ textAlign: 'right' }}><button style={{ fontSize: 10.5, padding: '5px 12px', borderRadius: 8, background: PB.card, border: `1px solid ${PB.line}`, color: PB.text2, cursor: 'pointer', fontFamily: FB.sans, fontWeight: 500 }}>+ Watch</button></div>
          </div>
        ))}
      </window.CardA>
    </div>
  );
};

// ── Correlator ────────────────────────────────────────────
const CorrelatorA = () => {
  const pairs = [
    { a: 'Crude oil', b: 'USD/JPY', r: 0.84, dir: '+', insight: 'Oil and dollar-yen tracking tightly; Mid-East risk premium' },
    { a: 'BTC', b: 'NASDAQ futures', r: 0.71, dir: '+', insight: 'Risk-on coupling persists into 2026 Q2' },
    { a: 'EU heat index', b: 'EU power demand', r: 0.92, dir: '+', insight: 'Air-conditioning load curve' },
    { a: 'Solar capacity', b: 'CO₂ emissions', r: -0.43, dir: '-', insight: 'Decoupling slowly visible YoY' },
  ];
  return (
    <div style={{ padding: '28px 32px 56px', display: 'grid', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <window.CardA glow>
          <div style={{ fontSize: 9.5, color: PB.text4, letterSpacing: '0.22em', fontFamily: FB.mono, textTransform: 'uppercase' }}>Build a correlation</div>
          <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ flex: 1, padding: '14px 16px', borderRadius: 12, border: `1px solid ${PB.accent}55`, background: `${PB.accent}12` }}>
                <div style={{ fontSize: 9, color: PB.accent, letterSpacing: '0.22em', fontFamily: FB.mono }}>SERIES A</div>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: PB.text, marginTop: 3 }}>Bitcoin price</div>
              </div>
              <div style={{ fontSize: 22, color: PB.text3, fontFamily: FB.display }}>↔</div>
              <div style={{ flex: 1, padding: '14px 16px', borderRadius: 12, border: `1px solid ${PB.gold}55`, background: `${PB.gold}12` }}>
                <div style={{ fontSize: 9, color: PB.gold, letterSpacing: '0.22em', fontFamily: FB.mono }}>SERIES B</div>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: PB.text, marginTop: 3 }}>NASDAQ futures</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11.5, color: PB.text3 }}>
              <span>Window:</span>
              {['7d','30d','90d','1y'].map((w, i) => (
                <button key={w} style={{ padding: '5px 11px', borderRadius: 7, background: i===1?`${PB.accent}22`:'transparent', border: `1px solid ${i===1?PB.accent+'66':PB.line}`, color: i===1?PB.accent:PB.text2, cursor: 'pointer', fontSize: 11, fontFamily: FB.sans }}>{w}</button>
              ))}
            </div>
          </div>
        </window.CardA>
        <window.CardA glow>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 9.5, color: PB.text4, letterSpacing: '0.22em', fontFamily: FB.mono, textTransform: 'uppercase' }}>Pearson r · 30 day</div>
            <window.LiveTag color={PB.sage} />
          </div>
          <div style={{ marginTop: 12, fontFamily: FB.display, fontSize: 72, fontWeight: 600, color: PB.sage, letterSpacing: '-0.045em', lineHeight: 1, textShadow: `0 0 30px ${PB.sage}33` }}>+0.71</div>
          <div style={{ fontSize: 13.5, color: PB.text2, fontFamily: FB.serif, fontStyle: 'italic', lineHeight: 1.5, marginTop: 8 }}>Strong positive coupling — risk-on continues into 2026 Q2. Decoupling probability low this quarter.</div>
        </window.CardA>
      </div>
      <window.CardA>
        <div style={{ fontFamily: FB.display, fontSize: 17, fontWeight: 600, marginBottom: 12 }}>Auto-discovered correlations</div>
        {pairs.map(p => (
          <div key={p.a + p.b} style={{ display: 'grid', gridTemplateColumns: '1.4fr 50px 1fr 70px 1.6fr', alignItems: 'center', gap: 14, padding: '13px 0', borderTop: `1px solid ${PB.line}` }}>
            <div style={{ fontSize: 13.5, color: PB.text }}>{p.a}</div>
            <div style={{ fontSize: 14, color: PB.text4, textAlign: 'center' }}>↔</div>
            <div style={{ fontSize: 13.5, color: PB.text }}>{p.b}</div>
            <div style={{ fontFamily: FB.mono, fontSize: 17, fontWeight: 700, color: p.dir === '+' ? PB.sage : PB.ember, textAlign: 'right' }}>{p.dir}{Math.abs(p.r).toFixed(2)}</div>
            <div style={{ fontSize: 12, color: PB.text3, fontFamily: FB.serif, fontStyle: 'italic' }}>{p.insight}</div>
          </div>
        ))}
      </window.CardA>
    </div>
  );
};

// ── Time Machine ─────────────────────────────────────────
const TimeMachineA = () => (
  <div style={{ padding: '28px 32px 56px', display: 'grid', gap: 16 }}>
    <window.CardA glow style={{ padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div>
          <div style={{ fontSize: 9.5, color: PB.accent, letterSpacing: '0.3em', fontFamily: FB.mono }}>TIME MACHINE · NEW</div>
          <div style={{ fontFamily: FB.display, fontSize: 28, fontWeight: 600, marginTop: 6, letterSpacing: '-0.025em' }}>Replay any moment of the planet</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['◀','▶','⏵','◉'].map(s => <button key={s} style={{ width: 38, height: 38, borderRadius: 9, background: PB.card, border: `1px solid ${PB.line}`, color: PB.text2, cursor: 'pointer', fontSize: 13 }}>{s}</button>)}
        </div>
      </div>
      <div style={{ fontFamily: FB.mono, fontSize: 44, fontWeight: 700, color: PB.accent, letterSpacing: '-0.025em', textShadow: `0 0 24px ${PB.accent}33` }}>March 11, 2011 · 14:46:23 JST</div>
      <div style={{ fontSize: 14, color: PB.text3, fontStyle: 'italic', fontFamily: FB.serif, marginTop: 4 }}>Tōhoku earthquake · M9.1 · Sendai, Japan</div>
      <div style={{ marginTop: 28, position: 'relative', height: 70 }}>
        <div style={{ position: 'absolute', top: 28, left: 0, right: 0, height: 3, background: PB.line, borderRadius: 2 }} />
        <div style={{ position: 'absolute', top: 28, left: 0, width: '42%', height: 3, background: `linear-gradient(90deg, ${PB.accent}, ${PB.gold})`, borderRadius: 2, boxShadow: `0 0 8px ${PB.accent}66` }} />
        <div style={{ position: 'absolute', top: 21, left: '42%', width: 16, height: 16, borderRadius: '50%', background: PB.accent, boxShadow: `0 0 16px ${PB.accent}, 0 0 32px ${PB.accent}66` }} />
        <div style={{ position: 'absolute', top: 42, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: PB.text4, fontFamily: FB.mono }}>
          {['1990','2000','2010','2015','2020','2025','NOW'].map(y => <span key={y}>{y}</span>)}
        </div>
        {[{p:'15%',l:'9/11'},{p:'34%',l:'2008'},{p:'42%',l:'Tōhoku'},{p:'68%',l:'COVID'},{p:'80%',l:'Ukraine'}].map(e => (
          <div key={e.l} style={{ position: 'absolute', top: 0, left: e.p, width: 1, height: 28, background: PB.text4 }}>
            <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', fontSize: 9.5, color: PB.text3, fontFamily: FB.mono, whiteSpace: 'nowrap' }}>{e.l}</div>
          </div>
        ))}
      </div>
    </window.CardA>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      <window.CardA>
        <div style={{ fontFamily: FB.display, fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Snapshot at this moment</div>
        {[['Global temp anomaly','+0.62°C',PB.amber],['Atmospheric CO₂','390.1 ppm',PB.amber],['BTC price','$0',PB.text4],['NASDAQ','2,701',PB.cream],['World pop.','6.97 B',PB.text2]].map(([l,v,c]) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderTop: `1px solid ${PB.line}` }}>
            <span style={{ fontSize: 13, color: PB.text3 }}>{l}</span>
            <span style={{ fontFamily: FB.mono, fontSize: 14, fontWeight: 600, color: c }}>{v}</span>
          </div>
        ))}
      </window.CardA>
      <window.CardA>
        <div style={{ fontFamily: FB.display, fontSize: 16, fontWeight: 600, marginBottom: 12 }}>What the AI saw</div>
        <p style={{ fontSize: 14, color: PB.text2, lineHeight: 1.65, fontFamily: FB.serif, fontStyle: 'italic', margin: 0 }}>
          "M9.1 megathrust ruptures off Sendai. Tsunami waves reach Pacific Rim within 20 minutes. NASDAQ futures drop 1.8% intraday. Insurance equities sell off 4–7%. The first wave of social media posts referencing the quake arrives at 14:48 JST — two minutes after onset."
        </p>
      </window.CardA>
    </div>
  </div>
);

// ── Alerts ───────────────────────────────────────────────
const AlertsA = () => (
  <div style={{ padding: '28px 32px 56px', display: 'grid', gap: 14 }}>
    <window.CardA glow>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 9.5, color: PB.accent, letterSpacing: '0.3em', fontFamily: FB.mono }}>ALERTS · NEW</div>
          <div style={{ fontFamily: FB.display, fontSize: 26, fontWeight: 600, marginTop: 6, letterSpacing: '-0.025em' }}>Tell us when the world changes</div>
          <div style={{ fontSize: 13, color: PB.text3, marginTop: 4, fontFamily: FB.serif, fontStyle: 'italic' }}>5 active rules · 3 triggered today</div>
        </div>
        <button style={{ padding: '10px 18px', borderRadius: 11, background: `linear-gradient(180deg, ${PB.accentHi}, ${PB.accentLo})`, border: 'none', color: PB.bg0, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', boxShadow: `0 4px 14px ${PB.accent}55, inset 0 1px 0 rgba(255,255,255,0.25)` }}>+ New rule</button>
      </div>
      {[
        {ic:'◬',name:'M6+ in Pacific Ring of Fire',state:'Watching · 12 events / 30d',c:PB.ember,active:true},
        {ic:'$',name:'BTC moves more than 5% in 1h',state:'Triggered 14m ago · −5.4%',c:PB.sage,active:true},
        {ic:'⚡',name:'EU grid stress > 90%',state:'Triggered now · ESP, FR, IT',c:PB.amber,active:true},
        {ic:'⌬',name:'PM2.5 hazardous in any tracked city',state:'Watching · 0 events',c:PB.text2,active:false},
        {ic:'◌',name:'ISS pass over Los Angeles',state:'Next: 21:14 PT',c:PB.cream,active:false},
      ].map(a => (
        <div key={a.name} style={{ display: 'grid', gridTemplateColumns: '44px 1fr 140px 100px', gap: 14, padding: '14px 0', borderTop: `1px solid ${PB.line}`, alignItems: 'center' }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: `${a.c}1A`, border: `1px solid ${a.c}44`, color: a.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>{a.ic}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{a.name}</div>
            <div style={{ fontSize: 11.5, color: PB.text3, marginTop: 2, fontFamily: FB.mono }}>{a.state}</div>
          </div>
          <window.LiveTag color={a.active ? a.c : PB.text4} label={a.active ? 'ACTIVE' : 'PAUSED'} />
          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
            <button style={{ width: 30, height: 30, borderRadius: 7, background: PB.card, border: `1px solid ${PB.line}`, color: PB.text2, cursor: 'pointer' }}>⚙</button>
            <button style={{ width: 30, height: 30, borderRadius: 7, background: PB.card, border: `1px solid ${PB.line}`, color: PB.text2, cursor: 'pointer' }}>×</button>
          </div>
        </div>
      ))}
    </window.CardA>
  </div>
);

Object.assign(window, { BriefingA, QuakesA, MarketsA, CorrelatorA, TimeMachineA, AlertsA });
