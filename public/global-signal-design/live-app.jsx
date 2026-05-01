const { useEffect: useLiveEffect, useMemo: useLiveMemo, useState: useLiveState } = React;
const PL = window.GS_PALETTE_A;
const FL = window.GS_FONTS_A;

const API_PATHS = {
  weather: "/api/weather",
  quakes: "/api/quakes",
  markets: "/api/markets",
  health: "/api/health",
  energy: "/api/energy",
  forex: "/api/forex",
  air: "/api/air",
  news: "/api/news",
  countries: "/api/countries",
  economy: "/api/economy",
  space: "/api/space",
  system: "/api/health-check",
};

const fmtLive = (n, d = 0) => {
  if (n == null || Number.isNaN(Number(n))) return "—";
  const v = Number(n);
  if (Math.abs(v) >= 1e12) return (v / 1e12).toFixed(d || 2) + "T";
  if (Math.abs(v) >= 1e9) return (v / 1e9).toFixed(d || 2) + "B";
  if (Math.abs(v) >= 1e6) return (v / 1e6).toFixed(d || 2) + "M";
  if (Math.abs(v) >= 1e3) return v.toLocaleString("en-US", { maximumFractionDigits: d });
  return v.toLocaleString("en-US", { maximumFractionDigits: d });
};

const timeAgo = (ts) => {
  if (!ts) return "live";
  const seconds = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
};

function useBackendData() {
  const [data, setData] = useLiveState({});
  const [loading, setLoading] = useLiveState(true);
  const [lastSync, setLastSync] = useLiveState(null);

  useLiveEffect(() => {
    let alive = true;
    const load = async () => {
      const entries = await Promise.all(
        Object.entries(API_PATHS).map(async ([key, path]) => {
          try {
            const res = await fetch(path, { cache: "no-store" });
            const json = await res.json();
            return [key, { ok: res.ok, data: json }];
          } catch (error) {
            return [key, { ok: false, data: { error: error.message } }];
          }
        })
      );
      if (!alive) return;
      setData(Object.fromEntries(entries));
      setLoading(false);
      setLastSync(new Date());
    };
    load();
    const timer = setInterval(load, 60000);
    return () => { alive = false; clearInterval(timer); };
  }, []);

  return { data, loading, lastSync };
}

const SourceBadge = ({ source }) => (
  <span style={{
    fontSize: 9.5,
    padding: "3px 7px",
    borderRadius: 999,
    background: `${PL.sage}18`,
    color: PL.sage,
    border: `1px solid ${PL.sage}30`,
    fontFamily: FL.mono,
    letterSpacing: "0.12em",
  }}>{source}</span>
);

