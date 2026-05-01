// Direction A v2 — Overview screen (the masterpiece)
const { useState: uS2, useEffect: uE2 } = React;
const PA = window.GS_PALETTE_A;
const FAA = window.GS_FONTS_A;

const OverviewA = () => {
  const [pop, setPop] = uS2(8127845632);
  const [co2, setCo2] = uS2(421.72);
  const [energy, setEnergy] = uS2(2.4e12);
  const [strikes, setStrikes] = uS2(2400000);
  uE2(() => {
    const t = setInterval(() => {
      setPop(p => p + Math.floor(Math.random() * 5 + 2));
      setCo2(p => p + (Math.random() - 0.5) * 0.001);
      setEnergy(p => p + Math.floor(Math.random() * 924147 + 500000));
      setStrikes(p => p + Math.floor(Math.random() * 60));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ padding: '28px 32px 56px', display: 'grid', gap: 22, fontFamily: FAA.sans, color: PA.text }}>
      {/* HERO */}
      <section style={{
        position: 'relative',
        borderRadius: 24, overflow: 'hidden',
        border: `1px solid ${PA.line}`,
        background: `linear-gradient(135deg, ${PA.bg2} 0%, ${PA.bg1} 100%)`,
        padding: '36px 40px 32px',
        boxShadow: `0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}>
        {/* Hero globe — large, anchored right */}
        <div style={{ position: 'absolute', right: -80, top: -40, opacity: 0.92, pointerEvents: 'none' }}>
          <window.PhotorealEarth size={520} glowAccent={PA.accent} spinSpeed={0.06} />
        </div>
        {/* Warm wash */}
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 800px 500px at 90% 30%, ${PA.accent}18, transparent 60%)`, pointerEvents: 'none' }} />
        {/* Noise grain */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.4, mixBlendMode: 'overlay', pointerEvents: 'none', backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '3px 3px' }} />

        <div style={{ position: 'relative', maxWidth: '58%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.3em', color: PA.accent, fontFamily: FAA.mono }}>ORBITAL COMMAND</span>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: PA.text4 }} />
            <span style={{ fontSize: 11, color: PA.text3, fontFamily: FAA.mono, letterSpacing: '0.05em' }}>WED · APR 29 · 2026</span>
          </div>
          <h2 style={{
            margin: 0, fontFamily: FAA.display,
            fontSize: 56, lineHeight: 1.0, fontWeight: 500,
            letterSpacing: '-0.035em', color: PA.text,
          }}>
            The state of <br/>the planet, <em style={{ color: PA.accent, fontStyle: 'italic', fontWeight: 500 }}>right now</em>.
          </h2>
          <p style={{ margin: '20px 0 0', fontSize: 15, lineHeight: 1.6, color: PA.text2, maxWidth: 540, fontFamily: FAA.serif }}>
            One stream for weather, seismic, energy, markets, public health, space, and the conversation around it — validated, normalized, and held on a single edge so the data shows up and stays up.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
            {['200 APIs', '14 categories', 'AI briefings', '1s tick', 'Edge-cached'].map(c => (
              <span key={c} style={{
                fontSize: 11.5, fontWeight: 500, padding: '6px 12px', borderRadius: 999,
                background: PA.card, border: `1px solid ${PA.line}`, color: PA.text2,
                fontFamily: FAA.sans,
              }}>{c}</span>
            ))}
          </div>
        </div>

        {/* Live counters strip */}
        <div style={{ position: 'relative', marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { label: 'World population',    value: fmt(pop),                    unit: 'people',  color: PA.cream,  trend: '+147 / sec' },
            { label: 'Atmospheric CO₂',      value: co2.toFixed(2),              unit: 'ppm',     color: PA.amber,  trend: 'NOAA · Mauna Loa' },
            { label: 'Energy generated YTD', value: fmt(energy),                 unit: 'MWh',     color: PA.accent, trend: 'IEA composite' },
            { label: 'Lightning today',      value: fmt(strikes),                unit: 'strikes', color: PA.gold,   trend: 'Vaisala net.' },
          ].map(s => (
            <div key={s.label} style={{
              padding: 16, borderRadius: 14,
              background: 'rgba(27,26,24,0.5)', border: `1px solid ${PA.line}`,
              backdropFilter: 'blur(20px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
            }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.22em', color: PA.text4, textTransform: 'uppercase', fontFamily: FAA.mono }}>{s.label}</div>
              <div style={{ marginTop: 10, fontFamily: FAA.mono, fontSize: 24, fontWeight: 700, color: s.color, letterSpacing: '-0.015em', fontVariantNumeric: 'tabular-nums', textShadow: `0 0 20px ${s.color}33`, lineHeight: 1 }}>
                {s.value}
                <span style={{ fontSize: 11, color: PA.text3, fontWeight: 400, marginLeft: 5 }}>{s.unit}</span>
              </div>
              <div style={{ marginTop: 8, fontSize: 10.5, color: PA.text4, fontFamily: FAA.mono }}>{s.trend}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TWO COLS: MAP + BRIEFING */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 16 }}>
        {/* Live world map */}
        <window.CardA padded={false} glow style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px 14px' }}>
            <div>
              <div style={{ fontFamily: FAA.display, fontSize: 17, fontWeight: 600, color: PA.text, letterSpacing: '-0.015em' }}>Live Satellite Intelligence</div>
              <div style={{ fontSize: 11.5, color: PA.text3, marginTop: 2 }}>Quakes · Markets · Outages · Space · 1m refresh</div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['Quakes', 'Markets', 'Power', 'Space'].map((l, i) => (
                <button key={l} style={{
                  fontSize: 11, fontWeight: 600, padding: '6px 11px', borderRadius: 8,
                  background: i === 0 ? `${PA.accent}1F` : 'transparent',
                  border: `1px solid ${i === 0 ? PA.accent + '66' : PA.line}`,
                  color: i === 0 ? PA.accent : PA.text2, cursor: 'pointer',
                  fontFamily: FAA.sans,
                }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ padding: '0 12px 12px' }}>
            <window.PhotorealMap height={300} accent={PA.accent} markers={[
              { lon: 178, lat: -29, color: PA.ember, r: 7 },   // Kermadec
              { lon: 142, lat: 38,  color: PA.accent, r: 5 },  // Honshu
              { lon: -150, lat: 55, color: PA.amber, r: 4 },   // Aleutians
              { lon: -71, lat: -33, color: PA.gold, r: 4 },    // Chile
              { lon: -22, lat: 64,  color: PA.cream, r: 3 },   // Iceland
              { lon: 10, lat: 50,   color: PA.amber, r: 4 },   // Europe heat
              { lon: 77, lat: 28,   color: PA.ember, r: 5 },   // Delhi air
              { lon: 139, lat: 35,  color: PA.accent, r: 4 },  // Tokyo markets
              { lon: -74, lat: 40,  color: PA.gold, r: 5 },    // NYC markets
              { lon: -0.1, lat: 51, color: PA.cream, r: 4 },   // London
            ]} />
          </div>
          <div style={{ display: 'flex', gap: 18, padding: '0 22px 18px', fontSize: 11, color: PA.text3, fontFamily: FAA.mono }}>
            <span><span style={{ color: PA.ember }}>●</span> M5+ quakes <strong style={{ color: PA.text2 }}>12</strong></span>
            <span><span style={{ color: PA.accent }}>●</span> Market shocks <strong style={{ color: PA.text2 }}>4</strong></span>
            <span><span style={{ color: PA.amber }}>●</span> Grid alerts <strong style={{ color: PA.text2 }}>2</strong></span>
            <span><span style={{ color: PA.cream }}>●</span> ISS · 21:14 PT</span>
          </div>
        </window.CardA>

        {/* AI Briefing */}
        <window.CardA glow style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: `radial-gradient(circle, ${PA.accent}25, transparent 70%)`, pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 9,
              background: `linear-gradient(135deg, ${PA.accentHi}, ${PA.accentLo})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: PA.bg0, fontSize: 14,
              boxShadow: `0 4px 14px ${PA.accent}55, inset 0 1px 0 rgba(255,255,255,0.3)`,
            }}>✦</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: PA.text, textTransform: 'uppercase', fontFamily: FAA.mono }}>AI Briefing</div>
              <div style={{ fontSize: 10, color: PA.text4, fontFamily: FAA.mono, marginTop: 1 }}>Synthesized 14s ago · Claude Haiku 4.5</div>
            </div>
          </div>
          <p style={{ fontSize: 14.5, lineHeight: 1.65, color: PA.text2, fontFamily: FAA.serif, fontStyle: 'italic', margin: 0 }}>
            "Seismic activity dominates the last 24h with a <strong style={{ color: PA.ember, fontStyle: 'normal' }}>M6.4 in the Kermadec trench</strong>. Markets opened mixed — BTC +1.8%, S&P futures flat. Three grid stress alerts in <strong style={{ color: PA.amber, fontStyle: 'normal' }}>Western Europe</strong> as a heat dome enters day 4. Air quality healthy across N. America, hazardous in Northern India."
          </p>
          <div style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid ${PA.line}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { l: 'Risk index', v: '6.3', c: PA.amber, s: '+0.4 vs yest' },
              { l: 'Sentiment',  v: 'Neutral', c: PA.text2, s: 'F&G 52' },
              { l: 'Climate',    v: 'Elevated', c: PA.ember, s: '3 alerts' },
              { l: 'Tech pulse', v: '142', c: PA.gold, s: '↑ 18%' },
            ].map(m => (
              <div key={m.l} style={{ padding: 11, borderRadius: 10, background: 'rgba(27,26,24,0.4)', border: `1px solid ${PA.line}` }}>
                <div style={{ fontSize: 9, color: PA.text4, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: FAA.mono }}>{m.l}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: m.c, marginTop: 4, fontFamily: FAA.display, letterSpacing: '-0.015em' }}>{m.v}</div>
                <div style={{ fontSize: 10, color: PA.text4, marginTop: 1, fontFamily: FAA.mono }}>{m.s}</div>
              </div>
            ))}
          </div>
        </window.CardA>
      </section>

      {/* LIVE COUNTERS GRID */}
      <section>
        <window.SectionTitle title="Live world counters" sub="80+ continuously-updating metrics across 6 categories" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 11 }}>
          {[
            { l: 'Births today',    v: 285430,     c: PA.sage,   ic: '◉' },
            { l: 'Cars produced',   v: 142800,     c: PA.cream,  ic: '◌' },
            { l: 'Solar TWh / yr',  v: 1640,       c: PA.amber,  ic: '☀' },
            { l: 'Plastic waste t', v: 920500,     c: PA.ember,  ic: '⚠' },
            { l: 'Searches / s',    v: 99000,      c: PA.gold,   ic: '⌕' },
            { l: 'Trees lost ha',   v: 47200,      c: PA.accent, ic: '⌬' },
            { l: 'Mobile users',    v: 5420000000, c: PA.cream,  ic: '◊' },
            { l: 'Bitcoin mined',   v: 19720000,   c: PA.amber,  ic: '$' },
            { l: 'Books published', v: 4200000,    c: PA.text2,  ic: '☰' },
            { l: 'CO₂ emitted Mt',  v: 36400,      c: PA.ember,  ic: '⚡' },
          ].map(m => (
            <window.CardA key={m.l} style={{ padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <span style={{ fontSize: 9.5, color: PA.text4, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: FAA.mono }}>{m.l}</span>
                <span style={{ color: m.c, fontSize: 11, opacity: 0.7 }}>{m.ic}</span>
              </div>
              <div style={{ fontFamily: FAA.mono, fontSize: 19, fontWeight: 700, color: m.c, fontVariantNumeric: 'tabular-nums', textShadow: `0 0 14px ${m.c}25`, letterSpacing: '-0.01em' }}>{fmt(m.v)}</div>
              <div style={{ marginTop: 8 }}>
                <Spark data={genSpark(20, Math.random() - 0.4)} color={m.c} width={180} height={22} />
              </div>
            </window.CardA>
          ))}
        </div>
      </section>

      {/* REGIONAL ENERGY */}
      <section>
        <window.SectionTitle title="Energy consumption · by region" sub="Composite from IEA / EIA / IRENA · live" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 11 }}>
          {[
            { name: 'N. America',   twh: 5125,  mix: [62, 22, 16], c: PA.amber },
            { name: 'Europe',       twh: 3890,  mix: [42, 38, 20], c: PA.cream },
            { name: 'Asia Pacific', twh: 14200, mix: [72, 15, 13], c: PA.ember },
            { name: 'Middle East',  twh: 1150,  mix: [95,  3,  2], c: PA.accent },
            { name: 'S. America',   twh: 1200,  mix: [30, 62,  8], c: PA.sage },
            { name: 'Africa',       twh: 830,   mix: [74, 20,  6], c: PA.plum },
          ].map(r => (
            <window.CardA key={r.name} style={{ padding: 14 }}>
              <div style={{ fontSize: 9.5, color: PA.text4, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: FAA.mono }}>{r.name}</div>
              <div style={{ marginTop: 8, fontFamily: FAA.mono, fontSize: 19, fontWeight: 700, color: r.c, letterSpacing: '-0.01em' }}>
                {fmt(r.twh)}<span style={{ fontSize: 10, color: PA.text3, fontWeight: 400, marginLeft: 4 }}>TWh/yr</span>
              </div>
              <div style={{ marginTop: 12, height: 5, borderRadius: 3, overflow: 'hidden', display: 'flex', background: 'rgba(245,240,232,0.04)' }}>
                <div style={{ width: `${r.mix[0]}%`, background: PA.ember }} />
                <div style={{ width: `${r.mix[1]}%`, background: PA.sage }} />
                <div style={{ width: `${r.mix[2]}%`, background: PA.cream }} />
              </div>
              <div style={{ marginTop: 7, fontSize: 9.5, color: PA.text4, display: 'flex', justifyContent: 'space-between', fontFamily: FAA.mono }}>
                <span>F {r.mix[0]}%</span><span>R {r.mix[1]}%</span><span>N {r.mix[2]}%</span>
              </div>
            </window.CardA>
          ))}
        </div>
      </section>
    </div>
  );
};

window.OverviewA = OverviewA;
