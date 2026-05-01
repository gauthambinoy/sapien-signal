// Direction A continued: deep tab screens (Quakes, Markets, Briefing, Correlator)
const { useState: useStateA, useEffect: useEffectA } = React;

const Card = ({ T, children, style = {} }) => (
  <div style={{
    borderRadius: 14, border: `1px solid ${T.border}`, background: T.card,
    padding: 16, ...style,
  }}>{children}</div>
);

// ── Quakes detail screen ────────────────────────────────
const EditorialQuakes = () => {
  const T = window.GS_TOKENS.cocoa;
  const quakes = [
    { mag: 6.4, place: 'Kermadec Islands, NZ', depth: 35, t: '14m ago', tsunami: true },
    { mag: 5.8, place: 'Off coast of Honshu', depth: 12, t: '1h ago', tsunami: false },
    { mag: 5.2, place: 'Aleutian Arc, AK', depth: 88, t: '2h ago', tsunami: false },
    { mag: 4.9, place: 'Central Chile', depth: 42, t: '3h ago', tsunami: false },
    { mag: 4.7, place: 'Iceland Reykjanes', depth: 8, t: '4h ago', tsunami: false },
    { mag: 4.3, place: 'Greece, Aegean', depth: 22, t: '5h ago', tsunami: false },
    { mag: 4.1, place: 'Türkiye, Kahramanmaraş', depth: 15, t: '6h ago', tsunami: false },
  ];
  const colorFor = m => m >= 6 ? T.red : m >= 5 ? T.accent : m >= 4 ? T.amber : T.text3;
  return (
    <div style={{ padding: '24px 28px 40px', display: 'grid', gap: 16 }}>
      {/* Top stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {[
          { l: 'Last 24h', v: 247, c: T.text },
          { l: '≥ M5.0', v: 18, c: T.amber },
          { l: '≥ M6.0', v: 3, c: T.accent },
          { l: 'Tsunami watches', v: 1, c: T.red },
        ].map(s => (
          <Card key={s.l} T={T}>
            <div style={{ fontSize: 9, color: T.textMuted, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: window.GS_FONTS.mono }}>{s.l}</div>
            <div style={{ fontFamily: window.GS_FONTS.mono, fontSize: 30, fontWeight: 700, color: s.c, marginTop: 8 }}>{s.v}</div>
            <Spark data={genSpark(20)} color={s.c} width={200} height={24} />
          </Card>
        ))}
      </div>
      {/* Map + list */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
        <Card T={T}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontFamily: window.GS_FONTS.serif, fontSize: 16, fontWeight: 600, color: T.text }}>Global seismic activity · 30 days</div>
            <div style={{ fontSize: 10.5, color: T.text3 }}>Source: USGS</div>
          </div>
          <SimpleWorldMap height={300} accent={T.accent} markers={[
            { x: 220, y: 180, color: T.red, r: 7 },
            { x: 700, y: 160, color: T.accent, r: 5 },
            { x: 250, y: 320, color: T.amber, r: 4 },
            { x: 850, y: 180, color: T.red, r: 6 },
            { x: 540, y: 170, color: T.amber, r: 4 },
            { x: 800, y: 380, color: T.accent, r: 5 },
            { x: 600, y: 140, color: T.amber, r: 4 },
            { x: 480, y: 230, color: T.text3, r: 3 },
          ]} />
        </Card>
        <Card T={T} style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: window.GS_FONTS.serif, fontSize: 15, fontWeight: 600 }}>Recent significant</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['All','M5+','M6+'].map((l, i) => (
                <button key={l} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 6, background: i===1?`${T.accent}22`:'transparent', border: `1px solid ${i===1?T.accent+'55':T.border}`, color: i===1?T.accent:T.text2, cursor: 'pointer' }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ maxHeight: 360, overflowY: 'auto' }}>
            {quakes.map((q, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '46px 1fr auto', gap: 12, padding: '12px 16px', borderBottom: `1px solid ${T.border}`, alignItems: 'center' }}>
                <div style={{ fontFamily: window.GS_FONTS.mono, fontSize: 22, fontWeight: 700, color: colorFor(q.mag), textShadow: `0 0 12px ${colorFor(q.mag)}55` }}>{q.mag}</div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 500, color: T.text }}>{q.place}</div>
                  <div style={{ fontSize: 10.5, color: T.text3, fontFamily: window.GS_FONTS.mono, marginTop: 1 }}>
                    {q.depth} km · {q.t}{q.tsunami && <span style={{ color: T.red, marginLeft: 8 }}>● TSUNAMI</span>}
                  </div>
                </div>
                <div style={{ fontSize: 10, color: T.text3 }}>›</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      {/* Frequency bar */}
      <Card T={T}>
        <div style={{ fontFamily: window.GS_FONTS.serif, fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Magnitude frequency · 30d</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 100 }}>
          {[120, 88, 64, 32, 18, 8, 3, 1].map((v, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ height: `${v}px`, width: '100%', borderRadius: '4px 4px 0 0', background: `linear-gradient(180deg, ${[T.text3,T.text3,T.amber,T.amber,T.accent,T.accent,T.red,T.red][i]}, ${[T.text3,T.text3,T.amber,T.amber,T.accent,T.accent,T.red,T.red][i]}66)` }} />
              <div style={{ fontSize: 9, color: T.textMuted, fontFamily: window.GS_FONTS.mono }}>M{i+2}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ── Markets screen ──────────────────────────────────────
const EditorialMarkets = () => {
  const T = window.GS_TOKENS.cocoa;
  const coins = [
    { sym: 'BTC', name: 'Bitcoin', price: 94250, ch: 1.84, mc: 1.85e12, c: '#F7931A' },
    { sym: 'ETH', name: 'Ethereum', price: 3245, ch: 0.92, mc: 390e9, c: '#627EEA' },
    { sym: 'SOL', name: 'Solana', price: 178.4, ch: -2.34, mc: 84e9, c: '#9945FF' },
    { sym: 'BNB', name: 'BNB', price: 612, ch: 0.21, mc: 89e9, c: T.amber },
    { sym: 'XRP', name: 'XRP', price: 0.612, ch: 4.18, mc: 33e9, c: T.text3 },
    { sym: 'ADA', name: 'Cardano', price: 0.488, ch: -1.05, mc: 17e9, c: T.cyan },
    { sym: 'DOGE', name: 'Dogecoin', price: 0.142, ch: 0.55, mc: 20e9, c: T.amber },
    { sym: 'AVAX', name: 'Avalanche', price: 38.4, ch: -3.14, mc: 14e9, c: T.red },
  ];
  return (
    <div style={{ padding: '24px 28px 40px', display: 'grid', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {[
          { l: 'Total mkt cap', v: '$2.42T', c: T.cyan, ch: '+1.2%' },
          { l: '24h volume', v: '$118B', c: T.text, ch: '+8.4%' },
          { l: 'BTC dominance', v: '54.2%', c: T.amber, ch: '+0.3%' },
          { l: 'Fear & Greed', v: '52', c: T.green, ch: 'Neutral' },
        ].map(s => (
          <Card key={s.l} T={T}>
            <div style={{ fontSize: 9, color: T.textMuted, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: window.GS_FONTS.mono }}>{s.l}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
              <div style={{ fontFamily: window.GS_FONTS.mono, fontSize: 24, fontWeight: 700, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 11, color: T.text3 }}>{s.ch}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Coin table */}
      <Card T={T} style={{ padding: 0 }}>
        <div style={{ padding: '16px 18px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: window.GS_FONTS.serif, fontSize: 18, fontWeight: 600 }}>Top crypto markets</div>
          <LiveTag color={T.green} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 110px 90px 110px 140px 140px', padding: '10px 18px', fontSize: 10, color: T.textMuted, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: window.GS_FONTS.mono, borderBottom: `1px solid ${T.border}` }}>
          <div>#</div><div>Name</div><div style={{ textAlign: 'right' }}>Price</div><div style={{ textAlign: 'right' }}>24h</div><div style={{ textAlign: 'right' }}>Mkt cap</div><div style={{ textAlign: 'right' }}>7d trend</div><div style={{ textAlign: 'right' }}></div>
        </div>
        {coins.map((c, i) => (
          <div key={c.sym} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 110px 90px 110px 140px 140px', padding: '12px 18px', alignItems: 'center', borderBottom: i < coins.length - 1 ? `1px solid ${T.border}` : 'none' }}>
            <div style={{ fontSize: 11, color: T.text3, fontFamily: window.GS_FONTS.mono }}>{i+1}</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: c.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>{c.sym[0]}</div>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text }}>{c.name}</div>
                <div style={{ fontSize: 10, color: T.text3, fontFamily: window.GS_FONTS.mono }}>{c.sym}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontFamily: window.GS_FONTS.mono, fontSize: 13, color: T.text, fontVariantNumeric: 'tabular-nums' }}>${c.price < 1 ? c.price.toFixed(3) : fmt(c.price)}</div>
            <div style={{ textAlign: 'right', fontSize: 12, fontWeight: 600, color: c.ch >= 0 ? T.green : T.red, fontFamily: window.GS_FONTS.mono }}>{c.ch >= 0 ? '+' : ''}{c.ch.toFixed(2)}%</div>
            <div style={{ textAlign: 'right', fontFamily: window.GS_FONTS.mono, fontSize: 12, color: T.text2 }}>${fmt(c.mc)}</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Spark data={genSpark(20, c.ch)} color={c.ch >= 0 ? T.green : T.red} width={130} height={28} /></div>
            <div style={{ textAlign: 'right' }}><button style={{ fontSize: 10, padding: '4px 10px', borderRadius: 6, background: 'transparent', border: `1px solid ${T.border}`, color: T.text2, cursor: 'pointer' }}>Watch</button></div>
          </div>
        ))}
      </Card>
    </div>
  );
};

// ── AI Briefing screen (novel) ──────────────────────────
const EditorialBriefing = () => {
  const T = window.GS_TOKENS.cocoa;
  const sections = [
    { ic: '◬', title: 'Earth Systems', tone: 'elevated', body: 'Seismic activity is elevated with a M6.4 in Kermadec and aftershock cluster. Tsunami watch active for SW Pacific. Air quality deteriorated across Northern India (PM2.5 >180 µg/m³). Heat dome enters day 4 over Western Europe — three grid stress alerts.', tags: ['M6.4 NZ', 'Air: Delhi', 'Heat: EU'] },
    { ic: '$', title: 'Markets & Money', tone: 'mixed', body: 'BTC up 1.8% to $94.2K; ETH flat. Crude +2.3% on Mid-East tension. EUR/USD steady at 1.083. S&P futures unchanged ahead of Fed minutes. VIX at 14.2, complacency reading.', tags: ['BTC +1.8', 'Brent +2.3', 'VIX 14'] },
    { ic: '+', title: 'Public Health', tone: 'calm', body: 'No new WHO emergency designations. Influenza activity declining in Northern Hemisphere. Avian flu surveillance expanded across Pacific flyway. COVID variants stable.', tags: ['Flu ↓', 'H5N1 watch'] },
    { ic: '◌', title: 'Space', tone: 'normal', body: 'ISS visible passes over Western US tonight 21:14 PT. NASA Artemis program announces Q3 timeline. Two SpaceX launches scheduled this week. Solar wind speed nominal.', tags: ['ISS pass', 'Artemis'] },
    { ic: '⌘', title: 'Tech & Society', tone: 'normal', body: '142 stories trending; centered on AI policy in EU and a major outage at a tier-1 cloud provider (resolved). Hacker News front page is dominated by infrastructure topics.', tags: ['EU AI Act', 'Cloud outage'] },
  ];
  const toneColor = t => t === 'elevated' ? T.red : t === 'mixed' ? T.amber : t === 'calm' ? T.green : T.text2;
  return (
    <div style={{ padding: '24px 28px 40px', display: 'grid', gap: 16, maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ borderRadius: 18, border: `1px solid ${T.border}`, background: 'linear-gradient(135deg, rgba(45,42,36,0.9), rgba(31,30,28,0.95))', padding: 28, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: `radial-gradient(circle, ${T.accent}33, transparent 70%)` }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.25em', color: T.accent, fontFamily: window.GS_FONTS.mono }}>DAILY BRIEFING · 06:00 UTC</span>
            <LiveTag color={T.cyan} label="UPDATED" />
          </div>
          <h1 style={{ margin: 0, fontFamily: window.GS_FONTS.serif, fontSize: 48, lineHeight: 1.05, fontWeight: 600, letterSpacing: '-0.025em' }}>
            A quiet day, <em style={{ color: T.accent }}>punctuated</em> by a Kermadec quake and a European heat dome.
          </h1>
          <p style={{ marginTop: 18, fontFamily: window.GS_FONTS.serif, fontSize: 18, lineHeight: 1.55, color: T.text2, fontStyle: 'italic', maxWidth: 720 }}>
            "The signal is dominated by physical-world stress this morning. Markets are calm; the planet is not. Watch the next 24 hours of Pacific aftershocks and EU grid demand curves."
          </p>
          <div style={{ marginTop: 18, display: 'flex', gap: 10, alignItems: 'center', fontSize: 11, color: T.text3 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: T.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#1F1E1C', fontWeight: 700 }}>✦</div>
            <span style={{ color: T.text2 }}>Synthesized by Claude</span> · 14 sources · 18s ago
          </div>
        </div>
      </div>

      {sections.map(s => (
        <div key={s.title} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24, padding: '18px 0', borderTop: `1px solid ${T.border}` }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: toneColor(s.tone), fontSize: 16 }}>{s.ic}</span>
              <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.2em', color: toneColor(s.tone), fontFamily: window.GS_FONTS.mono, textTransform: 'uppercase' }}>{s.tone}</span>
            </div>
            <h3 style={{ margin: '6px 0 0', fontFamily: window.GS_FONTS.serif, fontSize: 22, fontWeight: 600, color: T.text, letterSpacing: '-0.02em' }}>{s.title}</h3>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: T.text2, fontFamily: window.GS_FONTS.serif }}>{s.body}</p>
            <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {s.tags.map(t => (
                <span key={t} style={{ fontSize: 11, fontFamily: window.GS_FONTS.mono, padding: '3px 9px', borderRadius: 999, background: 'rgba(245,240,232,0.04)', border: `1px solid ${T.border}`, color: T.text3 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Correlator (novel) ──────────────────────────────────
const EditorialCorrelator = () => {
  const T = window.GS_TOKENS.cocoa;
  const pairs = [
    { a: 'Crude oil', b: 'USD/JPY', r: 0.84, dir: '+', insight: 'Oil and dollar-yen tracking tightly; Mid-East risk premium' },
    { a: 'BTC', b: 'NASDAQ futures', r: 0.71, dir: '+', insight: 'Risk-on coupling persists into 2026 Q2' },
    { a: 'EU heat index', b: 'EU power demand', r: 0.92, dir: '+', insight: 'Air-conditioning load curve' },
    { a: 'Solar capacity', b: 'CO₂ emissions', r: -0.43, dir: '-', insight: 'Decoupling slowly visible YoY' },
    { a: 'Seismic M5+', b: 'Tsunami alerts', r: 0.38, dir: '+', insight: 'Most large quakes are inland' },
  ];
  return (
    <div style={{ padding: '24px 28px 40px', display: 'grid', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card T={T}>
          <div style={{ fontSize: 9, color: T.textMuted, letterSpacing: '0.2em', fontFamily: window.GS_FONTS.mono, textTransform: 'uppercase' }}>Build a correlation</div>
          <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ flex: 1, padding: '12px 14px', borderRadius: 10, border: `1px solid ${T.accent}55`, background: `${T.accent}15` }}>
                <div style={{ fontSize: 9, color: T.accent, letterSpacing: '0.2em', fontFamily: window.GS_FONTS.mono }}>SERIES A</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text, marginTop: 2 }}>Bitcoin price</div>
              </div>
              <div style={{ fontSize: 18, color: T.text3 }}>↔</div>
              <div style={{ flex: 1, padding: '12px 14px', borderRadius: 10, border: `1px solid ${T.cyan}55`, background: `${T.cyan}15` }}>
                <div style={{ fontSize: 9, color: T.cyan, letterSpacing: '0.2em', fontFamily: window.GS_FONTS.mono }}>SERIES B</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text, marginTop: 2 }}>NASDAQ futures</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11, color: T.text3 }}>
              <span>Window:</span>
              {['7d','30d','90d','1y'].map((w, i) => (
                <button key={w} style={{ padding: '4px 10px', borderRadius: 6, background: i===1?T.accent+'22':'transparent', border: `1px solid ${i===1?T.accent+'55':T.border}`, color: i===1?T.accent:T.text2, cursor: 'pointer', fontSize: 11 }}>{w}</button>
              ))}
            </div>
          </div>
        </Card>
        <Card T={T}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 9, color: T.textMuted, letterSpacing: '0.2em', fontFamily: window.GS_FONTS.mono, textTransform: 'uppercase' }}>Pearson r · 30 day</div>
            <LiveTag color={T.green} />
          </div>
          <div style={{ marginTop: 14, fontFamily: window.GS_FONTS.mono, fontSize: 64, fontWeight: 700, color: T.green, letterSpacing: '-0.04em' }}>+0.71</div>
          <div style={{ fontSize: 13, color: T.text2, fontFamily: window.GS_FONTS.serif, fontStyle: 'italic', lineHeight: 1.5 }}>Strong positive coupling — risk-on coupling persists into 2026 Q2. Decoupling probability low this quarter.</div>
        </Card>
      </div>

      {/* Correlation matrix simplified */}
      <Card T={T}>
        <div style={{ fontFamily: window.GS_FONTS.serif, fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Notable correlations · auto-discovered</div>
        {pairs.map(p => (
          <div key={p.a + p.b} style={{ display: 'grid', gridTemplateColumns: '1.4fr 60px 1fr 60px 1.6fr', alignItems: 'center', gap: 14, padding: '12px 0', borderTop: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 13, color: T.text }}>{p.a}</div>
            <div style={{ fontSize: 14, color: T.text3, textAlign: 'center' }}>↔</div>
            <div style={{ fontSize: 13, color: T.text }}>{p.b}</div>
            <div style={{ fontFamily: window.GS_FONTS.mono, fontSize: 16, fontWeight: 700, color: p.dir === '+' ? T.green : T.red, textAlign: 'right' }}>{p.dir}{Math.abs(p.r).toFixed(2)}</div>
            <div style={{ fontSize: 11.5, color: T.text3, fontFamily: window.GS_FONTS.serif, fontStyle: 'italic' }}>{p.insight}</div>
          </div>
        ))}
      </Card>
    </div>
  );
};

window.EditorialQuakes = EditorialQuakes;
window.EditorialMarkets = EditorialMarkets;
window.EditorialBriefing = EditorialBriefing;
window.EditorialCorrelator = EditorialCorrelator;
window.EditorialCard = Card;