function LiveOverview({ api, lastSync }) {
  const weather = api.weather?.data?.cities ?? [];
  const quakes = api.quakes?.data?.quakes ?? [];
  const coins = api.markets?.data?.coins ?? [];
  const energy = api.energy?.data;
  const health = api.health?.data?.global;
  const air = api.air?.data?.stations ?? [];
  const news = api.news?.data?.articles ?? [];
  const totalCap = coins.reduce((sum, c) => sum + (c.market_cap || 0), 0);
  const majorQuakes = quakes.filter((q) => q.mag >= 5);
  const weatherAvg = weather.length ? weather.reduce((sum, c) => sum + (c.temp || 0), 0) / weather.length : null;

  return (
    <div style={{ padding: "28px 32px 56px", display: "grid", gap: 22, fontFamily: FL.sans, color: PL.text }}>
      <section style={{
        position: "relative",
        borderRadius: 24,
        overflow: "hidden",
        border: `1px solid ${PL.line}`,
        background: `linear-gradient(135deg, ${PL.bg2} 0%, ${PL.bg1} 100%)`,
        padding: "36px 40px 32px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}>
        <div style={{ position: "absolute", right: -80, top: -40, opacity: 0.92, pointerEvents: "none" }}>
          <window.PhotorealEarth size={520} glowAccent={PL.accent} spinSpeed={0.06} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 800px 500px at 90% 30%, ${PL.accent}18, transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: "58%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.3em", color: PL.accent, fontFamily: FL.mono }}>ORBITAL COMMAND</span>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: PL.text4 }} />
            <span style={{ fontSize: 11, color: PL.text3, fontFamily: FL.mono, letterSpacing: "0.05em" }}>LIVE BACKEND · {lastSync ? lastSync.toLocaleTimeString("en-GB") : "SYNCING"}</span>
          </div>
          <h2 style={{ margin: 0, fontFamily: FL.display, fontSize: 56, lineHeight: 1, fontWeight: 500, letterSpacing: "-0.035em", color: PL.text }}>
            The state of <br />the planet, <em style={{ color: PL.accent, fontStyle: "italic", fontWeight: 500 }}>right now</em>.
          </h2>
          <p style={{ margin: "20px 0 0", fontSize: 15, lineHeight: 1.6, color: PL.text2, maxWidth: 540, fontFamily: FL.serif }}>
            Live weather, seismic, energy, markets, health, air and news streams are now pulled from the Global Signal API backend and rendered inside the exact exported interface.
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 22, flexWrap: "wrap" }}>
            {[`${weather.length} weather stations`, `${quakes.length} quakes`, `${coins.length} markets`, `${air.length} air stations`, `${news.length} headlines`].map(c => (
              <span key={c} style={{ fontSize: 11.5, fontWeight: 500, padding: "6px 12px", borderRadius: 999, background: PL.card, border: `1px solid ${PL.line}`, color: PL.text2 }}>{c}</span>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", marginTop: 32, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {[
            { label: "World cases", value: fmtLive(health?.cases), unit: "health", color: PL.cream, trend: "disease.sh" },
            { label: "Avg city temp", value: weatherAvg == null ? "—" : weatherAvg.toFixed(1), unit: "°C", color: PL.amber, trend: "Open-Meteo" },
            { label: "Energy YTD", value: fmtLive(energy?.global?.consumedTWh, 1), unit: "TWh", color: PL.accent, trend: "IEA composite" },
            { label: "Crypto cap", value: `$${fmtLive(totalCap, 2)}`, unit: "USD", color: PL.gold, trend: "CoinGecko" },
          ].map(s => (
            <div key={s.label} style={{ padding: 16, borderRadius: 14, background: "rgba(27,26,24,0.5)", border: `1px solid ${PL.line}`, backdropFilter: "blur(20px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.22em", color: PL.text4, textTransform: "uppercase", fontFamily: FL.mono }}>{s.label}</div>
              <div style={{ marginTop: 10, fontFamily: FL.mono, fontSize: 24, fontWeight: 700, color: s.color, letterSpacing: "-0.015em", fontVariantNumeric: "tabular-nums", textShadow: `0 0 20px ${s.color}33`, lineHeight: 1 }}>
                {s.value}<span style={{ fontSize: 11, color: PL.text3, fontWeight: 400, marginLeft: 5 }}>{s.unit}</span>
              </div>
              <div style={{ marginTop: 8, fontSize: 10.5, color: PL.text4, fontFamily: FL.mono }}>{s.trend}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "1.45fr 1fr", gap: 16 }}>
        <window.CardA padded={false} glow style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px 14px" }}>
            <div>
              <div style={{ fontFamily: FL.display, fontSize: 17, fontWeight: 600, color: PL.text, letterSpacing: "-0.015em" }}>Live Satellite Intelligence</div>
              <div style={{ fontSize: 11.5, color: PL.text3, marginTop: 2 }}>Backend quakes · markets · weather · air · 1m refresh</div>
            </div>
            <SourceBadge source="API LIVE" />
          </div>
          <div style={{ padding: "0 12px 12px" }}>
            <window.PhotorealMap height={300} accent={PL.accent} markers={quakes.slice(0, 24).map(q => ({
              lon: q.lon,
              lat: q.lat,
              color: q.mag >= 6 ? PL.ember : q.mag >= 5 ? PL.accent : PL.amber,
              r: Math.max(3, Math.min(8, q.mag || 3)),
            }))} />
          </div>
          <div style={{ display: "flex", gap: 18, padding: "0 22px 18px", fontSize: 11, color: PL.text3, fontFamily: FL.mono }}>
            <span><span style={{ color: PL.ember }}>●</span> M5+ quakes <strong style={{ color: PL.text2 }}>{majorQuakes.length}</strong></span>
            <span><span style={{ color: PL.accent }}>●</span> Markets <strong style={{ color: PL.text2 }}>{coins.length}</strong></span>
            <span><span style={{ color: PL.amber }}>●</span> Weather cities <strong style={{ color: PL.text2 }}>{weather.length}</strong></span>
            <span><span style={{ color: PL.cream }}>●</span> Air stations <strong style={{ color: PL.text2 }}>{air.length}</strong></span>
          </div>
        </window.CardA>

        <window.CardA glow style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: `radial-gradient(circle, ${PL.accent}25, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: `linear-gradient(135deg, ${PL.accentHi}, ${PL.accentLo})`, display: "flex", alignItems: "center", justifyContent: "center", color: PL.bg0, fontSize: 14, boxShadow: `0 4px 14px ${PL.accent}55, inset 0 1px 0 rgba(255,255,255,0.3)` }}>✦</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: PL.text, textTransform: "uppercase", fontFamily: FL.mono }}>AI Briefing</div>
              <div style={{ fontSize: 10, color: PL.text4, fontFamily: FL.mono, marginTop: 1 }}>Synthesized from backend streams</div>
            </div>
          </div>
          <p style={{ fontSize: 14.5, lineHeight: 1.65, color: PL.text2, fontFamily: FL.serif, fontStyle: "italic", margin: 0 }}>
            "{majorQuakes.length} significant seismic events are visible in the current USGS feed. Weather is streaming from {weather.length} cities with an average of {weatherAvg == null ? "—" : weatherAvg.toFixed(1)}°C. Crypto market coverage includes {coins.length} assets with total market cap near ${fmtLive(totalCap, 2)}. Energy telemetry reports {fmtLive(energy?.global?.consumedTWh, 1)} TWh consumed year-to-date."
          </p>
          <div style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid ${PL.line}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { l: "Risk index", v: majorQuakes.length ? Math.min(9.9, 3 + majorQuakes.length / 4).toFixed(1) : "—", c: PL.amber, s: "USGS weighted" },
              { l: "Markets", v: coins[0]?.symbol?.toUpperCase() || "—", c: PL.text2, s: coins[0] ? `$${fmtLive(coins[0].current_price, 2)}` : "loading" },
              { l: "Climate", v: `${energy?.global?.renewableShare ?? "—"}%`, c: PL.sage, s: "renewable share" },
              { l: "Air", v: air[0]?.value ?? "—", c: PL.gold, s: air[0] ? `${air[0].parameter} ${air[0].unit}` : "OpenAQ" },
            ].map(m => (
              <div key={m.l} style={{ padding: 11, borderRadius: 10, background: "rgba(27,26,24,0.4)", border: `1px solid ${PL.line}` }}>
                <div style={{ fontSize: 9, color: PL.text4, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FL.mono }}>{m.l}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: m.c, marginTop: 4, fontFamily: FL.display, letterSpacing: "-0.015em" }}>{m.v}</div>
                <div style={{ fontSize: 10, color: PL.text4, marginTop: 1, fontFamily: FL.mono }}>{m.s}</div>
              </div>
            ))}
          </div>
        </window.CardA>
      </section>
    </div>
  );
}

function LiveQuakes({ api }) {
  const quakes = api.quakes?.data?.quakes ?? [];
  const colorFor = (m) => m >= 6 ? PL.ember : m >= 5 ? PL.accent : m >= 4 ? PL.amber : PL.text3;
  return (
    <div style={{ padding: "28px 32px 56px", display: "grid", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { l: "Last 30d", v: quakes.length, c: PL.text },
          { l: "≥ M5.0", v: quakes.filter(q => q.mag >= 5).length, c: PL.amber },
          { l: "≥ M6.0", v: quakes.filter(q => q.mag >= 6).length, c: PL.accent },
          { l: "Latest", v: quakes[0] ? timeAgo(quakes[0].time) : "—", c: PL.ember },
        ].map(s => <window.StatPill key={s.l} label={s.l} value={s.v} color={s.c} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        <window.CardA padded={false} glow>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "18px 22px 14px" }}>
            <div>
              <div style={{ fontFamily: FL.display, fontSize: 17, fontWeight: 600 }}>Global seismic activity · backend</div>
              <div style={{ fontSize: 11, color: PL.text3, marginTop: 2, fontFamily: FL.mono }}>Source: /api/quakes · USGS</div>
            </div>
            <window.LiveTag color={PL.sage} />
          </div>
          <div style={{ padding: "0 12px 16px" }}>
            <window.PhotorealMap height={320} accent={PL.accent} markers={quakes.slice(0, 80).map(q => ({ lon: q.lon, lat: q.lat, color: colorFor(q.mag), r: Math.max(3, Math.min(8, q.mag - 1)) }))} />
          </div>
        </window.CardA>
        <window.CardA padded={false}>
          <div style={{ padding: "16px 18px", borderBottom: `1px solid ${PL.line}` }}>
            <div style={{ fontFamily: FL.display, fontSize: 16, fontWeight: 600 }}>Recent significant</div>
          </div>
          <div style={{ maxHeight: 430, overflowY: "auto" }}>
            {quakes.slice(0, 16).map((q, i) => (
              <div key={`${q.time}-${i}`} style={{ display: "grid", gridTemplateColumns: "52px 1fr auto", gap: 12, padding: "14px 18px", borderBottom: i < quakes.length - 1 ? `1px solid ${PL.line}` : "none", alignItems: "center" }}>
                <div style={{ fontFamily: FL.mono, fontSize: 24, fontWeight: 700, color: colorFor(q.mag), textShadow: `0 0 14px ${colorFor(q.mag)}55`, letterSpacing: "-0.02em" }}>{Number(q.mag).toFixed(1)}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: PL.text }}>{q.place}</div>
                  <div style={{ fontSize: 10.5, color: PL.text4, fontFamily: FL.mono, marginTop: 2 }}>{Math.round(q.depth)} km · {timeAgo(q.time)}</div>
                </div>
                <div style={{ color: PL.text4 }}>›</div>
              </div>
            ))}
          </div>
        </window.CardA>
      </div>
    </div>
  );
}

function LiveMarkets({ api }) {
  const coins = api.markets?.data?.coins ?? [];
  const totalCap = coins.reduce((sum, c) => sum + (c.market_cap || 0), 0);
  const totalVol = coins.reduce((sum, c) => sum + (c.total_volume || 0), 0);
  return (
    <div style={{ padding: "28px 32px 56px", display: "grid", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { l: "Total mkt cap", v: `$${fmtLive(totalCap, 2)}`, c: PL.cream, t: "CoinGecko" },
          { l: "24h volume", v: `$${fmtLive(totalVol, 2)}`, c: PL.text, t: "live" },
          { l: "BTC dominance", v: coins[0]?.symbol === "btc" ? `${((coins[0].market_cap / totalCap) * 100).toFixed(1)}%` : "—", c: PL.amber, t: "computed" },
          { l: "Assets", v: coins.length, c: PL.sage, t: "tracked" },
        ].map(s => <window.StatPill key={s.l} label={s.l} value={s.v} color={s.c} trend={s.t} />)}
      </div>
      <window.CardA padded={false} glow>
        <div style={{ padding: "18px 22px", borderBottom: `1px solid ${PL.line}`, display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontFamily: FL.display, fontSize: 19, fontWeight: 600, letterSpacing: "-0.018em" }}>Top crypto markets · backend</div>
          <window.LiveTag color={PL.sage} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 110px 90px 110px 150px 120px", padding: "12px 22px", fontSize: 9.5, color: PL.text4, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: FL.mono, borderBottom: `1px solid ${PL.line}` }}>
          <div>#</div><div>Asset</div><div style={{ textAlign: "right" }}>Price</div><div style={{ textAlign: "right" }}>24h</div><div style={{ textAlign: "right" }}>Mkt cap</div><div style={{ textAlign: "right" }}>7d</div><div></div>
        </div>
        {coins.slice(0, 20).map((c, i) => (
          <div key={c.id || c.symbol} style={{ display: "grid", gridTemplateColumns: "40px 1fr 110px 90px 110px 150px 120px", padding: "13px 22px", alignItems: "center", borderBottom: i < coins.length - 1 ? `1px solid ${PL.line}` : "none" }}>
            <div style={{ fontSize: 11.5, color: PL.text4, fontFamily: FL.mono }}>{i + 1}</div>
            <div style={{ display: "flex", gap: 11, alignItems: "center" }}>
              <img src={c.image} alt="" style={{ width: 30, height: 30, borderRadius: "50%", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }} />
              <div><div style={{ fontSize: 13, fontWeight: 600, color: PL.text }}>{c.name}</div><div style={{ fontSize: 10.5, color: PL.text4, fontFamily: FL.mono }}>{c.symbol?.toUpperCase()}</div></div>
            </div>
            <div style={{ textAlign: "right", fontFamily: FL.mono, fontSize: 13, color: PL.text, fontVariantNumeric: "tabular-nums" }}>${fmtLive(c.current_price, c.current_price < 1 ? 4 : 2)}</div>
            <div style={{ textAlign: "right", fontSize: 12, fontWeight: 600, color: (c.price_change_percentage_24h || 0) >= 0 ? PL.sage : PL.ember, fontFamily: FL.mono }}>{(c.price_change_percentage_24h || 0) >= 0 ? "+" : ""}{(c.price_change_percentage_24h || 0).toFixed(2)}%</div>
            <div style={{ textAlign: "right", fontFamily: FL.mono, fontSize: 12, color: PL.text2 }}>${fmtLive(c.market_cap)}</div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}><Spark data={(c.sparkline_in_7d?.price || genSpark(20)).slice(-20)} color={(c.price_change_percentage_24h || 0) >= 0 ? PL.sage : PL.ember} width={140} height={30} /></div>
            <div style={{ textAlign: "right" }}><button style={{ fontSize: 10.5, padding: "5px 12px", borderRadius: 8, background: PL.card, border: `1px solid ${PL.line}`, color: PL.text2, cursor: "pointer", fontFamily: FL.sans, fontWeight: 500 }}>+ Watch</button></div>
          </div>
        ))}
      </window.CardA>
    </div>
  );
}

function LiveGenericScreen({ api, tab }) {
  const weather = api.weather?.data?.cities ?? [];
  const energy = api.energy?.data;
  const health = api.health?.data;
  const forex = api.forex?.data?.latest?.rates ?? {};
  const air = api.air?.data?.stations ?? [];
  const news = api.news?.data?.articles ?? [];
  const countries = api.countries?.data?.countries ?? api.health?.data?.countries ?? [];

  const cardsByTab = {
    weather: weather.map(c => ({ title: `${c.flag || ""} ${c.name}`, value: `${c.temp}°C`, sub: `Feels ${c.feels}° · Wind ${c.wind} km/h`, color: PL.amber })),
    energy: [
      { title: "Global generation", value: `${fmtLive(energy?.global?.totalAnnualTWh)} TWh`, sub: "annual estimate", color: PL.amber },
      { title: "Consumed YTD", value: `${fmtLive(energy?.global?.consumedTWh, 1)} TWh`, sub: `${energy?.global?.mwhPerSecond ?? "—"} MWh/s`, color: PL.accent },
      { title: "Renewable share", value: `${energy?.global?.renewableShare ?? "—"}%`, sub: "hydro + wind + solar", color: PL.sage },
      { title: "Fossil share", value: `${energy?.global?.fossilShare ?? "—"}%`, sub: "coal + gas + oil", color: PL.ember },
    ],
    health: [
      { title: "Global cases", value: fmtLive(health?.global?.cases), sub: "disease.sh", color: PL.cream },
      { title: "Recovered", value: fmtLive(health?.global?.recovered), sub: "global", color: PL.sage },
      { title: "Active", value: fmtLive(health?.global?.active), sub: "global", color: PL.amber },
      { title: "Deaths", value: fmtLive(health?.global?.deaths), sub: "global", color: PL.ember },
    ],
    forex: Object.entries(forex).slice(0, 12).map(([k, v]) => ({ title: `USD / ${k}`, value: Number(v).toFixed(4), sub: "open.er-api", color: PL.gold })),
    air: air.map(s => ({ title: s.city, value: `${s.value} ${s.unit}`, sub: `${s.parameter} · ${s.location}`, color: Number(s.value) > 50 ? PL.ember : PL.sage })),
    news: news.slice(0, 8).map(a => ({ title: a.source?.name || "News", value: a.title, sub: a.description || "headline", color: PL.text2 })),
    countries: countries.slice(0, 12).map(c => ({ title: c.country || c.name, value: fmtLive(c.cases || c.population), sub: c.continent || "country stream", color: PL.cream })),
  };

  const cards = cardsByTab[tab] || [
    { title: "Backend status", value: "Connected", sub: "Global Signal API routes", color: PL.sage },
    { title: "Stream count", value: Object.keys(api).length, sub: "endpoints queried", color: PL.accent },
    { title: "UI source", value: "Exact export", sub: "Direction A v2", color: PL.gold },
  ];

  return (
    <div style={{ padding: "28px 32px 56px", display: "grid", gap: 18 }}>
      <window.CardA glow>
        <div style={{ fontSize: 9.5, color: PL.accent, letterSpacing: "0.3em", fontFamily: FL.mono, textTransform: "uppercase" }}>{tab} · backend stream</div>
        <div style={{ fontFamily: FL.display, fontSize: 32, fontWeight: 600, marginTop: 6, letterSpacing: "-0.025em" }}>Live {tab} intelligence</div>
        <div style={{ fontSize: 14, color: PL.text3, marginTop: 6, fontFamily: FL.serif, fontStyle: "italic" }}>This screen keeps the exported visual system and renders data from the matching Global Signal API endpoint.</div>
      </window.CardA>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12 }}>
        {cards.map((item, i) => (
          <window.CardA key={`${item.title}-${i}`}>
            <div style={{ fontSize: 9.5, color: PL.text4, letterSpacing: "0.2em", fontFamily: FL.mono, textTransform: "uppercase" }}>{item.title}</div>
            <div style={{ marginTop: 10, fontFamily: FL.display, fontSize: typeof item.value === "string" && item.value.length > 28 ? 16 : 26, fontWeight: 600, color: item.color, letterSpacing: "-0.02em", lineHeight: 1.12 }}>{item.value}</div>
            <div style={{ marginTop: 8, fontSize: 11, color: PL.text3, lineHeight: 1.4 }}>{item.sub}</div>
          </window.CardA>
        ))}
      </div>
    </div>
  );
}

const SCREEN_META = {
  overview: ["ORBITAL COMMAND", "The world, right now", "Backend-connected streams · refreshed every 60s"],
  globe: ["EARTH · LIVE", "Live Globe", "USGS events and backend context on the exported sphere"],
  briefing: ["AI BRIEFING", "Daily briefing", "Synthesized from live Global Signal API streams"],
  quakes: ["USGS · LIVE", "Seismic activity", "Live earthquake feed from /api/quakes"],
  markets: ["CRYPTO · LIVE", "Markets", "Live CoinGecko feed from /api/markets"],
  weather: ["OPEN-METEO · LIVE", "Weather", "City forecasts from /api/weather"],
  energy: ["ENERGY · LIVE", "Energy", "Estimated global energy telemetry"],
  health: ["HEALTH · LIVE", "Health", "Global health data from /api/health"],
  forex: ["FX · LIVE", "Forex", "USD rates from /api/forex"],
  air: ["OPENAQ · LIVE", "Air Quality", "Stations from /api/air"],
  news: ["NEWS · LIVE", "News", "Headlines from /api/news"],
  countries: ["COUNTRIES · LIVE", "Countries", "Country stream from backend"],
};

function LiveApp() {
  const { data, loading, lastSync } = useBackendData();
  const [tab, setTab] = useLiveState("overview");
  const meta = SCREEN_META[tab] || [tab.toUpperCase(), window.GS_TABS.find(t => t.id === tab)?.label || tab, "Backend-connected Global Signal screen"];

  const content = useLiveMemo(() => {
    if (loading) {
      return (
        <div style={{ padding: "40px", color: PL.text2, fontFamily: FL.mono }}>
          <window.CardA glow>
            <div style={{ fontSize: 10, letterSpacing: "0.3em", color: PL.accent }}>CONNECTING BACKEND</div>
            <div style={{ marginTop: 12, fontFamily: FL.display, fontSize: 32, color: PL.text }}>Loading live Global Signal streams...</div>
          </window.CardA>
        </div>
      );
    }
    if (tab === "overview") return <LiveOverview api={data} lastSync={lastSync} />;
    if (tab === "globe") return <window.GlobeScreenA />;
    if (tab === "briefing") return <LiveOverview api={data} lastSync={lastSync} />;
    if (tab === "quakes") return <LiveQuakes api={data} />;
    if (tab === "markets") return <LiveMarkets api={data} />;
    if (tab === "correlate") return <window.CorrelatorA />;
    if (tab === "timeline") return <window.TimeMachineA />;
    if (tab === "alerts") return <window.AlertsA />;
    return <LiveGenericScreen api={data} tab={tab} />;
  }, [loading, tab, data, lastSync]);

  return (
    <window.ScreenA active={tab} onSelect={setTab} eyebrow={meta[0]} title={meta[1]} subtitle={meta[2]}>
      {content}
    </window.ScreenA>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<LiveApp />);
