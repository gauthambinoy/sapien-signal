// More screens for direction A: Globe, Energy, Health, Space, Air, Forex, Countries, Tech, News, AI Query, Alerts, Time Machine, Comparator, Data Sources, System

const { useState: uS, useEffect: uE } = React;
const cT = window.GS_TOKENS.cocoa;
const F = window.GS_FONTS;
const Cd = window.EditorialCard;

// ── Live Globe (immersive)
const EditorialGlobe = () => (
  <div style={{ padding: '24px 28px 40px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, height: 'calc(100% - 0px)' }}>
    <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: `1px solid ${cT.border}`, background: 'radial-gradient(ellipse at 50% 50%, #0E1A2E 0%, #03070F 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <MiniGlobe size={520} accent={cT.accent} />
      <div style={{ position: 'absolute', top: 16, left: 16, padding: '6px 12px', borderRadius: 999, background: 'rgba(0,0,0,0.5)', border: `1px solid ${cT.border}`, fontSize: 10, fontFamily: F.mono, letterSpacing: '0.18em', color: cT.text2 }}>EARTH · LIVE · 2D/3D</div>
      <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', gap: 6 }}>
        {['Quakes','Power','Markets','Air','ISS','News'].map((l,i)=>(
          <button key={l} style={{ padding: '6px 12px', borderRadius: 999, background: i===0?cT.accent+'33':'rgba(0,0,0,0.4)', border: `1px solid ${i===0?cT.accent+'66':cT.border}`, color: i===0?cT.accent:cT.text2, fontSize: 11, fontWeight: 600, cursor:'pointer', fontFamily: F.sans }}>{l}</button>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {['+','−','◐','⌖'].map(s=><button key={s} style={{ width: 32, height: 32, borderRadius: 8, background:'rgba(0,0,0,0.5)', border: `1px solid ${cT.border}`, color: cT.text2, cursor:'pointer' }}>{s}</button>)}
      </div>
    </div>
    <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
      <Cd T={cT}>
        <div style={{ fontSize:9, color: cT.textMuted, letterSpacing:'0.2em', fontFamily: F.mono, textTransform:'uppercase' }}>SELECTED REGION</div>
        <div style={{ fontFamily: F.serif, fontSize: 22, fontWeight: 600, marginTop: 6 }}>Western Pacific</div>
        <div style={{ fontSize: 11, color: cT.text3, fontFamily: F.mono }}>−29.4°S · 177.8°W</div>
        <div style={{ marginTop: 14, display: 'grid', gap: 8 }}>
          {[['Active quakes','12'],['Tsunami watch','1'],['Power grids','3 nominal'],['Vessels tracked','142']].map(([l,v])=>(
            <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize: 12 }}>
              <span style={{ color: cT.text3 }}>{l}</span><span style={{ color: cT.text, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      </Cd>
      <Cd T={cT}>
        <div style={{ fontSize:9, color: cT.textMuted, letterSpacing:'0.2em', fontFamily: F.mono, textTransform:'uppercase' }}>NEARBY EVENTS</div>
        {[{m:6.4,p:'Kermadec Is.'},{m:5.1,p:'Tonga'},{m:4.8,p:'Samoa'}].map(q=>(
          <div key={q.p} style={{ display:'flex',gap:10,alignItems:'center',padding:'8px 0',borderTop:`1px solid ${cT.border}` }}>
            <div style={{ fontFamily:F.mono,fontSize:18,fontWeight:700,color:q.m>=6?cT.red:cT.amber }}>{q.m}</div>
            <div style={{ flex:1, fontSize:12 }}>{q.p}</div>
          </div>
        ))}
      </Cd>
    </div>
  </div>
);

// ── Energy
const EditorialEnergy = () => (
  <div style={{ padding: '24px 28px 40px', display: 'grid', gap: 16 }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
      {[
        {l:'Global generation',v:'29,847 TWh',c:cT.amber,sub:'2025 estimate'},
        {l:'Renewable share',v:'29.4%',c:cT.green,sub:'+3.1% YoY'},
        {l:'Solar output',v:'1,640 TWh',c:cT.amber,sub:'IRENA'},
        {l:'Wind output',v:'2,180 TWh',c:cT.cyan,sub:'IRENA'},
      ].map(s=>(
        <Cd key={s.l} T={cT}>
          <div style={{ fontSize:9,color:cT.textMuted,letterSpacing:'0.2em',fontFamily:F.mono,textTransform:'uppercase' }}>{s.l}</div>
          <div style={{ fontFamily:F.mono,fontSize:24,fontWeight:700,color:s.c,marginTop:8 }}>{s.v}</div>
          <div style={{ fontSize:11,color:cT.text3,marginTop:4 }}>{s.sub}</div>
          <Spark data={genSpark(20,0.3)} color={s.c} width={220} height={28} />
        </Cd>
      ))}
    </div>
    <Cd T={cT}>
      <div style={{ fontFamily:F.serif, fontSize:18, fontWeight:600, marginBottom:14 }}>Energy mix · global · 30-day rolling</div>
      <div style={{ display:'flex', height: 28, borderRadius: 6, overflow:'hidden' }}>
        {[
          {l:'Coal',v:36,c:cT.red},{l:'Gas',v:23,c:cT.amber},
          {l:'Oil',v:3,c:cT.accent},{l:'Hydro',v:15,c:cT.cyan},
          {l:'Wind',v:8,c:'#7AB8E0'},{l:'Solar',v:6,c:cT.amber},
          {l:'Nuclear',v:9,c:cT.purple},
        ].map(s=>(
          <div key={s.l} style={{ width:`${s.v}%`, background:s.c, position:'relative' }} title={`${s.l} ${s.v}%`}>
            <div style={{ position:'absolute',top:36,left:'50%',transform:'translateX(-50%)',fontSize:10,color:cT.text3,whiteSpace:'nowrap' }}>{s.l} {s.v}%</div>
          </div>
        ))}
      </div>
    </Cd>
  </div>
);

// ── Time Machine (novel)
const EditorialTimeMachine = () => (
  <div style={{ padding: '24px 28px 40px', display:'grid', gap: 16 }}>
    <Cd T={cT}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
        <div>
          <div style={{ fontSize:9,color:cT.accent,letterSpacing:'0.25em',fontFamily:F.mono }}>TIME MACHINE · NEW</div>
          <div style={{ fontFamily:F.serif, fontSize:24, fontWeight:600, marginTop:4 }}>Replay any moment of the planet</div>
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {['◀','▶','⏵','◉'].map(s=><button key={s} style={{ width:36,height:36,borderRadius:8,background:'rgba(245,240,232,0.04)',border:`1px solid ${cT.border}`,color:cT.text2,cursor:'pointer' }}>{s}</button>)}
        </div>
      </div>
      <div style={{ fontFamily:F.mono, fontSize:42, fontWeight:700, color:cT.accent }}>March 11, 2011 · 14:46:23 JST</div>
      <div style={{ fontSize:13, color:cT.text3, fontStyle:'italic', fontFamily:F.serif }}>Tōhoku earthquake · M9.1 · Sendai, Japan</div>
      {/* Scrub */}
      <div style={{ marginTop: 24, position:'relative', height:60 }}>
        <div style={{ position:'absolute', top:24, left:0, right:0, height:3, background: cT.border, borderRadius:2 }} />
        <div style={{ position:'absolute', top:24, left:0, width:'42%', height:3, background:`linear-gradient(90deg, ${cT.accent}, ${cT.cyan})`, borderRadius:2 }} />
        <div style={{ position:'absolute', top:18, left:'42%', width:14, height:14, borderRadius:'50%', background:cT.accent, boxShadow:`0 0 12px ${cT.accent}` }} />
        {/* Year ticks */}
        <div style={{ position:'absolute', top:36, left:0, right:0, display:'flex', justifyContent:'space-between', fontSize:10, color:cT.textMuted, fontFamily:F.mono }}>
          {['1990','2000','2010','2015','2020','2025','NOW'].map(y=><span key={y}>{y}</span>)}
        </div>
        {/* Event markers on timeline */}
        {[{p:'15%',l:'9/11'},{p:'34%',l:'2008'},{p:'42%',l:'Tōhoku'},{p:'68%',l:'COVID'},{p:'80%',l:'Ukraine'}].map(e=>(
          <div key={e.l} style={{ position:'absolute', top:0, left:e.p, width:1, height:24, background:cT.text3 }}>
            <div style={{ position:'absolute', top:-14, left:'50%', transform:'translateX(-50%)', fontSize:9, color:cT.text3, fontFamily:F.mono, whiteSpace:'nowrap' }}>{e.l}</div>
          </div>
        ))}
      </div>
    </Cd>
    <div style={{ display:'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      <Cd T={cT}>
        <div style={{ fontFamily:F.serif, fontSize:16, fontWeight:600, marginBottom: 10 }}>Snapshot at this moment</div>
        {[
          ['Global temp anomaly','+0.62°C',cT.amber],
          ['Atmospheric CO₂','390.1 ppm',cT.amber],
          ['BTC price','$0',cT.text3],
          ['NASDAQ','2,701',cT.cyan],
          ['World pop.','6.97 B',cT.text2],
        ].map(([l,v,c])=>(
          <div key={l} style={{ display:'flex',justifyContent:'space-between',padding:'10px 0',borderTop:`1px solid ${cT.border}` }}>
            <span style={{ fontSize:13, color: cT.text3 }}>{l}</span>
            <span style={{ fontFamily:F.mono, fontSize:14, fontWeight:600, color:c }}>{v}</span>
          </div>
        ))}
      </Cd>
      <Cd T={cT}>
        <div style={{ fontFamily:F.serif, fontSize:16, fontWeight:600, marginBottom:10 }}>What the AI saw</div>
        <p style={{ fontSize:13.5, color:cT.text2, lineHeight:1.65, fontFamily:F.serif, fontStyle:'italic', margin:0 }}>
          "M9.1 megathrust ruptures off Sendai. Tsunami waves reach Pacific Rim within 20 minutes. NASDAQ futures drop 1.8% intraday. Insurance equities sell off 4-7%. The first wave of social media posts referencing the quake arrives at 14:48 JST — two minutes after onset."
        </p>
      </Cd>
    </div>
  </div>
);

// ── Alerts / Comparator
const EditorialAlerts = () => (
  <div style={{ padding: '24px 28px 40px', display:'grid', gap: 14 }}>
    <Cd T={cT}>
      <div style={{ display:'flex',justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
        <div>
          <div style={{ fontSize:9,color:cT.accent,letterSpacing:'0.25em',fontFamily:F.mono }}>ALERTS · NEW</div>
          <div style={{ fontFamily:F.serif, fontSize:22, fontWeight:600, marginTop:4 }}>Tell us when the world changes</div>
        </div>
        <button style={{ padding:'8px 16px', borderRadius:10, background:`linear-gradient(135deg, ${cT.accent}, ${cT.accent2})`, border:'none', color:'#1F1E1C', fontSize:12, fontWeight:700, cursor:'pointer' }}>+ New rule</button>
      </div>
      {[
        {ic:'◬',name:'M6+ in Pacific Ring of Fire',state:'Watching · 12 events / 30d',c:cT.red,active:true},
        {ic:'$',name:'BTC moves more than 5% in 1h',state:'Triggered 14m ago · −5.4%',c:cT.green,active:true},
        {ic:'⚡',name:'EU grid stress > 90%',state:'Triggered now · ESP, FR, IT',c:cT.amber,active:true},
        {ic:'⌬',name:'PM2.5 hazardous in any tracked city',state:'Watching · 0 events',c:cT.text2,active:false},
        {ic:'◌',name:'ISS pass over Los Angeles',state:'Next: 21:14 PT',c:cT.cyan,active:false},
      ].map(a => (
        <div key={a.name} style={{ display:'grid', gridTemplateColumns:'40px 1fr 140px 100px', gap:12, padding:'14px 0', borderTop:`1px solid ${cT.border}`, alignItems:'center' }}>
          <div style={{ width:34, height:34, borderRadius:10, background:`${a.c}22`, border:`1px solid ${a.c}44`, color:a.c, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15 }}>{a.ic}</div>
          <div>
            <div style={{ fontSize:13.5, fontWeight:600 }}>{a.name}</div>
            <div style={{ fontSize:11, color:cT.text3, marginTop:2 }}>{a.state}</div>
          </div>
          <LiveTag color={a.active?a.c:cT.textMuted} label={a.active?'ACTIVE':'PAUSED'} />
          <div style={{ display:'flex', gap:6, justifyContent:'flex-end' }}>
            <button style={{ width:28,height:28,borderRadius:6,background:'transparent',border:`1px solid ${cT.border}`,color:cT.text2,cursor:'pointer' }}>⚙</button>
            <button style={{ width:28,height:28,borderRadius:6,background:'transparent',border:`1px solid ${cT.border}`,color:cT.text2,cursor:'pointer' }}>×</button>
          </div>
        </div>
      ))}
    </Cd>
  </div>
);

// ── Comparator (novel)
const EditorialComparator = () => (
  <div style={{ padding:'24px 28px 40px', display:'grid', gap:14 }}>
    <Cd T={cT}>
      <div style={{ fontSize:9,color:cT.accent,letterSpacing:'0.25em',fontFamily:F.mono }}>COMPARATOR · NEW</div>
      <div style={{ fontFamily:F.serif, fontSize:22, fontWeight:600, marginTop:4 }}>Compare countries, eras, or any two things</div>
    </Cd>
    <div style={{ display:'grid', gridTemplateColumns:'1fr 60px 1fr', gap:14, alignItems:'stretch' }}>
      {[
        {flag:'🇯🇵', name:'Japan', stats:[['Population','125 M'],['GDP','$4.2 T'],['CO₂/cap','8.5 t'],['Renewable %','22%'],['Quakes 30d','142'],['Life exp','84.6']]},
      ].map(c=>(
        <Cd key={c.name} T={cT}>
          <div style={{ fontSize:32, marginBottom:8 }}>{c.flag}</div>
          <div style={{ fontFamily:F.serif, fontSize:24, fontWeight:600 }}>{c.name}</div>
          {c.stats.map(([l,v])=>(
            <div key={l} style={{ display:'flex',justifyContent:'space-between',padding:'10px 0',borderTop:`1px solid ${cT.border}`, fontSize:13 }}>
              <span style={{ color:cT.text3 }}>{l}</span><span style={{ fontFamily:F.mono, fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </Cd>
      ))}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, color:cT.accent, fontFamily:F.serif }}>vs</div>
      {[
        {flag:'🇩🇪', name:'Germany', stats:[['Population','83 M'],['GDP','$4.5 T'],['CO₂/cap','7.3 t'],['Renewable %','46%'],['Quakes 30d','3'],['Life exp','81.3']]},
      ].map(c=>(
        <Cd key={c.name} T={cT}>
          <div style={{ fontSize:32, marginBottom:8 }}>{c.flag}</div>
          <div style={{ fontFamily:F.serif, fontSize:24, fontWeight:600 }}>{c.name}</div>
          {c.stats.map(([l,v])=>(
            <div key={l} style={{ display:'flex',justifyContent:'space-between',padding:'10px 0',borderTop:`1px solid ${cT.border}`, fontSize:13 }}>
              <span style={{ color:cT.text3 }}>{l}</span><span style={{ fontFamily:F.mono, fontWeight:600, color:cT.cyan }}>{v}</span>
            </div>
          ))}
        </Cd>
      ))}
    </div>
  </div>
);

// ── System Health
const EditorialSystem = () => (
  <div style={{ padding:'24px 28px 40px', display:'grid', gap:14 }}>
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
      {[['Endpoints up','22/22',cT.green],['p50 latency','28 ms',cT.cyan],['Cache hit','94.2%',cT.amber],['Breakers open','0',cT.green]].map(([l,v,c])=>(
        <Cd key={l} T={cT}>
          <div style={{ fontSize:9,color:cT.textMuted,letterSpacing:'0.2em',fontFamily:F.mono,textTransform:'uppercase' }}>{l}</div>
          <div style={{ fontFamily:F.mono,fontSize:26,fontWeight:700,color:c,marginTop:8 }}>{v}</div>
        </Cd>
      ))}
    </div>
    <Cd T={cT} style={{ padding:0 }}>
      <div style={{ padding:'14px 18px', borderBottom:`1px solid ${cT.border}`, fontFamily:F.serif, fontSize:16, fontWeight:600 }}>API endpoints</div>
      {['/api/weather','/api/quakes','/api/markets','/api/forex','/api/economy','/api/energy','/api/health','/api/space','/api/air','/api/news','/api/iss','/api/ai-query'].map((e,i)=>(
        <div key={e} style={{ display:'grid', gridTemplateColumns:'1fr 100px 100px 100px 100px', gap:10, padding:'10px 18px', borderTop:`1px solid ${cT.border}`, alignItems:'center', fontSize:12 }}>
          <span style={{ fontFamily:F.mono }}>{e}</span>
          <span style={{ color:cT.green, fontFamily:F.mono }}>● 200 OK</span>
          <span style={{ color:cT.text2, fontFamily:F.mono }}>{20+i*3} ms</span>
          <span style={{ color:cT.text3, fontFamily:F.mono }}>cache 60s</span>
          <Spark data={genSpark(20)} color={cT.green} width={100} height={20} />
        </div>
      ))}
    </Cd>
  </div>
);

window.EditorialGlobe = EditorialGlobe;
window.EditorialEnergy = EditorialEnergy;
window.EditorialTimeMachine = EditorialTimeMachine;
window.EditorialAlerts = EditorialAlerts;
window.EditorialComparator = EditorialComparator;
window.EditorialSystem = EditorialSystem;
